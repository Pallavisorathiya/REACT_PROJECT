import React, { useState } from "react";
import "./style.css"

const ReviewForm = () => {
  const initialInput = {
    uname: "",
    email: "",
    message: "",
    rating: 0,
    password: "",
  };

  const [inputForm, setInputForm] = useState(initialInput);
  const [errorsList, setErrorsList] = useState({});
  const [reviews, setReviews] = useState([]);

  const handleInputChange = (name, value) => {
    setInputForm({
      ...inputForm,
      [name]: value,
    });
  };

  const validate = () => {
    let errorList = {};

    if (inputForm.uname == "") {
      errorList.uname = "Please enter your name.";
    }
    if (inputForm.email == "") {
      errorList.email = "Please enter your email.";
    }
    if (inputForm.message == "") {
      errorList.message = "Please enter your message.";
    }
    if (inputForm.rating == 0) {
      errorList.rating = "Please select a rating.";
    }
    if (inputForm.password == "") {
      errorList.password = "Please enter your password.";
    }

    setErrorsList(errorList);
    return Object.keys(errorList).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      console.log("Form Submitted Successfully", inputForm);
      setReviews([...reviews, inputForm]);
      setInputForm(initialInput);
      setErrorsList({});
    } else {
      console.log("Form is not valid");
    }
  };

  return (
    <div className="main-container">
  
  <h1 className="page-title">Share Your Thoughts with Us</h1>
    <div className="review-container">
      
      <form onSubmit={handleSubmit} className="review-form">
        
        <label>User Name:</label>
        <input type="text" value={inputForm.uname} onChange={(e) => handleInputChange("uname", e.target.value)}/>
        {errorsList.uname ? <div className="error">{errorsList.uname}</div> : ""}
        <br /><br />

        <label>Email:</label>
        <input type="text" value={inputForm.email} onChange={(e) => handleInputChange("email", e.target.value)} />
        {errorsList.email ? <div className="error">{errorsList.email}</div> : ""}
        <br /><br />

        <label>Message:</label>
        <input type="text" value={inputForm.message} onChange={(e) => handleInputChange("message", e.target.value)}/>
        {errorsList.message ? <div className="error">{errorsList.message}</div> : ""}
        <br /><br />

        <label>Rating:</label>
        <div className="rating-stars">
          {[1, 2, 3, 4, 5].map((star) => (<span key={star}className={`star ${inputForm.rating >= star ? "selected" : ""}`}
          onClick={() => handleInputChange("rating", star)}>★</span>
          ))}
        </div>
        {errorsList.rating ? <div className="error">{errorsList.rating}</div> : ""}
        <br /><br />

        <label>Password:</label>
        <input type="password"value={inputForm.password} onChange={(e) => handleInputChange("password", e.target.value)}/>
        {errorsList.password ? <div className="error">{errorsList.password}</div> : ""}
        <br /><br />

        <button type="submit">Submit</button>
      </form>

      <h2>Submitted Reviews</h2>
      <div className="review-list">
        {reviews.map((review, index) => (
          <div className="review-card" key={index}>
            <h3>{review.uname}</h3>
            <p><span>Email:</span> {review.email}</p>
            <p><span>Message:</span> {review.message}</p>
            <p>
              <span>Rating:</span>{" "}
              <span className="gold-stars">{"★".repeat(review.rating)}</span>
            </p>
            <p><span>Password:</span> {review.password}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default ReviewForm;
