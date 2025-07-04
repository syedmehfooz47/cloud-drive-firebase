# 🚀 DropHaven - Secure Cloud File Transfer

**Live Demo:** [Click to Launch](https://superlative-entremet-3d67d2.netlify.app/#uploader)

DropHaven is a modern web application for secure, seamless file uploads and downloads using cloud storage. It features a polished UI, real-time upload progress, secure backend endpoints, and full responsiveness across devices.

---

## 🖼️ Screenshot
> *(Replace this section with a current screenshot of your redesigned DropHaven interface)*

---

## 🌟 Features

✅ **Secure File Upload:** Upload files safely via a backend proxy to Cloudinary.  
✅ **Modern UI:** Responsive drag & drop + traditional file browser.  
✅ **Multiple File Support:** Upload multiple files at once.  
✅ **Instant File Preview:** View name, icon, and size before uploading.  
✅ **Client-Side Validation:** Ensures required actions before upload.  
✅ **Real-Time Progress:** Visual upload progress bar.  
✅ **Secure Downloads:** Backend-served file download links hide Cloudinary URLs.  
✅ **Responsive Design:** Mobile-friendly, fluid layout.  
✅ **Dark/Light Mode:** Toggle UI themes based on user preference.

---

## 🛠️ Tech Stack

### 🎯 Frontend
- HTML5
- TailwindCSS
- Vanilla JavaScript
- FontAwesome (Icons)

### ⚙️ Backend (Node.js API)
- Node.js
- Express.js
- Multer
- Axios
- CORS
- form-data

### ☁️ Cloud & Hosting
- Cloudinary (Cloud file storage)
- Render.com (Node.js backend API hosting)
- Netlify (Static frontend hosting)

### 🔁 Version Control
- Git + GitHub

---

## 💻 Running the Project Locally

### 🔹 1. Clone the Repository
```bash
git clone https://github.com/zeeshan8088/cloud-drive-firebase.git
cd cloud-drive-firebase
````

---

### 🔹 2. Backend Setup

```bash
cd functions
npm install
node localServer.js
```

Your backend server will run at `http://localhost:3001`.

---

### 🔹 3. Frontend Configuration

Open `public/index.html` in your code editor and update the backend URLs:

* **Upload endpoint (around line 266):**

  ```js
  const uploadUrl = "http://localhost:3001/upload";
  ```
* **Download endpoint (around line 273):**

  ```js
  const downloadUrl = `http://localhost:3001/download-file/${fileName}`;
  ```

Save changes.

---

### 🔹 4. Run the Frontend

Open `public/index.html` directly in your browser (right-click → Open in Browser).

---

## 📁 Project Structure

```
cloud-drive-firebase/
│
├── functions/                 # Node.js backend
│   ├── localServer.js         # Main backend server
│   └── package.json           # Backend dependencies
│
├── public/                   # Frontend files
│   ├── index.html             # Main web UI
│   ├── 404.html               # Custom 404 page
│
├── .gitignore
└── README.md
```

---

## 🙌 Contributing

Feel free to fork, improve, and submit PRs. Issues and suggestions are welcome!

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

**Built with ❤️ by Syed Mehfooz C S**

```

---

Let me know if you want a version with badges, screenshots, or contribution guidelines added, Boss.
```
