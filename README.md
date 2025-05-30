# NexusDrop - Cloud File Upload & Management System

**Live Demo:** [https://superlative-entremet-3d67d2.netlify.app/#uploader](https://superlative-entremet-3d67d2.netlify.app/#uploader)

NexusDrop is a web application that allows users to securely upload files to Cloudinary cloud storage and easily download them. This project demonstrates a full-stack cloud solution, featuring a responsive frontend built with HTML, TailwindCSS, and JavaScript, and a Node.js/Express.js backend API.

## Screenshot

**(Recommended: Add a screenshot or GIF of your application here!)**
*To add a screenshot:*
1.  *Take a screenshot of your application (e.g., `nexusdrop-ui.png`).*
2.  *Create an `assets` folder in the root of your GitHub repository.*
3.  *Upload your screenshot into this `assets` folder.*
4.  *Replace the line below with:* `![NexusDrop User Interface](assets/nexusdrop-ui.png)`

`[Your Screenshot Will Go Here]`

## Features

-   **Secure File Upload:** Upload files via a modern interface to Cloudinary cloud storage.
-   **Drag & Drop / Browse:** Supports both drag & drop and traditional file Browse for uploads.
-   **Multiple File Support:** Users can select and upload multiple files at once.
-   **File Preview:** Displays a list of selected files with names, sizes, and icons before uploading.
-   **Client-Side Validation:** Checks for file selection and agreement to terms before enabling upload.
-   **Progress Indication:** Shows overall progress during the upload process.
-   **File Download:** Download uploaded files securely via a backend proxy endpoint.
-   **Responsive Design:** User interface is responsive and works on different screen sizes.
-   **Dark/Light Theme:** Includes a theme toggle for user preference.
-   **Modern UI:** Built with TailwindCSS for a clean and professional look.

## Tech Stack

-   **Frontend:**
    -   HTML5
    -   TailwindCSS
    -   JavaScript (Vanilla JS)
    -   FontAwesome (for icons)
-   **Backend (Node.js API):**
    -   Node.js
    -   Express.js
    -   Multer (for handling `multipart/form-data` file uploads)
    -   Axios (for making HTTP requests to Cloudinary API)
    -   Cors (for enabling Cross-Origin Resource Sharing)
    -   `form-data` (for constructing form data for Cloudinary API)
-   **Cloud Services:**
    -   **Cloudinary:** For cloud-based image and file storage.
    -   **Render.com:** For hosting the Node.js backend API.
    -   **Netlify:** For hosting the static frontend application.
-   **Version Control:**
    -   Git
    -   GitHub

## Running the Project Locally

To run NexusDrop on your local machine for development or testing:

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/zeeshan8088/cloud-drive-firebase.git](https://github.com/zeeshan8088/cloud-drive-firebase.git)
    cd cloud-drive-firebase
    ```

2.  **Backend Setup (Local Node.js Server):**
    * Navigate to the backend code directory:
        ```bash
        cd functions
        ```
    * Install dependencies:
        ```bash
        npm install
        ```
    * The `localServer.js` file contains the backend logic. It uses your Cloudinary `cloud_name` ("dlddiww6t") and `upload_preset` ("unsigned_upload") which are currently in the code.
    * Start the local backend server:
        ```bash
        node localServer.js
        ```
        The backend server will start on `http://localhost:3001`. You should see console messages indicating it's running. Leave this terminal open.

3.  **Frontend Setup & Configuration for Local Testing:**
    * The frontend files are in the `public` directory.
    * Open the `public/index.html` file in your text editor.
    * **Important for local testing:** You need to ensure the JavaScript `fetch` calls point to your local server.
        * Find the line (around line 266 in your HTML): `const res = await fetch('https://zeeshan-file-api.onrender.com/upload', { ... });`
        * Change it to: `const res = await fetch('http://localhost:3001/upload', { ... });`
        * Find the line (around line 273): `const downloadUrl = \`https://zeeshan-file-api.onrender.com/download-file?url=...`;`
        * Change it to: `const downloadUrl = \`http://localhost:3001/download-file?url=...`;`
    * Save the `public/index.html` file.

4.  **Run the Frontend:**
    * Open the modified `public/index.html` file directly in your web browser (e.g., by double-clicking it in your file explorer).
    * You should now be able to upload files, and they will be processed by your local backend server and sent to Cloudinary. Download links will also work through your local server.

    *(Note: The version of `index.html` in the `main` branch on GitHub is configured to point to the live deployed Render backend. For local development, you'd use the `localhost:3001` URLs as described above).*

## Project Structure

-   **/functions/**: Contains the backend Node.js/Express application.
    -   `localServer.js`: The main script for running the backend server locally.
    -   `package.json`: Lists backend dependencies and scripts.
    -   `package-lock.json`: Records exact versions of backend dependencies.
    -   `index.js`: (Original file intended for Firebase Functions, can be adapted or contain the Express app logic if `localServer.js` just runs it).
    -   `node_modules/`: Folder where backend dependencies are installed (this is usually in the `.gitignore` for this subfolder).
-   **/public/**: Contains all frontend static files.
    -   `index.html`: The main HTML file for the NexusDrop application.
    -   *(You might add other assets here like a custom CSS file or images if not using CDNs for everything)*
-   `.firebaserc`: Firebase project association file (less critical for the current Render/Netlify setup but part of the history).
-   `firebase.json`: Firebase configuration file (also less critical for the current setup).
-   `.git/`: Hidden folder containing Git version control history.
-   `.gitignore`: Specifies intentionally untracked files that Git should ignore.
-   `README.md`: This documentation file.
-   `package-lock.json` (in root): Lockfile for any root-level Node.js dependencies (if any were installed, e.g., global tools run in project context).
