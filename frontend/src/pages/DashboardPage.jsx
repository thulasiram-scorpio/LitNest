import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import {
  FaHome,
  FaBook,
  FaLayerGroup,
  FaHeart,
  FaHistory,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaSearch,
  FaTimes
} from "react-icons/fa";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const iconSize = 20;

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
                icon={<FaHome size={iconSize} />}
                text="Dashboard"
                isOpen={isOpen}
                onClick={() => navigate("/dashboard")}
/>
          <SidebarItem icon={<FaBook size={iconSize} />} text="My Works" isOpen={isOpen} />
          <SidebarItem
              icon={<FaLayerGroup size={iconSize} />}
              text="Genres"
              isOpen={isOpen}
              onClick={() => navigate("genres")}
/>
          <SidebarItem icon={<FaHeart size={iconSize} />} text="Favorites" isOpen={isOpen} />
          <SidebarItem icon={<FaHistory size={iconSize} />} text="Reading History" isOpen={isOpen} />
          <SidebarItem icon={<FaUser size={iconSize} />} text="Profile" isOpen={isOpen} />
          <SidebarItem icon={<FaCog size={iconSize} />} text="Settings" isOpen={isOpen} />
          <SidebarItem icon={<FaSignOutAlt size={iconSize} />} text="Logout" isOpen={isOpen} />
        </ul>
      </div>

      {/* Main Section */}
      <div style={styles.main}>
        
        <div style={styles.navbar}>
          <FaBars
            size={26}
            style={{ cursor: "pointer" }}
            onClick={() => setIsOpen(!isOpen)}
          />

          <div style={styles.searchWrapper}>
            <FaSearch size={16} style={{ marginRight: "10px", color: "#666" }} />

            <input
              type="text"
              placeholder="Search books, authors..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={styles.searchInput}
            />

            {search && (
              <FaTimes
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
  container: {
    display: "flex",
    height: "100vh",
    fontFamily: "Poppins, sans-serif",
  },

  sidebar: {
    background: "linear-gradient(to bottom, #1e1e3f, #2a2a55)",
    color: "white",
    padding: "25px 15px",
    transition: "width 0.3s ease",
    overflow: "hidden",
  },

  logo: {
    display: "flex",
    alignItems: "center",
    marginBottom: "40px",
    fontSize: "18px",
  },

  menu: {
    listStyle: "none",
    padding: 0,
  },

  menuItem: {
    display: "flex",
    alignItems: "center",
    gap: "18px",
    padding: "14px 12px",
    cursor: "pointer",
    fontSize: "15px",
    borderRadius: "10px",
    transition: "all 0.3s ease",
  },

  main: {
  flex: 1,
  backgroundColor: "#f2f3f7",
  display: "flex",
  flexDirection: "column",
  height: "100vh",
},

  navbar: {
    height: "75px",
    backgroundColor: "#f5f5f5",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 40px",
    borderBottom: "1px solid #ddd",
    position: "relative",
  },

  searchWrapper: {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#eaeaea",
    padding: "10px 18px",
    borderRadius: "30px",
    width: "380px",
  },

  searchInput: {
    border: "none",
    outline: "none",
    background: "transparent",
    width: "100%",
    fontSize: "15px",
  },

  clearIcon: {
    marginLeft: "10px",
    cursor: "pointer",
    color: "#666",
  },

 content: {
  padding: "50px",
  flex: 1,
  overflowY: "auto",
},
  
};