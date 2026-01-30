# Database Setup Guide for Smart Flood Guard

This guide explains how to set up the Firebase database and configure the application when cloning the repository.

## Prerequisites

-   A Google account to access [Firebase Console](https://console.firebase.google.com/).
-   Node.js and npm installed on your machine.

## Step 1: Create a Firebase Project

1.  Go to the [Firebase Console](https://console.firebase.google.com/).
2.  Click on **"Add project"**.
3.  Enter a name for your project (e.g., `smart-flood-guard`).
4.  Disable Google Analytics (optional, not required for this app) and click **"Create project"**.
5.  Once the project is ready, click **"Continue"**.

## Step 2: Set up Cloud Firestore

1.  In the Firebase Console sidebar, go to **Build** > **Firestore Database**.
2.  Click **"Create database"**.
3.  Select a location for your database (e.g., `nam5 (us-central)` or one closest to you).
4.  Choose start in **Test mode** (for development) or **Production mode**.
    *   *Note: Test mode allows open access/easier development but is less secure. Update security rules before production.*
5.  Click **"Create"**.

## Step 3: Configure Client-side Access (`lib/firebase.js`)

1.  In the Project Overview page (click the gear icon > **Project settings**), scroll down to the "Your apps" section.
2.  Click the **Web** icon (`</>`) to register a new web app.
3.  Enter an App nickname (e.g., `Smart Flood Guard`-Web).
4.  Click **"Register app"**.
5.  You will see a configuration object like this:
    ```javascript
    const firebaseConfig = {
      apiKey: "AIzaSy...",
      authDomain: "your-project.firebaseapp.com",
      projectId: "your-project",
      storageBucket: "your-project.appspot.com",
      messagingSenderId: "...",
      appId: "..."
    };
    ```
6.  Open the file `lib/firebase.js` in your project.
7.  Replace the existing `firebaseConfig` object with the one you just generated.

## Step 4: Configure Server-side Admin Access (`.env.local`)

This application uses the Firebase Admin SDK, which requires a Service Account private key.

1.  In the Firebase Console, go to **Project settings** > **Service accounts**.
2.  Under the "Firebase Admin SDK" tab, click **"Generate new private key"**.
3.  Click **"Generate key"** to download a JSON file containing your credentials. **Keep this file secure and do not commit it to Git.**
4.  Create a new file named `.env.local` in the root of your project (same level as `package.json`).
5.  Open the downloaded JSON file and the `.env.local` file.
6.  Add the following variables to `.env.local`, using values from the JSON file:

    ```env
    FIREBASE_PROJECT_ID=your-project-id
    FIREBASE_CLIENT_EMAIL=your-service-account-email@your-project.iam.gserviceaccount.com
    FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."
    ```

    **Important Formatting Note for `FIREBASE_PRIVATE_KEY`:**
    -   The private key in the JSON file contains newline characters (`\n`).
    -   When pasting it into `.env.local`, ensure the entire key is on a single line and wrapped in double quotes `"`.
    -   Keep the `\n` characters exactly as they appear in the JSON file.

## Step 5: Run the Application

1.  Install dependencies:
    ```bash
    npm install
    ```
2.  Run the development server:
    ```bash
    npm run dev
    ```
3.  Open [http://localhost:3000](http://localhost:3000) in your browser.

## Troubleshooting

-   **"Invalid API Key"**: Double-check that you copied the `apiKey` correctly into `lib/firebase.js`.
-   **"Permission Denied"**: Check your Firestore Security Rules in the Firebase Console.
-   **Admin SDK Errors**: Ensure the `FIREBASE_PRIVATE_KEY` in `.env.local` is formatted correctly (one line, with `\n`).
