// src/components/NavBar.jsx
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const [isSmall, setIsSmall] = useState(window.innerWidth <= 820);
  const navigate = useNavigate();

  // Get user info safely
  const storedUser = localStorage.getItem("user");
  const user = storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;
  const isAdmin = user?.role === "admin";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/signin");
  };

  // Responsive
  useEffect(() => {
    const handleResize = () => setIsSmall(window.innerWidth <= 820);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const palette = {
    bgGradient: "linear-gradient(90deg, #b1467bff, #925378ff, #b77e9dff)",
    bubble: "linear-gradient(135deg, #561435ff, #561435ff)",
    linkHover: "#561435ff",
    text: "#52293a",
    glass: "rgba(106, 102, 102, 0.6)",
    blur: "12px",
  };

  const styles = {
    wrapper: {
      position: "sticky",
      top: 0,
      zIndex: 100,
      backdropFilter: `blur(${palette.blur})`,
      WebkitBackdropFilter: `blur(${palette.blur})`,
      background: palette.bgGradient,
      boxShadow: "0 6px 20px rgba(255,150,180,0.2)",
      padding: "12px 20px",
        borderRadius:"10px"
      // borderBottomLeftRadius: 18,
      // borderBottomRightRadius: 18,
    },
    container: { maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" },
    brand: { display: "flex", alignItems: "center", gap: 12, textDecoration: "none", color: palette.text, fontWeight: 800, fontSize: 22, letterSpacing: 0.5 },
    logoBubble: { width: 44, height: 44, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: palette.bubble, color: "white", fontSize: 20, boxShadow: "0 4px 10px rgba(255,120,160,0.25)" },
    nav: { display: "flex", alignItems: "center", gap: 14 },
    link: { padding: "8px 14px", borderRadius: 12, textDecoration: "none", color: palette.text, fontWeight: 600, transition: "all 0.25s ease" },
    activeLink: { background: "white", color: palette.linkHover, boxShadow: "0 4px 12px rgba(255,100,150,0.15)" },
    signBtn: { padding: "8px 14px", borderRadius: 14, background: palette.bubble, color: "white", fontWeight: 600, textDecoration: "none", transition: "all 0.3s ease", boxShadow: "0 6px 14px rgba(255,120,150,0.2)" },
    cta: { padding: "8px 14px", borderRadius: 14, background: "#561435ff", color: "white", fontWeight: 700, textDecoration: "none", boxShadow: "0 6px 14px rgba(255,120,150,0.25)" },
    hamburger: { display: "none", background: "transparent", border: "none", cursor: "pointer" },
    mobileMenu: { display: open ? "flex" : "none", flexDirection: "column", gap: 10, marginTop: 12, padding: 12, borderRadius: 14, background: palette.glass, backdropFilter: `blur(${palette.blur})`, boxShadow: "0 6px 20px rgba(255,150,180,0.2)" },
  };

  const navLinkStyle = ({ isActive }) => (isActive ? { ...styles.link, ...styles.activeLink } : styles.link);

  return (
    <nav style={styles.wrapper}>
      <div style={styles.container}>
        <NavLink to="/" style={styles.brand}>
          <div style={styles.logoBubble}>💻</div>
          <span>Electra Forge</span>
        </NavLink>

        {/* Desktop Nav */}
        <div style={{ ...styles.nav, ...(isSmall ? { display: "none" } : undefined) }}>
          <NavLink to="/" style={navLinkStyle}>Home</NavLink>
          <NavLink to="/about" style={navLinkStyle}>About</NavLink>
          <NavLink to="/products" style={navLinkStyle}>Products</NavLink>
          <NavLink to="/cart" style={navLinkStyle}>Cart 🛒</NavLink>

          {!user && (
            <>
              <NavLink to="/signup" style={styles.signBtn}>Sign Up</NavLink>
              <NavLink to="/signin" style={{ ...styles.signBtn, background: "#561435ff" }}>Sign In</NavLink>
              <NavLink to="/admin-login" style={styles.cta}>Admin Login</NavLink>
            </>
          )}

          {/* Admin links */}
          {user && isAdmin && (
            <>
              <NavLink to="/admin/users" style={styles.cta}>Users</NavLink>
              <NavLink to="/admin/electronic-world" style={styles.cta}>ElectronicsWorld</NavLink>
            </>
          )}

          {user && <button onClick={handleLogout} style={styles.signBtn}>Logout</button>}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle Menu"
          style={{
            ...styles.hamburger,
            ...(isSmall ? { display: "block" } : { display: "none" }),
          }}
        >
          <svg width="30" height="20" viewBox="0 0 30 20" fill="none">
            <rect y="0" width="30" height="2" rx="1" fill={palette.text} />
            <rect y="9" width="20" height="2" rx="1" fill={palette.text} />
            <rect y="18" width="14" height="2" rx="1" fill={palette.text} />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div style={{ maxWidth: 1100, margin: "8px auto 0", padding: "0 18px", ...(isSmall ? {} : { display: "none" }) }}>
        <div style={styles.mobileMenu}>
          <NavLink to="/" onClick={() => setOpen(false)} style={navLinkStyle}>Home</NavLink>
          <NavLink to="/about" onClick={() => setOpen(false)} style={navLinkStyle}>About</NavLink>
          <NavLink to="/products" onClick={() => setOpen(false)} style={navLinkStyle}>Products</NavLink>
          <NavLink to="/cart" onClick={() => setOpen(false)} style={navLinkStyle}>Cart 🛒</NavLink>

          {!user && (
            <>
              <NavLink to="/signup" onClick={() => setOpen(false)} style={styles.signBtn}>Sign Up</NavLink>
              <NavLink to="/signin" onClick={() => setOpen(false)} style={{ ...styles.signBtn, background: "#561435ff" }}>Sign In</NavLink>
              <NavLink to="/admin-login" onClick={() => setOpen(false)} style={styles.cta}>Admin Login</NavLink>
            </>
          )}

          {/* Admin links */}
          {user && isAdmin && (
            <>
              <NavLink to="/admin/users" onClick={() => setOpen(false)} style={styles.cta}>Users</NavLink>
              <NavLink to="/admin/electronic-world" onClick={() => setOpen(false)} style={styles.cta}>ElectronicsWorld</NavLink>
            </>
          )}

          {user && <button onClick={handleLogout} style={styles.signBtn}>Logout</button>}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
