import React, { useEffect } from 'react';
import './About.css';
import aboutImg from '../assets/about.png';
import AOS from 'aos';
import 'aos/dist/aos.css';

const AboutSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 1500,
      once: true,
      offset: 100,
      easing: 'ease-in-out',
    });
  }, []);

  return (
    <section className="about-pizzon ptb" id="about">
      <div className="container">
        <div className="row align-items-center">
         
          <div
            className="col-lg-6 aos-fade-in-left"
            data-aos="custom-left">
            <div className="text-wrap">
              <p className="heading-sub italic">Delicious Restaurant</p>
              <h2 className="heading-title">ABOUT PIZZON</h2>
              <p className="online-des">
                Sit amet, consectetur adipiscing elit quisque eget maximus velit,
                non eleifend libero curabitur dapibus mauris sed leo cursus
                aliquetcras suscipit. Sit amet, consectetur adipiscing elit quisque
                eget maximus velit, non eleifend libero curabitur.
              </p>
              <a href="javascript:void(0)" className="com-btn about-more-z">
                View More
              </a>
            </div>
          </div>

         <div
            className="col-md-6 aos-fade-in-right"
            data-aos="custom-right">
            <div className="about-pizzon-img">
              <img src={aboutImg} alt="about pizzon" className="pizzon-ab" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
