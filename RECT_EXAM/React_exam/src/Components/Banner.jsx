import React, { Component } from "react";
import "./Banner.css";
import bgDefault from "../assets/banner.jpg"; 

class Banner extends Component {
  render() {
    const { bg } = this.props;

    
    const bgUrl = bg || bgDefault;

    return (
      <section
        className="hero-banner"
        style={{ backgroundImage: `url(${bgUrl})` }}
      >
        <div className="hero-overlay" />
      
      </section>
    );
  }
}

export default Banner;
