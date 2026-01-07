import React, { useEffect, useState } from "react";
import { fetchElectronic } from "../services/ElectronicServices";
import { useNavigate } from "react-router-dom";

const ProductPage = () => {
  const [electronics, setElectronics] = useState([]);
  const [cart, setCart] = useState([]);
  const [showModal, setShowModal] = useState(false);
const [activeVideoId, setActiveVideoId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const loadElectronics = async () => {
      const data = await fetchElectronic();
      setElectronics(data);
    };
    loadElectronics();

    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const addToCart = (electronic) => {
    const token = localStorage.getItem("token");

    //  Require sign-in before adding to cart
    if (!token) {
      alert("Please sign in first to add items to your cart ⌚");
      navigate("/signin");
      return;
    }

    const updatedCart = [...cart, electronic];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert(`${electronic.name} added to cart! 🎧`);
  };

  const getYouTubeId = (url) => {
  if (!url) return null;

  const regExp =
    /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([^&?/]+)/;
  const match = url.match(regExp);

  return match ? match[1] : null;
};

  return (
    <div style={styles.page} >
      <h1 style={styles.title}> Electronics Collection</h1>
      <p style={styles.subtitle}>Powering your life with premium electronics. </p>

      <div style={styles.grid}>
        {electronics.map((item) => (
          <div key={item._id} style={styles.card}>
            <img
              src={
                item.image
                  ? item.image.startsWith("http")
                    ? item.image
                    : `http://localhost:5000/uploads/${item.image}`
                  : "https://via.placeholder.com/180"
              }
              alt={item.name}
              style={styles.image}
            />

            <h3 style={styles.name}>{item.name}</h3>
            <p style={styles.desc}>{item.description}</p>
            <p style={styles.price}>₹{item.price}</p>
            <button
              style={styles.btn}
              onMouseOver={(e) =>
                (e.target.style.background =
                  "linear-gradient(90deg, #7c5266ff, #846171ff)")
              }
              onMouseOut={(e) =>
                (e.target.style.background =
                  "linear-gradient(90deg, #683448ff, #561435ff)")
              }
              onClick={() => addToCart(item)}
            >
              Add to Cart 
            </button><br/>
            {item.reviewUrl && (
  <button
    style={styles.link}
    onClick={() => {
      const id = getYouTubeId(item.reviewUrl);
      if (id) {
        setActiveVideoId(id);
        setShowModal(true);
      }
    }}
  >
    More about the product
  </button>
)}

            {/* {item.reviewUrl && (
  <a
    href={item.reviewUrl}
    target="_blank"
    rel="noopener noreferrer"
    style={styles.link}
  >
    More about the product
  </a>
)} */}

          </div>
        ))}
      </div>
      {showModal && (
  <div style={styles.modalOverlay} onClick={() => {setShowModal(false);setActiveVideoId(null);}}>
    <div
      style={styles.modalContent}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        style={styles.closeBtn}
        onClick={() => {setShowModal(false);setActiveVideoId(null);}}
      >
        ✕
      </button>

      <iframe
        width="100%"
        height="315"
        src={`https://www.youtube.com/embed/${activeVideoId}`}
        title="Product Review"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{ borderRadius: "10px" }}
      />
    </div>
  </div>
)}

    </div>
  );
};

const styles = {
  page: {
   background: 'linear-gradient(135deg, #825368ff, #697b85ff)',
    minHeight: "100vh",
    padding: "40px 24px",
    fontFamily: "'Poppins', sans-serif",
    textAlign: "center",
  },
  title: {
    color: "#4d2336",
    marginBottom: "10px",
    fontSize: "2.3rem",
    letterSpacing: "0.5px",
  },
  subtitle: {
    color: "#66344d",
    marginBottom: "35px",
    fontSize: "1.1rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "28px",
    justifyContent: "center",
  },
  card: {
    background: "rgba(146, 146, 146, 0.8)",
    borderRadius: "18px",
    boxShadow: "0 8px 22px rgba(255, 130, 160, 0.25)",
    padding: "20px",
    transition: "all 0.3s ease",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
  },
  image: {
    width: "100%",
    height: "180px",
    borderRadius: "14px",
    objectFit: "cover",
    marginBottom: "14px",
    boxShadow: "0 4px 14px rgba(255, 100, 150, 0.15)",
  },
  name: {
    color: "#4d2336",
    fontSize: "1.2rem",
    marginBottom: "8px",
  },
  desc: {
    color: "#70425d",
    fontSize: "0.95rem",
    marginBottom: "10px",
  },
  price: {
    color: "#561435ff",
    fontWeight: "bold",
    marginBottom: "14px",
    fontSize: "1rem",
  },
  btn: {
    background: "linear-gradient(90deg, #561435ff, #561435ff)",
    color: "white",
    border: "none",
    borderRadius: "12px",
    padding: "10px 16px",
    cursor: "pointer",
    fontWeight: 600,
    transition: "all 0.25s ease",
    boxShadow: "0 6px 16px rgba(255,110,160,0.25)",
  },
  link:{
    display: "inline-block", 
    textDecorationLine:"none",
    color:"rgba(37, 24, 81, 1)",
    marginTop:"10px",
    background: "none",
  border: "none",
  cursor: "pointer",
  },
  modalOverlay: {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(0,0,0,0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
},

modalContent: {
  background: "#1a1a1a",
  padding: "20px",
  borderRadius: "14px",
  width: "90%",
  maxWidth: "560px",
  position: "relative",
},

closeBtn: {
  position: "absolute",
  top: "10px",
  right: "12px",
  background: "transparent",
  border: "none",
  color: "white",
  fontSize: "20px",
  cursor: "pointer",
}

};

export default ProductPage;
