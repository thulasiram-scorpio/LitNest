const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  // --- Core Auth Data ---
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    default: null
  },
  googleId: {
    type: String,
    default: null
  },

  // --- Public Profile Data ---
  role: {
    type: String,
    default: "" // Empty by default for new users
  },
  bio: {
    type: String,
    default: "" 
  },
  location: {
    type: String,
    default: "" 
  },
  website: {
    type: String,
    default: "" 
  },
  
  // --- Images (We will store Cloudinary URLs here later) ---
  avatar: {
    type: String,
    default: "" // We will handle showing a default icon on the frontend if this is empty
  },
  coverImage: {
    type: String,
    default: ""
  },

  // --- Metrics ---
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User" // Stores an array of IDs of users who follow them
  }],
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User" // Stores an array of IDs this user follows
  }],
  postsCount: {
    type: Number,
    default: 0
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("User", UserSchema);