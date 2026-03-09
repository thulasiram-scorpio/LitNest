const express = require("express");
const session = require("express-session");
const passport = require("./config/passport");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");

require("dotenv").config();

const app = express();

/* ================= DATABASE ================= */
connectDB();

/* ================= MIDDLEWARE ================= */

// Parse JSON from frontend
app.use(express.json());

/* CORS FIX */
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);

/* SESSION */
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

/* PASSPORT */
app.use(passport.initialize());
app.use(passport.session());

/* ================= ROUTES ================= */

app.use("/auth", require("./routes/auth"));

/* ================= SERVER ================= */

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

/* ================= AUTH CHECK ================= */

function ensureAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("http://localhost:5173/");
}
