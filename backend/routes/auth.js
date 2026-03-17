const router = require("express").Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

/* ================= GOOGLE AUTH ================= */

router.get(
 "/google",
 passport.authenticate("google", {
  scope: ["profile", "email"]
 })
);

router.get(
 "/google/callback",
 passport.authenticate("google", {
  failureRedirect: "http://localhost:5173/"
 }),
 (req, res) => {
  res.redirect("http://localhost:5173/dashboard");
 }
);

/* ================= EMAIL SIGNUP ================= */

router.post("/signup", async (req, res) => {

 try {

  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
   return res.status(400).json({
    success: false,
    message: "User already exists"
   });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
   name,
   email,
   password: hashedPassword
  });

  req.login(user, (err) => {

   if (err) {
    return res.status(500).json({
     success:false,
     message:"Login session failed"
    });
   }

   res.json({
    success:true,
    message:"Signup successful"
   });

  });

 } catch (error) {

  res.status(500).json({
   success:false,
   message:"Server error"
  });

 }

});

/* ================= EMAIL LOGIN ================= */

router.post("/login", async (req, res) => {

 try {

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
   return res.status(400).json({
    success:false,
    message:"User not found"
   });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
   return res.status(400).json({
    success:false,
    message:"Invalid password"
   });
  }

  req.login(user,(err)=>{
    if(err){
      return res.status(500).json({success:false});
    }

    res.json({
      success:true,
      message:"Login successful"
    });
  });

 } catch(err){
  res.status(500).json(err);
 }

});

/* ================= CHECK AUTH STATUS ================= */
router.get("/status", (req, res) => {
  // Passport automatically adds isAuthenticated() to the request
  if (req.isAuthenticated()) {
    res.json({ isAuthenticated: true, user: req.user });
  } else {
    res.json({ isAuthenticated: false });
  }
});

/* ================= LOGOUT ================= */
router.post("/logout", (req, res, next) => {
  // Passport's built-in logout function
  req.logout((err) => {
    if (err) { 
      return next(err); 
    }
    // Destroy the session cookie securely
    res.clearCookie('connect.sid'); 
    res.json({ success: true, message: "Logged out successfully" });
  });
});

module.exports = router;
