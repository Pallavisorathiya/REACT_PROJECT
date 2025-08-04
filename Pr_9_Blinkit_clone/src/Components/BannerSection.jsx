import React from "react";
import bannerImg from "../assets/Group-33704.webp"; 

const Banner = () => {
  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      <img
        src={bannerImg}
        alt="Paan Corner Banner"
        style={{ width: "100%", borderRadius: "15px" }}
      />
    </div>
  );
};

export default Banner;
