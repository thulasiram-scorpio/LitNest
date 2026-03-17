const cloudinary = require("cloudinary"); // Get base package
const multerCloudinary = require("multer-storage-cloudinary");
const multer = require("multer");
require("dotenv").config();

// 1. Log into Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

let storage;

// 2. Auto-Detect NPM Package Version and Configure
if (multerCloudinary.CloudinaryStorage) {
  // --- Modern Version (v4+) ---
  storage = new multerCloudinary.CloudinaryStorage({
    cloudinary: cloudinary.v2,
    params: {
      folder: "litnest_profiles",
      allowed_formats: ["jpg", "jpeg", "png", "webp"],
    },
  });
} else {
  // --- Classic Version (v1) ---
  // (This is the version your computer installed!)
  storage = multerCloudinary({
    cloudinary: cloudinary, // Classic requires the base object
    folder: "litnest_profiles", // Classic puts folder at the top level
    allowedFormats: ["jpg", "jpeg", "png", "webp"],
  });
}

// 3. Create the Multer middleware
const upload = multer({ storage: storage });

module.exports = { cloudinary, upload };