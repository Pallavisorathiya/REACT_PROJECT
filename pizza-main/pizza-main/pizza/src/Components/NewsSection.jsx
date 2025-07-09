// components/NewsSection.jsx
import React, { useEffect } from 'react';
import './NewsSection.css';
import NewsCard from './NewsCard';

import news1 from '../assets/about1.jpg';
import news2 from '../assets/about2.jpg';
import news3 from '../assets/about3.jpg';

const NewsSection = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el));
  }, []);

  const newsItems = [
    { image: news1, date: '15', month: 'JUNE', author: 'John Doe', comments: 0 },
    { image: news2, date: '16', month: 'JUNE', author: 'Jane Smith', comments: 3 },
    { image: news3, date: '17', month: 'JUNE', author: 'Alex Ray', comments: 1 },
  ];

  return (
    <section className="news ptb fade-up">
      <div className="container">
        <div className="text-center pb-4 fade-up">
          <p className="heading-sub">Recent Events</p>
          <h2 className="heading-title">Latest News</h2>
        </div>

        <div className="row">
          {newsItems.map((item, index) => (
            <NewsCard key={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;