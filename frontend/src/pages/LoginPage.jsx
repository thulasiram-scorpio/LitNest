import "./LoginPage.css";
import { useState } from "react";
import booksImage from "../assets/books.jpg";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [activeForm, setActiveForm] = useState("userLogin");

  return (
    <div className="login-body">
      <div className="container">

        {/* LEFT SECTION */}
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

          {/* USER LOGIN */}
          {activeForm === "userLogin" && (
            <form onSubmit={(e) => {
              e.preventDefault();
              navigate("/dashboard");
            }}>
              <input type="email" placeholder="Email Address" required />
              <input type="password" placeholder="Password" required />
              <button type="submit" className="submit-btn">
                Login
              </button>
            </form>
          )}

          {/* SIGN UP */}
          {activeForm === "signup" && (
            <form>
              <input type="text" placeholder="Full Name" required />
              <input type="email" placeholder="Email Address" required />
              <input type="password" placeholder="Password" required />
              <button type="submit" className="submit-btn">
                Create Account
              </button>
            </form>
          )}

          {/* ADMIN LOGIN */}
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

        {/* RIGHT SECTION */}
        <div className="right">
          <img src={booksImage} alt="Books Illustration" />
        </div>

      </div>
    </div>
  );
}