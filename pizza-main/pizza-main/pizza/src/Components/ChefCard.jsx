// Components/ChefCard.jsx
import React from 'react';

const ChefCard = ({ chef }) => {
  return (
    <div className="chef-outer d-flex justify-content-center">
      <div className="chef-box text-center">
        <div className="chef-hover">
          <img src={chef.image} alt={chef.name} className="chef-img" />
        </div>
        <h5 className="chef-name">{chef.name}</h5>
        <p className="chef-ct">{chef.title}</p>
      </div>
    </div>
  );
};

export default ChefCard;