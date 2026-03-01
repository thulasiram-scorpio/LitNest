const express = require("express");
const session = require("express-session");
const passport = require("./config/passport");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(session({
 secret: process.env.SESSION_SECRET,
 resave:false,
 saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());


app.use("/auth", require("./routes/auth"));

app.listen(5000,()=>{
 console.log("Server running");
});

function ensureAuth(req,res,next){
  if(req.isAuthenticated()){
     return next();
  }
  res.redirect("http://localhost:5173/");
}
