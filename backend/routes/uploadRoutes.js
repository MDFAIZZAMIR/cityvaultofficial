// const express = require("express");
// const multer = require("multer");
// const cloudinary = require("cloudinary");
// const streamifier = require("streamifier");

// require("dotenv").config();

// const router = express.Router();

// // cloudinary configuration
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // Multer setup using memory storage
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// router.post("/", upload.single("image"), async (req, res) => {
//     try {
//       if (!req.file) {
//         return res.status(400).json({ message: "No file Uploaded" });
//       }
//       // Function to handle the stream upload to cloudinary
//       const streamUpload = (fileBuffer) => {
//         return new Promise((resolve, reject) => {
//           const stream = cloudinary.uploader.upload_stream((error, result) => {
//             if(result) {
//               resolve(result)
//             }else {
//               reject(error);
//             }
//           });
//           // USe streamifier to convert file buffer to a stream
//           streamifier.createReadStream(fileBuffer).pipe(stream);
//         })
//       }
//       // Call the streamUpload function
//       const result = await streamUpload(req.file.buffer);

//       //Respond with the uploaded image URL
//       res.json({imageUrl: result.secure_url});
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({message: "server error"})
//     }
//   })



// module.exports = router;


const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
require("dotenv").config();

const router = express.Router();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer setup (memory storage)
const storage = multer.memoryStorage();
// Example limits & fileFilter (optional)
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter: (req, file, cb) => {
    // allow only common image mime types
    const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (allowed.includes(file.mimetype)) cb(null, true);
    else cb(new Error("Invalid file type. Only images allowed."), false);
  },
});

router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Promise wrapper for stream upload
    const streamUpload = (fileBuffer, options = {}) =>
      new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(options, (error, result) => {
          if (error) return reject(error);
          resolve(result);
        });
        streamifier.createReadStream(fileBuffer).pipe(uploadStream);
      });

    // You can pass options (folder, public_id, transformation, etc.)
    const result = await streamUpload(req.file.buffer, {
      folder: process.env.CLOUDINARY_UPLOAD_FOLDER || undefined,
      resource_type: "image",
      // e.g. public_id: 'some-name',
      // eager: [{ width: 800, height: 600, crop: "fill" }],
    });

    return res.status(201).json({ imageUrl: result.secure_url,  }); //raw: result
  } catch (error) {
    console.error("Upload error:", error);
    // Multer fileFilter errors will come here too
    if (error instanceof multer.MulterError) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
