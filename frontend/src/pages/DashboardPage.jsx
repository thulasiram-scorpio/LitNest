import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import {
  Home,
  Book,
  Layers,
  Heart,
  History,
  User,
  Settings,
  LogOut,
  Menu,
  Search,
  X
} from "lucide-react";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const iconSize = 20;

  // ==========================================
  // 🚀 SECURE LOGOUT FUNCTION
  // ==========================================
  const handleLogout = async () => {
    try {
      // 1. Tell the backend to destroy the session cookie
      await fetch("http://localhost:5000/auth/logout", {
        method: "POST",
        credentials: "include" // CRITICAL: Sends the cookie to be destroyed
      });
      
      // 2. Safely redirect to the login page
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      navigate("/"); // Fallback redirect
    }
  };

  return (
    <div style={styles.container}>
      
      {/* Sidebar */}
      <div
        style={{
          ...styles.sidebar,
          width: isOpen ? "230px" : "80px",
        }}
      >
        <div style={styles.logo}>
          <span style={{ fontSize: "22px" }}>📚</span>
          {isOpen && <span style={{ marginLeft: "10px" }}>LitNest</span>}
        </div>

        <ul style={styles.menu}>
          
          <SidebarItem
                icon={<Home size={iconSize} />}
                text="Dashboard"
                isOpen={isOpen}
                onClick={() => navigate("/dashboard")}
          />
          <SidebarItem 
                icon={<Book size={iconSize} />} 
                text="My Works" 
                isOpen={isOpen}
                onClick={() => navigate("myworks")} 
          />
          <SidebarItem
              icon={<Layers size={iconSize} />}
              text="Genres"
              isOpen={isOpen}
              onClick={() => navigate("genres")}
          />
          <SidebarItem 
              icon={<Heart size={iconSize} />} 
              text="Favorites" 
              isOpen={isOpen}
              onClick={() => navigate("favorites")} 
          />
          <SidebarItem icon={<History size={iconSize} />} text="Reading History" isOpen={isOpen} />
          
          <SidebarItem 
              icon={<User size={iconSize} />} 
              text="Profile" 
              isOpen={isOpen}
              onClick={() => navigate("profile")} 
          />

          <SidebarItem icon={<Settings size={iconSize} />} text="Settings" isOpen={isOpen} />
          
          {/* UPDATED LOGOUT BUTTON */}
          <SidebarItem 
              icon={<LogOut size={iconSize} />}
              text="Logout"
              isOpen={isOpen}
              onClick={handleLogout} 
          />
        </ul>
      </div>

      {/* Main Section */}
      <div style={styles.main}>
        
        <div style={styles.navbar}>
          <Menu
            size={26}
            style={{ cursor: "pointer" }}
            onClick={() => setIsOpen(!isOpen)}
          />

          <div style={styles.searchWrapper}>
            <Search size={16} style={{ marginRight: "10px", color: "#666" }} />

            <input
              type="text"
              placeholder="Search books, authors..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={styles.searchInput}
            />

            {search && (
              <X
                size={16}
                style={styles.clearIcon}
                onClick={() => setSearch("")}
              />
            )}
          </div>
        </div>

        <div style={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

/* 🔥 Sidebar Item Component with Hover Effect */
const SidebarItem = ({ icon, text, isOpen, onClick }) => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <li
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "18px",
        padding: "14px 12px",
        cursor: "pointer",
        fontSize: "15px",
        borderRadius: "10px",
        transition: "all 0.3s ease",
        backgroundColor: hovered
          ? "rgba(255,255,255,0.15)"
          : "transparent",
        transform: hovered ? "translateX(5px)" : "translateX(0px)",
      }}
    >
      {icon}
      {isOpen && <span>{text}</span>}
    </li>
  );
};

/* ================= STYLES ================= */
const styles = {
  container: { display: "flex", height: "100vh", fontFamily: "Poppins, sans-serif" },
  sidebar: { background: "linear-gradient(to bottom, #1e1e3f, #2a2a55)", color: "white", padding: "25px 15px", transition: "width 0.3s ease", overflow: "hidden" },
  logo: { display: "flex", alignItems: "center", marginBottom: "40px", fontSize: "18px" },
  menu: { listStyle: "none", padding: 0 },
  main: { flex: 1, backgroundColor: "#f2f3f7", display: "flex", flexDirection: "column", height: "100vh" },
  navbar: { height: "75px", backgroundColor: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 40px", borderBottom: "1px solid #ddd", position: "relative" },
  searchWrapper: { position: "absolute", left: "50%", transform: "translateX(-50%)", display: "flex", alignItems: "center", backgroundColor: "#eaeaea", padding: "10px 18px", borderRadius: "30px", width: "380px" },
  searchInput: { border: "none", outline: "none", background: "transparent", width: "100%", fontSize: "15px" },
  clearIcon: { marginLeft: "10px", cursor: "pointer", color: "#666" },
  content: { padding: "50px", flex: 1, overflowY: "auto" }
};