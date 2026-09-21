### Step 1: Install Android Studio

1. **Download Android Studio**: Go to the [Android Studio website](https://developer.android.com/studio) and download the latest version for your operating system.
2. **Install Android Studio**: Follow the installation instructions for your OS. During installation, make sure to install the Android SDK and any necessary components.

### Step 2: Start a New Project

1. **Open Android Studio**: Launch Android Studio after installation.
2. **Create a New Project**:
   - Click on "New Project" from the welcome screen.
   - Choose a project template. For a simple app, you can select "Empty Activity" and click "Next".

### Step 3: Configure Your Project

1. **Name Your App**: Enter a name for your app (e.g., "MyFirstApp").
2. **Package Name**: This is a unique identifier for your app (e.g., "com.example.myfirstapp"). It usually follows the format of a domain name you own, but you can use any unique string.
3. **Save Location**: Choose a directory on your computer where the project will be saved.
4. **Language**: Select the programming language you want to use (Java or Kotlin). Kotlin is now the preferred language for Android development.
5. **Minimum API Level**: Choose the minimum Android version your app will support. A good starting point is API 21 (Android 5.0 Lollipop).
6. Click "Finish" to create the project.

### Step 4: Explore the Project Structure

Once the project is created, you will see several folders and files in the Project view:

- **app/src/main/java**: Contains your Java/Kotlin source code.
- **app/src/main/res**: Contains resources like layouts, strings, and images.
- **app/src/main/AndroidManifest.xml**: The manifest file that contains essential information about your app.

### Step 5: Design the User Interface

1. **Open `activity_main.xml`**: Navigate to `app/src/main/res/layout/activity_main.xml`.
2. **Design the Layout**: You can use the Design view or the Text view to create your UI. For example, you can add a `TextView` and a `Button`:

   ```xml
   <LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
       android:layout_width="match_parent"
       android:layout_height="match_parent"
       android:orientation="vertical"
       android:padding="16dp">

       <TextView
           android:id="@+id/textView"
           android:layout_width="wrap_content"
           android:layout_height="wrap_content"
           android:text="Hello, World!"
           android:textSize="24sp" />

       <Button
           android:id="@+id/button"
           android:layout_width="wrap_content"
           android:layout_height="wrap_content"
           android:text="Click Me" />
   </LinearLayout>
   ```

### Step 6: Write Code for Functionality

1. **Open `MainActivity.java` or `MainActivity.kt`**: Navigate to `app/src/main/java/com/example/myfirstapp/MainActivity.java` or `MainActivity.kt`.
2. **Add Functionality**: Write code to handle button clicks. For example, in Kotlin:

   ```kotlin
   package com.example.myfirstapp

   import android.os.Bundle
   import android.widget.Button
   import android.widget.TextView
   import androidx.appcompat.app.AppCompatActivity

   class MainActivity : AppCompatActivity() {
       override fun onCreate(savedInstanceState: Bundle?) {
           super.onCreate(savedInstanceState)
           setContentView(R.layout.activity_main)

           val textView: TextView = findViewById(R.id.textView)
           val button: Button = findViewById(R.id.button)

           button.setOnClickListener {
               textView.text = "Button Clicked!"
           }
       }
   }
   ```

### Step 7: Run Your App

1. **Connect a Device or Start an Emulator**: You can run your app on a physical Android device or an emulator. If using an emulator, make sure to create one in the AVD Manager.
2. **Run the App**: Click the green "Run" button (the play icon) in the toolbar. Select your device/emulator and click "OK".

### Step 8: Debug and Test

- Use the Logcat tool in Android Studio to view logs and debug your app.
- Test your app on different devices and screen sizes to ensure compatibility.

### Step 9: Build and Publish

Once your app is ready, you can build it for release and publish it on the Google Play Store. Follow the [official documentation](https://developer.android.com/studio/publish) for detailed steps on how to do this.

### Conclusion

Congratulations! You've created your first Android app project. From here, you can continue to learn more about Android development, explore different components, and enhance your app's functionality. Happy coding!