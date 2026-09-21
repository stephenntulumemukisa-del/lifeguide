# LifeGuide Connect Android app

This Android project is a WebView shell for the existing LifeGuide web app. It keeps the current mentor directory, applications, sign-in, admin review, and activation flows in one mobile app surface.

## Run locally

1. Start the backend from the workspace root with `npm start`.
2. Open `Lifeguide app/lifeguide-android-2` in Android Studio.
3. Sync Gradle and run the `app` configuration on an emulator.

The emulator reaches the computer running Node through `http://10.0.2.2:3000/`. For a physical device, change `LIFE_GUIDE_URL` in `app/src/main/java/com/lifeguide/app/MainActivity.java` to the computer's local network IP, then use the same port.

The backend must be running while the app is open because authentication, uploads, mentor applications, and the directory use the existing API.
