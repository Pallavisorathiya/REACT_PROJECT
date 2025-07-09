import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./CustomerReviews.css";

import { testimonials, reviewDecor } from "./CustomerAssets";

const CustomerReviews = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));
  }, []);

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    vertical: true,
    verticalSwiping: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    draggable: true,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 600,
  };

  return (
    <section className="customer fade-up">
      <div className="customer-top-bg">
        <img src={reviewDecor.topBg} alt="top background" />
      </div>

      <div className="container">
        <div className="customer-inner fade-up">
          <div className="headding-part fade-up">
            <p className="headding-sub">What Say Our Clients</p>
            <h2 className="heading-title">CUSTOMER REVIEWS</h2>
          </div>

          <Slider {...settings}>
            {testimonials.map((item, index) => (
              <div className="customer-detail fade-up" key={index}>
                <div className="customer-img">
                  <div className="customer-img-in">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="customer-image"
                    />
                    <p className="customer-name">{item.name}</p>
                  </div>
                </div>
                <div className="customer-reviews">
                  <p className="review-cus">{item.text}</p>
                  <label className="post-name">
                    {item.name} - <span>{item.role}</span>
                  </label>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <div className="customer-bottom-bg">
        <img src={reviewDecor.bottomBg} alt="bottom background" />
      </div>
    </section>
  );
};

export default CustomerReviews;