import React from "react";
import "./about.css";

function About() {
  return (
    <div className="about-page">
      {/* Header Section */}
      <header className="about-header">
        <h1>Electronic World</h1>
        <p className="about-tagline">Your one-stop shop for smart electronics and smarter living.</p>
      </header>

      {/* About Story */}
      <section className="about-story">
        <div className="story-text">
          <h2>Our Story</h2>
          <p>
            Welcome to your trusted destination for the latest and most reliable electronics. 
            From cutting-edge smartphones and smart home devices to powerful laptops and essential accessories, 
            we bring you technology that enhances everyday life. 
            With quality you can trust and prices that fit your budget, 
            we make upgrading your world simple, smooth, and smarter. 
            Step in and discover the future of electronics—today.
          </p>
        </div>
      </section>

      {/* Parallax Image Sections */}
      <div className="parallax img1"></div>
      <div className="parallax img2"></div>
      <div className="parallax img3"></div>
      <div className="parallax img4"></div>
      <div className="parallax img5"></div>
      <div className="parallax img6"></div>

      {/* Our Promise */}
      <section className="about-promise">
        <h2>Our Promise</h2>
        <p>
          Discover the latest and most reliable electronics all in one place. 
          From smartphones to smart home devices, we bring you quality products at the right price. 
          Upgrade your everyday life with technology that’s simple, smart, and made for you.
        </p>
      </section>

      {/* Footer */}
      <footer className="about-footer">
        © 2025 ElectraForge Electronics — Your trusted partner for all things tech.
      </footer>
    </div>
  );
}

export default About;
