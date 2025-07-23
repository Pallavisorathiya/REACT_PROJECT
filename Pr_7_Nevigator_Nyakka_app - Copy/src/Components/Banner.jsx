import React from "react";
import "./Header.css";
import bannerImg from "../assets/banner.avif"; 

const Banner = () => {
  return (
    <div className="nykaa-banner">
      <img src={bannerImg} alt="Nykaa Sale Banner" />
    </div>
  );
};

export default Banner;
