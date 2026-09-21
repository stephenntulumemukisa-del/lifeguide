# LifeGuide backend

This project now includes a Node.js + Express + SQLite authorization API.

## Run locally

1. Install Node.js 20 or newer.
2. Open PowerShell in `c:\VIP\projects code`.
3. Install dependencies:

```powershell
npm.cmd install
```

4. Confirm `.env` exists. It must contain `JWT_SECRET`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD`. Keep `.env` private.
5. Start the server:

```powershell
npm.cmd start
```

Open `http://localhost:3000` to serve the website.

The server stays active while that PowerShell window is open. Press `Ctrl+C` to stop it. For automatic restarts during development, use:

```powershell
npm.cmd run dev
```

To check that it is running from another PowerShell window:

```powershell
Invoke-WebRequest http://localhost:3000/ -UseBasicParsing
```

You should receive an HTTP `200` response.

## Authorization flow

- `POST /api/auth/register` creates a mentor account and returns a JWT.
- `POST /api/auth/login` signs in an administrator or mentor.
- `POST /api/mentors/applications` submits an authenticated mentor application with multipart uploads.
- `GET /api/admin/applications` is administrator-only.
- `PATCH /api/admin/applications/:id` approves or rejects a pending application.
- `POST /api/mentors/activate` activates an approved mentor after payment confirmation from a real payment provider.
- `GET /api/mentors/me` returns the signed-in mentor's account.
- `GET /api/mentors` returns only active mentors.

The website is currently connected to these API routes. Payment processing is still a controlled demo activation step; connect a real payment provider before accepting real payments. Email delivery also needs a production email provider integration.
