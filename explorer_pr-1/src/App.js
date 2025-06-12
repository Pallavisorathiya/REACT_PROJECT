import React from 'react';
import UserProfileCard from './Components/UserProfileCard';
import './Components/UserProfile.css';

function App() {
  return (
    <div className="main-container">
      <h1 className="page-title"> User Profile Cards </h1>
      <div className="card-grid">
        <UserProfileCard
          name="Rekha shah"
          email="Rekha@gmail.com"
          birthday="2-10-1999"
          skills="HTML, CSS, JS"
          address="Surat"
          image="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          phone="123-456-7890"
        />
        <UserProfileCard
          name="Ravi Mehta"
          email="ravi@gmail.com"
          birthday="10-08-1998"
          skills="React, Node.js"
          address="Ahmedabad"
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3lAsaRkY1bio7NHqRCtay8n-WZSMXHGBpcA&s"
          phone="987-654-3210"
        />
        <UserProfileCard
          name="Poonam Shah"
          email="kajal@gmail.com"
          birthday="05-03-2000"
          skills="Bootstrap, Git"
          address="Baroda"
          image="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z2lybCUyMHBpY3R1cmV8ZW58MHx8MHx8fDA%3D"
          phone="555-111-2222"
        />
        <UserProfileCard
          name="Amit Desai"
          email="amit@gmail.com"
          birthday="17-10-1997"
          skills="MongoDB, Express"
          address="Rajkot"
          image="https://t4.ftcdn.net/jpg/03/96/16/79/360_F_396167959_aAhZiGlJoeXOBHivMvaO0Aloxvhg3eVT.jpg"
          phone="777-888-9999"
        />
        <UserProfileCard
          name="Nisha Bhatt"
          email="nisha@gmail.com"
          birthday="20-03-1998"
          skills="Vue, Angular"
          address="Jamnagar"
          image="https://img.freepik.com/free-photo/lifestyle-people-emotions-casual-concept-confident-nice-smiling-asian-woman-cross-arms-chest-confident-ready-help-listening-coworkers-taking-part-conversation_1258-59335.jpg"
          phone="444-222-1111"
        />
        <UserProfileCard
          name="Mehul Shah"
          email="mehul@gmail.com"
          birthday="30-05-2001"
          skills="Python, Django"
          address="Surendranagar"
          image="https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?semt=ais_hybrid&w=740"
          phone="999-000-1234"
        />
      </div>
    </div>
  );
}

export default App;
