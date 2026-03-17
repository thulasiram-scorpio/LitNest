const express = require("express");
const router = express.Router(); 
const User = require("../models/User");
const { upload } = require("../config/cloudinary");

// Middleware to protect these routes
const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ success: false, message: "Unauthorized. Please log in." });
};

// ==========================================
// GET: Fetch the current user's profile
// ==========================================
router.get("/", ensureAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password"); 
    res.json({ success: true, profile: user });
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// ==========================================
// PUT: Update the profile (Text + Images)
// ==========================================
router.put("/", ensureAuthenticated, upload.fields([
  { name: 'avatar', maxCount: 1 },
  { name: 'coverImage', maxCount: 1 }
]), async (req, res) => {
  try {
    const { name, role, bio, location, website } = req.body;
    
    // 1. Start building the update object with the text fields
    let updatedData = { name, role, bio, location, website };

    // 2. Safely grab the Cloudinary Avatar URL (Checks both modern and classic labels)
    if (req.files && req.files['avatar']) {
      const avatarFile = req.files['avatar'][0];
      // Check for path, secure_url, or url depending on package version!
      updatedData.avatar = avatarFile.path || avatarFile.secure_url || avatarFile.url;
    }

    // 3. Safely grab the Cloudinary Cover Image URL
    if (req.files && req.files['coverImage']) {
      const coverFile = req.files['coverImage'][0];
      updatedData.coverImage = coverFile.path || coverFile.secure_url || coverFile.url;
    }

    // 4. Update the user in MongoDB
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updatedData },
      { new: true, runValidators: true } 
    ).select("-password");

    res.json({ success: true, message: "Profile updated successfully", profile: updatedUser });

  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ success: false, message: "Failed to update profile" });
  }
});

module.exports = router;