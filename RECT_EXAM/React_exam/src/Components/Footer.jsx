import React from "react";
import "./Footer.css";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import logo from "../assets/cropped-logo2.png";

const Footer = () => {
  return (
    <footer className="sms-footer">
      <div className="footer-container">
        {/* Left: Brand */}
        <div className="footer-section">
           <img src={logo} alt="Sweedu" className="header-logo" />
          <p className="desc">
            A simple system to manage student records, boost productivity and streamline data.
          </p>
        </div>

        {/* Middle: Links */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/students/add">Add Student</a></li>
            <li><a href="/students">All Students</a></li>
          </ul>
        </div>

        {/* Right: Newsletter + socials */}
        <div className="footer-section">
          <h4>Stay Updated</h4>
          <form className="newsletter">
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Subscribe</button>
          </form>
          <div className="socials">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Student Management System. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
