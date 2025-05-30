const express = require("express");
const cors = require("cors");
const multer = require("multer");
const axios = require("axios");
const FormData = require("form-data");
const https = require('https'); // For streaming from Cloudinary URL
// const { URL } = require('url'); // Not strictly needed if just using filename from request

const app = express(); // <--- THIS LINE WAS MISSING/RE-ADDED
const PORT = 3001;

app.use(cors({ origin: true }));
const upload = multer({ storage: multer.memoryStorage() });

app.post("/upload", upload.single("file"), async (req, res) => {
  if (!req.file) {
    console.log("No file was uploaded in the request.");
    return res.status(400).json({ error: "No file uploaded" });
  }
  console.log("File received by server:", req.file.originalname);
  console.log("File MIME type:", req.file.mimetype); // Log MIME type

  const cloudinaryFormData = new FormData();
  cloudinaryFormData.append("file", req.file.buffer, req.file.originalname);
  cloudinaryFormData.append("upload_preset", "unsigned_upload");
  cloudinaryFormData.append("cloud_name", "dlddiww6t");

  // Determine resource_type based on MIME type
  let resourceType = "auto";
  let uploadUrlEndpoint = "auto"; // Use 'auto' for the endpoint path by default

  if (req.file.mimetype === "application/pdf") {
    resourceType = "raw"; // Explicitly set 'raw' for PDFs for storage classification
    uploadUrlEndpoint = "raw"; // Also use 'raw' in the upload URL path for PDFs
    console.log("Detected PDF, setting resource_type to 'raw' and using 'raw' upload endpoint.");
  } else if (req.file.mimetype.startsWith("image/")) {
    resourceType = "image"; // Let Cloudinary know it's an image
    uploadUrlEndpoint = "image"; // Use 'image' upload endpoint
    console.log(`Detected ${req.file.mimetype}, setting resource_type to 'image' and using 'image' upload endpoint.`);
  }
  // For other file types, 'auto' for both resource_type and endpoint path is a good default.

  cloudinaryFormData.append("resource_type", resourceType);

  try {
    console.log(`Attempting to upload to Cloudinary endpoint type: ${uploadUrlEndpoint}, with specified resource_type: ${resourceType} ...`);
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/dlddiww6t/${uploadUrlEndpoint}/upload`, // Use the determined endpoint type
      cloudinaryFormData,
      { headers: cloudinaryFormData.getHeaders() }
    );
    console.log("Successfully uploaded to Cloudinary! URL:", response.data.secure_url);
    console.log("Cloudinary response data:", JSON.stringify(response.data, null, 2)); // Log full response
    return res.status(200).json({
        url: response.data.secure_url,
        filename: req.file.originalname
    });
  } catch (err) {
    if (err.response) {
      console.error("Cloudinary Upload Error - Status:", err.response.status);
      console.error("Cloudinary Upload Error - Data:", JSON.stringify(err.response.data, null, 2));
    } else {
      console.error("Cloudinary Upload Error - Message:", err.message);
    }
    return res.status(500).json({
      error: "Upload to Cloudinary failed. Check server console for details.",
      details: err.response ? err.response.data : err.message
    });
  }
});

// DOWNLOAD ROUTE (remains the same as before)
app.get("/download-file", (req, res) => {
  const fileUrl = req.query.url;
  const filename = req.query.filename || 'downloaded-file';

  if (!fileUrl) {
    return res.status(400).send("Missing file URL");
  }

  try {
    if (!fileUrl.startsWith(`https://res.cloudinary.com/dlddiww6t/`)) {
        return res.status(400).send("Invalid file URL for this service");
    }

    https.get(fileUrl, (streamResponse) => {
      if (streamResponse.statusCode !== 200) {
        console.error(`Error fetching file from Cloudinary for download: Status ${streamResponse.statusCode}`);
        res.status(streamResponse.statusCode || 500).send("Error fetching file for download");
        return;
      }
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
      if (streamResponse.headers['content-type']) {
        res.setHeader('Content-Type', streamResponse.headers['content-type']);
      }
      streamResponse.pipe(res);
    }).on('error', (e) => {
      console.error(`Error streaming file for download: ${e.message}`);
      res.status(500).send("Error streaming file for download");
    });
  } catch (error) {
      console.error(`Error in /download-file route: ${error.message}`);
      res.status(500).send("Server error processing download request");
  }
});


app.listen(PORT, () => {
  console.log(`Mini-server is alive! Listening on door number http://localhost:${PORT}`);
  console.log(`Upload endpoint available at http://localhost:${PORT}/upload`);
  console.log(`Download proxy endpoint available at http://localhost:${PORT}/download-file`);
});