import "./LoginPage.css";
import { useState } from "react";
import booksImage from "../assets/books.jpg";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {

  const navigate = useNavigate();
  const [activeForm, setActiveForm] = useState("userLogin");

  // Signup state
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  // Login state
  const [loginEmail,setLoginEmail] = useState("");
  const [loginPassword,setLoginPassword] = useState("");

  const GoogleSignInButton = () => (
    <a href="http://localhost:5000/auth/google" className="google-btn-link">
      <button type="button" className="google-btn">
        Continue with Google
      </button>
    </a>
  );

  /* ================= SIGNUP FUNCTION ================= */

  const handleSignup = async (e) => {

    e.preventDefault();

    try{

      const res = await fetch("http://localhost:5000/auth/signup",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        credentials:"include",
        body: JSON.stringify({
          name,
          email,
          password
        })
      });

      const data = await res.json();

      if(data.success){
        navigate("/dashboard");
      }
      else{
        alert(data.message);
      }

    }
    catch(error){
      console.error(error);
    }

  };

  /* ================= LOGIN FUNCTION (STEP 9) ================= */

  const handleLogin = async (e) => {

    e.preventDefault();

    try{

      const res = await fetch("http://localhost:5000/auth/login",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        credentials:"include",
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword
        })
      });

      const data = await res.json();

      if(data.success){
        navigate("/dashboard");
      }
      else{
        alert(data.message);
      }

    }
    catch(error){
      console.error(error);
    }

  };

  return (
    <div className="login-body">
      <div className="container">

        <div className="left">

          <div className="logo">
            Lit<span>Nest</span>
          </div>

          <div className="tabs">

            <button
              className={`tab-btn ${activeForm === "userLogin" ? "active" : ""}`}
              onClick={() => setActiveForm("userLogin")}
            >
              User Login
            </button>

            <button
              className={`tab-btn ${activeForm === "signup" ? "active" : ""}`}
              onClick={() => setActiveForm("signup")}
            >
              Sign Up
            </button>

            <button
              className={`tab-btn ${activeForm === "adminLogin" ? "active" : ""}`}
              onClick={() => setActiveForm("adminLogin")}
            >
              Admin
            </button>

          </div>

          {/* ================= USER LOGIN ================= */}

          {activeForm === "userLogin" && (

            <form onSubmit={handleLogin}>

              <input
                type="email"
                placeholder="Email Address"
                value={loginEmail}
                onChange={(e)=>setLoginEmail(e.target.value)}
                required
              />

              <input
                type="password"
                placeholder="Password"
                value={loginPassword}
                onChange={(e)=>setLoginPassword(e.target.value)}
                required
              />

              <button type="submit" className="submit-btn">
                Login
              </button>

              <div style={{textAlign:"center"}}>OR</div>

              <div style={{display:"flex",justifyContent:"center"}}>
                <GoogleSignInButton/>
              </div>

            </form>

          )}

          {/* ================= SIGNUP ================= */}

          {activeForm === "signup" && (

            <form onSubmit={handleSignup}>

              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                required
              />

              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                required
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                required
              />

              <button type="submit" className="submit-btn">
                Create Account
              </button>

              <div style={{textAlign:"center"}}>OR</div>

              <div style={{display:"flex",justifyContent:"center"}}>
                <GoogleSignInButton/>
              </div>

            </form>

          )}

          {/* ================= ADMIN LOGIN ================= */}

          {activeForm === "adminLogin" && (

            <form>

              <input type="text" placeholder="Admin ID" required />

              <input type="password" placeholder="Password" required />

              <button type="submit" className="submit-btn">
                Admin Login
              </button>

            </form>

          )}

        </div>

        <div className="right">
          <img src={booksImage} alt="Books Illustration"/>
        </div>

      </div>
    </div>
  );
}
