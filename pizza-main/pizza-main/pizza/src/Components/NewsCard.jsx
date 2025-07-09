// components/NewsCard.jsx
import React from 'react';

const NewsCard = ({ image, date, month, author, comments }) => {
  return (
    <div className="col-12 col-md-6 col-lg-4 mb-5 fade-up">
      <div className="new-box">
        <div className="news-img">
          <img src={image} alt="news" className="news-image" />
          <div className="news-date">
            <span>{date}<br />{month}</span>
          </div>
          <span className="news-date-bg"></span>
        </div>

        <ul className="meta-info">
          <li>By - {author}</li>
          <li>{comments} Comments</li>
        </ul>

        <a href="#" className="news-headline">
          Possession so comparison inquietude he conviction
        </a>
        <a href="#" className="news-more">Read More</a>
      </div>
    </div>
  );
};

export default NewsCard;