import React from "react";
import pharmacyImg from "../assets/pharmacy-WEB.avif";
import petcareImg from "../assets/Pet-Care_WEB.avif";
import diaperImg from "../assets/babycare-WEB.avif";
import "./CategoryCards.css";

const CategoryCards = () => {
  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      <div className="row g-3">
        <div className="col-md-4">
          <div className="category-card">
            <img src={pharmacyImg} alt="Pharmacy" className="img-fluid" />
          </div>
        </div>
        <div className="col-md-4">
          <div className="category-card">
            <img src={petcareImg} alt="Pet Care" className="img-fluid" />
          </div>
        </div>
        <div className="col-md-4">
          <div className="category-card">
            <img src={diaperImg} alt="Diaper Run" className="img-fluid" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCards;
