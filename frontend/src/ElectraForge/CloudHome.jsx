import React, { useState, useEffect } from "react";

function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    "/Images/apple.png",
    "/Images/lap.png",
    "/Images/metalwatch.png",
    "/Images/earbuds.png"
  ];

  // Change slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div
      style={{
        fontFamily: "'Poppins', sans-serif",
        textAlign: "center",
        color: "#4d2336",
        background: "linear-gradient(135deg, #7f757aff, #8d8488ff, #7e7378ff)",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Heading */}
      <header
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 3,
          textShadow: "0 3px 10px rgba(146, 75, 95, 0.6)",
          animation: "float 4s ease-in-out infinite",
        
        }}
      >
       <h1
  style={{
    fontSize: "3rem",
    color: "#6d3450",
    marginBottom: "10px",
  }}
>
  Electronics World
</h1>

        <p
          style={{
            fontSize: "1.3rem",
            color: "#6d3450",
            fontStyle: "italic",
            
          }}
        >
          Where innovation meets everyday life. 
        </p>
      </header>

      {/* Slideshow Background */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          top: 0,
          left: 0,
        }}
      >
        {slides.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Slide ${index + 1}`}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: index === currentIndex ? 1 : 0,
              transition: "opacity 2s ease-in-out",
              filter: "brightness(0.9)",
            }}
          />
        ))}
      </div>

      {/* Soft Overlay */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(to bottom right, rgba(255, 240, 250, 0.4), rgba(255, 200, 230, 0.6))",
          zIndex: 1,
        }}
      ></div>
    </div>
  );
}

export default HomePage;
