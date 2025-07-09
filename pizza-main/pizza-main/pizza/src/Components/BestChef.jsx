import React, { useState, useEffect, useRef } from 'react';
import './BestChef.css';
import ChefCard from './ChefCard';

import chef1 from '../assets/chef1.jpg';
import chef2 from '../assets/chef2.jpg';
import chef3 from '../assets/chef3.jpg';
import chef4 from '../assets/chef4.jpg';
import chef5 from '../assets/chef5.jpg';
import chef6 from '../assets/chef6.jpg';
import chefTop from '../assets/chef-top.png';
import chefBottom from '../assets/bottom.png';
import middleBg from '../assets/middle.png';

const chefImages = [chef1, chef2, chef3, chef4, chef5, chef6];
const chefData = chefImages.map((img) => ({
  name: 'JOHN DOE',
  title: 'Sous Chef',
  image: img,
}));

const BestChef = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(4);
  const sectionRef = useRef(null);

  const updateVisibleCards = () => {
    const width = window.innerWidth;
    if (width < 576) setVisibleCards(1);
    else if (width < 768) setVisibleCards(2);
    else if (width < 992) setVisibleCards(3);
    else setVisibleCards(4);
  };

  useEffect(() => {
    updateVisibleCards();
    window.addEventListener('resize', updateVisibleCards);
    return () => window.removeEventListener('resize', updateVisibleCards);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % chefData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setStartIndex((prev) => (prev - 1 + chefData.length) % chefData.length);
  };

  const getVisibleChefs = () => {
    if (visibleCards >= chefData.length) return chefData;
    return Array.from({ length: visibleCards }, (_, i) => chefData[(startIndex + i) % chefData.length]);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-up');
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section className="chef" ref={sectionRef}>
      <div className="chef-top-bg">
        <img src={chefTop} alt="Top Decoration" />
      </div>

      <div className="bg" style={{ backgroundImage: `url(${middleBg})` }}>
        <div className="container text-center headding-part">
          <h3 className="section-subtitle">Meet our expert's</h3>
          <h2>OUR BEST CHEF</h2>
        </div>

        <div className="carousel-wrapper container d-flex align-items-center">
          <button className="carousel-arrow left" onClick={prevSlide}>
            <span>&#10094;</span>
          </button>

          <div className="chef-cards gap-4 overflow-hidden">
            {getVisibleChefs().map((chef, index) => (
              <ChefCard chef={chef} key={`${chef.name}-${index}`} />
            ))}
          </div>

          <button
            className="carousel-arrow right"
            onClick={() => setStartIndex((prev) => (prev + 1) % chefData.length)}
          >
            <span>&#10095;</span>
          </button>
        </div>
      </div>

      <div className="chef-bottom-bg">
        <img src={chefBottom} alt="Bottom Decoration" />
      </div>
    </section>
  );
};

export default BestChef;