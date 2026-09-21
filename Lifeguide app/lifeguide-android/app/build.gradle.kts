Creating a new Android app project involves several steps. Below is a guide to help you set up a new Android project using Android Studio, which is the official Integrated Development Environment (IDE) for Android development.

### Step 1: Install Android Studio
1. **Download Android Studio**: Go to the [Android Studio website](https://developer.android.com/studio) and download the latest version for your operating system.
2. **Install Android Studio**: Follow the installation instructions for your OS.

### Step 2: Start a New Project
1. **Open Android Studio**: Launch Android Studio after installation.
2. **Create a New Project**:
   - Click on "Start a new Android Studio project."
3. **Choose a Project Template**:
   - Select a template for your app. Common choices include:
     - **Empty Activity**: A simple starting point for your app.
     - **Basic Activity**: Includes a toolbar and a floating action button.
     - **Fullscreen Activity**: For immersive apps.
   - Click "Next."

### Step 3: Configure Your Project
1. **Name Your App**: Enter a name for your app (e.g., "MyFirstApp").
2. **Package Name**: This is a unique identifier for your app (e.g., "com.example.myfirstapp").
3. **Save Location**: Choose where to save your project.
4. **Language**: Select the programming language you want to use (Java or Kotlin).
5. **Minimum API Level**: Choose the minimum Android version your app will support. This determines which devices can run your app.
6. Click "Finish" to create the project.

### Step 4: Explore the Project Structure
Once the project is created, you will see the following structure in the Project view:
- **app/src/main/java**: Contains your Java/Kotlin code.
- **app/src/main/res**: Contains resources like layouts, strings, and images.
- **app/src/main/AndroidManifest.xml**: The manifest file that describes your app's components.

### Step 5: Build and Run Your App
1. **Connect a Device or Start an Emulator**:
   - You can run your app on a physical device or an Android emulator. To use an emulator, you may need to set it up in the AVD Manager (Android Virtual Device).
2. **Run the App**:
   - Click the green "Run" button (or press Shift + F10) in the toolbar.
   - Select your device/emulator and click "OK."

### Step 6: Modify Your App
1. **Open `activity_main.xml`**: This file is located in `app/src/main/res/layout/`. You can design your app's UI here using XML.
2. **Open `MainActivity.java` or `MainActivity.kt`**: This file is located in `app/src/main/java/com/example/myfirstapp/`. You can add your app's logic here.

### Step 7: Add Dependencies (Optional)
If you need additional libraries, you can add them to your `build.gradle` file located in the `app` directory. For example, to add a library, you would include it in the `dependencies` section.

### Step 8: Version Control (Optional)
Consider using Git for version control. You can initialize a Git repository in your project directory and commit your changes regularly.

### Conclusion
You now have a basic Android app project set up! From here, you can start building out your app's features, designing the UI, and adding functionality. Don't forget to refer to the [Android Developer Documentation](https://developer.android.com/docs) for more detailed information and best practices. Happy coding!