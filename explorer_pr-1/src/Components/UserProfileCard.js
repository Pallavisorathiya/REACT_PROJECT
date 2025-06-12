import { Component } from "react";
import './UserProfile.css';

class UserProfileCard extends Component {
  render() {
    const { name, email, address, skills, birthday, phone, image } = this.props;
    return (
      <div className="Profile-card">
        <div className="Card-header">
          <img src={image} alt={name} className="profile-img" />
        </div>
        <div className="card-body">
          <h2 className="profile-name">{name}</h2>
          <ul className="info-list">
            <li><span>Email:</span> {email}</li>
            <li><span>Address:</span> {address}</li>
            <li><span>Skills:</span> {skills}</li>
            <li><span>Birthday:</span> {birthday}</li>
            <li><span>Phone:</span> {phone}</li>
          </ul>
          <div className="card-buttons">
            <button className="follow-btn">FOLLOW</button>
            <button className="info-btn">MORE INFO</button>
          </div>
        </div>
      </div>
    );
  }
}

export default UserProfileCard;
