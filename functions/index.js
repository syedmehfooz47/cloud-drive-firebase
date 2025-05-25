const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const axios = require("axios");
const FormData = require("form-data");

const app = express();
app.use(cors({ origin: true }));

const upload = multer({ storage: multer.memoryStorage() });

app.post("/upload", upload.single("file"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  const formData = new FormData();
  formData.append("file", req.file.buffer, req.file.originalname);
  formData.append("upload_preset", "unsigned_upload");

  try {
    const cloudinaryRes = await axios.post(
      "https://api.cloudinary.com/v1_1/dlddiww6t/auto/upload",
      formData,
      { headers: formData.getHeaders() }
    );

    return res.status(200).json({ url: cloudinaryRes.data.secure_url });
  } catch (err) {
    console.error("Upload failed:", err?.response?.data || err.message);
    return res.status(500).json({
      error: "Upload failed. Check your Cloudinary config.",
      details: err?.response?.data || err.message
    });
  }
});

exports.api = functions.https.onRequest(app);
