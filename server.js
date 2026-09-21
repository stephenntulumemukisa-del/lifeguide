require("dotenv").config();

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const multer = require("multer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const port = Number(process.env.PORT || 3000);
const jwtSecret = process.env.JWT_SECRET;
const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;
const uploadDirectory = path.resolve(process.env.UPLOAD_DIR || "uploads");
const database = new sqlite3.Database(path.resolve(__dirname, "lifeguide.sqlite"));

if (!jwtSecret || !adminEmail || !adminPassword) {
  throw new Error("JWT_SECRET, ADMIN_EMAIL, and ADMIN_PASSWORD must be configured in .env");
}

fs.mkdirSync(uploadDirectory, { recursive: true });
app.use(helmet({
  contentSecurityPolicy: false,
}));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(uploadDirectory));
app.get("/", (_request, response) => response.sendFile(path.resolve(__dirname, "mentorship website.html")));

const run = (sql, parameters = []) => new Promise((resolve, reject) => {
  database.run(sql, parameters, function (error) {
    if (error) reject(error);
    else resolve({ id: this.lastID, changes: this.changes });
  });
});

const get = (sql, parameters = []) => new Promise((resolve, reject) => {
  database.get(sql, parameters, (error, row) => error ? reject(error) : resolve(row));
});

const all = (sql, parameters = []) => new Promise((resolve, reject) => {
  database.all(sql, parameters, (error, rows) => error ? reject(error) : resolve(rows));
});

function issueToken(user) {
  return jwt.sign({ sub: user.id, role: user.role, email: user.email }, jwtSecret, { expiresIn: "8h" });
}

function requireAuth(request, response, next) {
  const token = request.headers.authorization?.replace(/^Bearer\s+/i, "");
  if (!token) return response.status(401).json({ error: "Authentication required" });
  try {
    request.user = jwt.verify(token, jwtSecret);
    next();
  } catch {
    response.status(401).json({ error: "Invalid or expired session" });
  }
}

function requireRole(role) {
  return (request, response, next) => {
    if (request.user?.role !== role) return response.status(403).json({ error: "Insufficient permissions" });
    next();
  };
}

const storage = multer.diskStorage({
  destination: (_request, _file, callback) => callback(null, uploadDirectory),
  filename: (_request, file, callback) => callback(null, `${crypto.randomUUID()}${path.extname(file.originalname).toLowerCase()}`),
});
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024, files: 11 },
  fileFilter: (_request, file, callback) => {
    const allowed = /jpeg|jpg|png|webp|pdf|doc|docx|ppt|pptx/;
    callback(null, allowed.test(path.extname(file.originalname).toLowerCase()));
  },
});

