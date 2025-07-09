import React, { useState } from 'react';
import { Carousel, Container } from 'react-bootstrap';
import './BannerSlider.css';
import 'animate.css';

import bg1 from '../assets/banner-bg-1.png';
import bg3 from '../assets/banner-bg-3.png';
import bg4 from '../assets/banner-bg-4.png';
import bg5 from '../assets/banner-bg-5.png';

import pizza1 from '../assets/pizza-banner-1.png';
import pizza2 from '../assets/pizza-1.png';
import pizza3 from '../assets/pizza-2.png';
import pizza4 from '../assets/pizza-3.png';
import pizza5 from '../assets/pizza-4.png';
import pizza6 from '../assets/pizza-5.png';
import pizza7 from '../assets/pizza-6.png';

import banner2 from '../assets/pizza-banner-2.png';
import p7 from '../assets/pizza-7.png';
import p8 from '../assets/pizza-8.png';
import p9 from '../assets/pizza-9.png';
import p11 from '../assets/pizza-11.png';
import p12 from '../assets/pizza-12.png';

const BannerSlider = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const handlePrev = () => {
    setIndex((prevIndex) => (prevIndex === 0 ? 2 : prevIndex - 1));
  };

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex === 2 ? 0 : prevIndex + 1));
  };

  return (
    <section className="banner" id="top">
      <Carousel
        fade
        activeIndex={index}
        onSelect={handleSelect}
        interval={6000}
        indicators={false}
        controls={false}
        pause={false}
      >
        {/* SLIDE 1 */}
        <Carousel.Item>
          <div className="banner-box">
            <Container className="banner-center text-center">
              <div className="banner-text text-center">
                <h2 className="banner-headding animate__animated animate__fadeInDown animate__delay-1s">
                  Quality F<span>oo</span>ds
                </h2>
                <p className="banner-sub-hed animate__animated animate__fadeInDown animate__delay-2s">
                  Healthy Food for healthy body
                </p>
              </div>
              <div className="banner-images all-img-banner">
                <img src={bg1} alt="pizza" className="pizza-img animate__animated animate__fadeInUpBig animate__delay-3s" />
                <img src={bg3} alt="pizza" className="pizza-it pizza-2 animate__animated animate__fadeInDown animate__delay-4s" />
                <img src={bg4} alt="pizza" className="pizza-it pizza-3 animate__animated animate__fadeInDown animate__delay-5s" />
                <img src={bg5} alt="pizza" className="pizza-it pizza-4 animate__animated animate__fadeInDown animate__delay-6s" />
              </div>
            </Container>
          </div>
        </Carousel.Item>

        {/* SLIDE 2 */}
        <Carousel.Item>
          <div className="banner-box d-flex">
            <Container className="banner-center d-flex justify-content-between align-items-center">
              <div className="banner-text">
                <h2 className="banner-headding animate__animated animate__rotateInDownLeft animate__delay-1s">
                  Quality F<span>oo</span>ds
                </h2>
                <p className="banner-sub-hed animate__animated animate__rotateInUpLeft animate__delay-2s">
                  Healthy Food for healthy body
                </p>
              </div>
              <div className="banner-images all-img-banner">
                <img src={pizza1} alt="pizza" className="pizza-img animate__animated animate__fadeInRight animate__delay-3s" />
                <img src={pizza2} alt="pizza" className="pizza-it pizza-1 animate__animated animate__zoomIn animate__delay-4s" />
                <img src={pizza3} alt="pizza" className="pizza-it pizza-2 animate__animated animate__zoomIn animate__delay-5s" />
                <img src={pizza4} alt="pizza" className="pizza-it pizza-3 animate__animated animate__zoomIn animate__delay-6s" />
                <img src={pizza5} alt="pizza" className="pizza-it pizza-4 animate__animated animate__zoomIn animate__delay-7s" />
                <img src={pizza6} alt="pizza" className="pizza-it pizza-5 animate__animated animate__zoomIn animate__delay-8s" />
                <img src={pizza7} alt="pizza" className="pizza-it pizza-6 animate__animated animate__zoomIn animate__delay-9s" />
              </div>
            </Container>
          </div>
        </Carousel.Item>

        {/* SLIDE 3 */}
        <Carousel.Item>
          <div className="banner-box d-flex">
            <Container className="banner-center d-flex justify-content-between align-items-center">
              <div className="banner-images all-img-banner">
                <img src={banner2} alt="pizza" className="pizza-img animate__animated animate__fadeInLeft animate__delay-2s" />
                <img src={p7} alt="pizza" className="pizza-it pizza-1 animate__animated animate__bounceInDown animate__delay-3s" />
                <img src={p8} alt="pizza" className="pizza-it pizza-2 animate__animated animate__bounceInDown animate__delay-4s" />
                <img src={p9} alt="pizza" className="pizza-it pizza-3 animate__animated animate__bounceInDown animate__delay-5s" />
                <img src={p11} alt="pizza" className="pizza-it pizza-5 animate__animated animate__bounceInDown animate__delay-6s" />
                <img src={p12} alt="pizza" className="pizza-it pizza-6 animate__animated animate__bounceInDown animate__delay-7s" />
              </div>
              <div className="banner-text">
                <h2 className="banner-headding animate__animated animate__fadeInRight animate__delay-1s">
                  Quality F<span>oo</span>ds
                </h2>
                <p className="banner-sub-hed animate__animated animate__fadeInRight animate__delay-2s">
                  Healthy Food for healthy body
                </p>
              </div>
            </Container>
          </div>
        </Carousel.Item>
      </Carousel>

      {/* Custom Manual Arrow Buttons */}
      <button className="custom-arrow left-arrow" onClick={handlePrev}>&#10094;</button>
      <button className="custom-arrow right-arrow" onClick={handleNext}>&#10095;</button>
    </section>
  );
};

export default BannerSlider;
