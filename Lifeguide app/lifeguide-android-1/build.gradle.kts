Creating a new Android app project involves several steps. Below is a step-by-step guide to help you set up a new Android project using Android Studio, which is the official Integrated Development Environment (IDE) for Android development.

### Step 1: Install Android Studio
1. **Download Android Studio**: Go to the [Android Studio website](https://developer.android.com/studio) and download the latest version for your operating system.
2. **Install Android Studio**: Follow the installation instructions for your OS.

### Step 2: Start a New Project
1. **Open Android Studio**: Launch Android Studio after installation.
2. **Create a New Project**:
   - Click on "New Project" on the welcome screen.
   - Alternatively, you can go to `File > New > New Project`.

### Step 3: Configure Your Project
1. **Select a Project Template**: Choose a template for your app. Common options include:
   - **Empty Activity**: A simple starting point for your app.
   - **Basic Activity**: Includes a toolbar and a floating action button.
   - **Fullscreen Activity**: For apps that need to take up the entire screen.
   - **Other templates**: Depending on your app's needs.
   
   For this example, select **Empty Activity** and click **Next**.

2. **Configure Your Project**:
   - **Name**: Enter the name of your app (e.g., "MyFirstApp").
   - **Package Name**: This is a unique identifier for your app (e.g., "com.example.myfirstapp").
   - **Save Location**: Choose where to save your project.
   - **Language**: Select either Java or Kotlin (Kotlin is recommended for new projects).
   - **Minimum API Level**: Choose the minimum Android version your app will support. A common choice is API 21 (Android 5.0 Lollipop).
   
   Click **Finish** to create the project.

### Step 4: Explore the Project Structure
Once the project is created, you will see the following structure in the Project view:
- **app/src/main/java**: Contains your Java/Kotlin source files.
- **app/src/main/res**: Contains resources like layouts, strings, and images.
- **app/src/main/AndroidManifest.xml**: The manifest file that contains essential information about your app.

### Step 5: Build and Run Your App
1. **Connect an Android Device or Start an Emulator**: You can either connect a physical Android device or use the Android Emulator.
2. **Run the App**:
   - Click on the green "Run" button (play icon) in the toolbar.
   - Select your device or emulator from the list and click OK.

### Step 6: Modify Your App
1. **Open `activity_main.xml`**: This file is located in `app/src/main/res/layout/`. You can design your app's UI here using XML.
2. **Open `MainActivity.java` or `MainActivity.kt`**: This file is located in `app/src/main/java/com/example/myfirstapp/`. You can add your app's logic here.

### Step 7: Add Dependencies (Optional)
If you need to add libraries or dependencies, you can do so by modifying the `build.gradle` file located in the `app` directory. For example, to add a library, you would add it to the `dependencies` section.

### Step 8: Version Control (Optional)
Consider using version control (like Git) to manage your project. You can initialize a Git repository in your project directory and commit your changes regularly.

### Conclusion
You have now created a new Android app project! From here, you can start building your app by adding features, designing the UI, and implementing functionality. Don't forget to refer to the [Android Developer Documentation](https://developer.android.com/docs) for more information and resources as you develop your app.