async function initializeDatabase() {
  await run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('administrator', 'mentor')),
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`);
  await run(`CREATE TABLE IF NOT EXISTS mentor_applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER UNIQUE NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'active')),
    profile_json TEXT NOT NULL,
    profile_picture TEXT,
    portfolio_json TEXT NOT NULL DEFAULT '[]',
    payment_medium TEXT,
    payment_reference TEXT,
    reviewed_at TEXT,
    activated_at TEXT,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  )`);
  const passwordHash = await bcrypt.hash(adminPassword, 12);
  await run(`INSERT INTO users (email, password_hash, role) VALUES (?, ?, 'administrator')
    ON CONFLICT(email) DO UPDATE SET password_hash = excluded.password_hash, role = 'administrator'`, [adminEmail, passwordHash]);
}

app.post("/api/auth/login", async (request, response) => {
  try {
    const { email, password, role } = request.body;
    const user = await get("SELECT * FROM users WHERE email = ? AND role = ?", [email?.trim().toLowerCase(), role]);
    if (!user || !(await bcrypt.compare(password || "", user.password_hash))) return response.status(401).json({ error: "Invalid account level, email, or password" });
    const application = user.role === "mentor" ? await get("SELECT status FROM mentor_applications WHERE user_id = ?", [user.id]) : null;
    response.json({ token: issueToken(user), user: { id: user.id, email: user.email, role: user.role, status: application?.status || null } });
  } catch (error) {
    response.status(500).json({ error: "Unable to sign in" });
  }
});

app.post("/api/auth/register", async (request, response) => {
  try {
    const { email, password } = request.body;
    if (!email || !password || password.length < 8) return response.status(400).json({ error: "A valid email and password of at least 8 characters are required" });
    const passwordHash = await bcrypt.hash(password, 12);
    const result = await run("INSERT INTO users (email, password_hash, role) VALUES (?, ?, 'mentor')", [email.trim().toLowerCase(), passwordHash]);
    const user = { id: result.id, email: email.trim().toLowerCase(), role: "mentor" };
    response.status(201).json({ token: issueToken(user), user: { ...user, status: "not_submitted" } });
  } catch (error) {
    response.status(error.code === "SQLITE_CONSTRAINT" ? 409 : 500).json({ error: error.code === "SQLITE_CONSTRAINT" ? "An account with this email already exists" : "Unable to create account" });
  }
});

app.post("/api/mentors/applications", requireAuth, requireRole("mentor"), upload.fields([{ name: "profilePicture", maxCount: 1 }, { name: "portfolio", maxCount: 10 }]), async (request, response) => {
  try {
    const existing = await get("SELECT id FROM mentor_applications WHERE user_id = ?", [request.user.sub]);
    if (existing) return response.status(409).json({ error: "A mentor application already exists" });
    const profile = { ...request.body };
    delete profile.password;
    const picture = request.files?.profilePicture?.[0];
    const portfolio = (request.files?.portfolio || []).map((file) => `/uploads/${file.filename}`);
    const result = await run(`INSERT INTO mentor_applications (user_id, profile_json, profile_picture, portfolio_json) VALUES (?, ?, ?, ?)`, [request.user.sub, JSON.stringify(profile), picture ? `/uploads/${picture.filename}` : null, JSON.stringify(portfolio)]);
    response.status(201).json({ id: result.id, status: "pending" });
  } catch (error) {
    response.status(500).json({ error: "Unable to submit application" });
  }
});

app.get("/api/admin/applications", requireAuth, requireRole("administrator"), async (_request, response) => {
  const applications = await all(`SELECT a.*, u.email FROM mentor_applications a JOIN users u ON u.id = a.user_id ORDER BY a.created_at DESC`);
  response.json(applications.map((application) => ({ ...application, profile: JSON.parse(application.profile_json), portfolio: JSON.parse(application.portfolio_json) })));
});

app.patch("/api/admin/applications/:id", requireAuth, requireRole("administrator"), async (request, response) => {
  const status = request.body.status;
  if (!["approved", "rejected"].includes(status)) return response.status(400).json({ error: "Status must be approved or rejected" });
  const result = await run("UPDATE mentor_applications SET status = ?, reviewed_at = CURRENT_TIMESTAMP WHERE id = ? AND status = 'pending'", [status, request.params.id]);
  if (!result.changes) return response.status(404).json({ error: "Pending application not found" });
  response.json({ status });
});

app.post("/api/mentors/activate", requireAuth, requireRole("mentor"), async (request, response) => {
  const { paymentMedium } = request.body;
  const validMediums = ["Visa or Mastercard", "Apple Pay", "Google Pay", "Samsung Pay", "UAE bank transfer"];
  if (!validMediums.includes(paymentMedium)) return response.status(400).json({ error: "Unsupported UAE payment medium" });
  const application = await get("SELECT id, status FROM mentor_applications WHERE user_id = ?", [request.user.sub]);
  if (!application || application.status !== "approved") return response.status(403).json({ error: "Application must be approved before activation" });
  const paymentReference = `LG-${crypto.randomUUID()}`;
  await run("UPDATE mentor_applications SET status = 'active', payment_medium = ?, payment_reference = ?, activated_at = CURRENT_TIMESTAMP WHERE id = ?", [paymentMedium, paymentReference, application.id]);
  response.json({ status: "active", paymentReference, message: "Activation successful. Your mentor account is now active." });
});

app.get("/api/mentors/me", requireAuth, requireRole("mentor"), async (request, response) => {
  const application = await get(`SELECT a.*, u.email FROM mentor_applications a JOIN users u ON u.id = a.user_id WHERE a.user_id = ?`, [request.user.sub]);
  if (!application) return response.status(404).json({ error: "Mentor application not found" });
  response.json({ ...application, profile: JSON.parse(application.profile_json), portfolio: JSON.parse(application.portfolio_json) });
});

app.get("/api/mentors", async (_request, response) => {
  const applications = await all(`SELECT a.*, u.email FROM mentor_applications a JOIN users u ON u.id = a.user_id WHERE a.status = 'active' ORDER BY a.activated_at DESC`);
  response.json(applications.map((application) => ({ id: application.id, email: application.email, profile: JSON.parse(application.profile_json), profilePicture: application.profile_picture, portfolio: JSON.parse(application.portfolio_json) })));
});

app.use((error, _request, response, _next) => {
  if (error instanceof multer.MulterError || error.message === "Unexpected field") return response.status(400).json({ error: "Invalid upload or file size" });
  response.status(500).json({ error: "Unexpected server error" });
});

initializeDatabase().then(() => {
  app.listen(port, () => console.log(`LifeGuide backend listening on http://localhost:${port}`));
}).catch((error) => {
  console.error("Database initialization failed", error);
  process.exit(1);
});
