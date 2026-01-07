import React, { useEffect, useState } from "react";

const CartPage = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(stored);
  }, []);

  const removeItem = (id) => {
    const updated = cart.filter((item) => item._id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const clearCart = () => {
    localStorage.removeItem("cart");
    setCart([]);
  };

  const total = cart.reduce((sum, item) => sum + (item.price || 0), 0);

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Your Cart</h1>

      {cart.length === 0 ? (
        <p style={{ color: "#4d2336" }}>No Electronics yet — go grab some! </p>
      ) : (
        <>
          <div style={styles.list}>
            {cart.map((item) => (
              <div key={item._id} style={styles.card}>
                <img
                  src={
                    item.image
                      ? item.image.startsWith("http")
                        ? item.image
                        : `http://localhost:5000/uploads/${item.image}`
                      : "https://via.placeholder.com/100"
                  }
                  alt={item.name}
                  style={{ width: "100px", borderRadius: "8px" }}
                />

                <div style={styles.details}>
                  <h3>{item.name}</h3>
                  <p>₹{item.price}</p>
                </div>
                <button
                  onClick={() => removeItem(item._id)}
                  style={styles.removeBtn}
                >
                  ✖
                </button>
              </div>
            ))}
          </div>

          <h2 style={{ color: "#4d2336" }}>Total: ₹{total}</h2>
          <div style={styles.actionRow}>
          <button onClick={clearCart} style={styles.clearBtn}>
            Clear Cart 
          </button>
           <button
    style={styles.buyBtn}
    onClick={() => alert("Your Order will be placed😉...")}
  >
    Buy Now
  </button>
  </div>
        </>
      )}
    </div>
  );
};

const styles = {
  page: {
    background: 'linear-gradient(135deg, #896274ff, #687d89ff)',
    minHeight: "100vh",
    padding: "30px",
    fontFamily: "Poppins, sans-serif",
    textAlign: "center",
  },
  title: {
    color: "#4d2336",
    marginBottom: "25px",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    maxWidth: "600px",
    margin: "0 auto",
  },
  card: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "white",
    borderRadius: "12px",
    padding: "10px 15px",
    boxShadow: "0 6px 16px rgba(255,110,160,0.2)",
  },
  image: {
    width: "60px",
    height: "60px",
    borderRadius: "8px",
    objectFit: "cover",
  },
  details: { flex: 1, marginLeft: 15, textAlign: "left" },
  removeBtn: {
    background: "transparent",
    border: "none",
    color: "#561435ff",
    fontSize: "20px",
    cursor: "pointer",
  },
  clearBtn: {
    marginTop: "25px",
    background: "linear-gradient(90deg, #561435ff, #622e41ff)",
    color: "white",
    border: "none",
    padding: "10px 18px",
    borderRadius: "10px",
    fontWeight: 600,
    cursor: "pointer",
  },
  buyBtn: {
    marginTop: "25px",
  background: "linear-gradient(90deg, #1f7a4cff, #2fa36aff)",
  color: "white",
  border: "none",
  padding: "10px 18px",
  borderRadius: "10px",
  fontWeight: 600,
  cursor: "pointer",
},
actionRow: {
  display: "flex",
  justifyContent: "center",
  gap: "50px",          // ⭐ THIS CREATES SPACE
  marginTop: "25px",
},

};

export default CartPage;
