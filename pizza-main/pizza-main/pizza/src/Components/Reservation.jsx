import React, { useEffect } from 'react';
import './Reservation.css';
import phoneIcon from '/src/assets/phone.png';

const Reservation = () => {
  useEffect(() => {
    const elements = document.querySelectorAll('.fade-left, .fade-right');

    const observer = new IntersectionObserver(
      (entries, observerRef) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observerRef.unobserve(entry.target); 
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    elements.forEach((el) => observer.observe(el));
  }, []);

  return (
    <section className="reservation-section py-5">
      <div className="container">
        <div className="row align-items-center">
          {/* Left Content */}
          <div className="col-lg-6 col-md-6 col-12 fade-left">
            <div className="reservation-left">
              <p className="subtitle">Fresh From Pizzon</p>
              <h2 className="title">Book Online</h2>
              <p className="description">
                Sit amet, consectetur adipiscing elit quisque eget maximus velit, non eleifend libero curabitur dapibus
                mauris sed leo cursus aliquet cras suscipit. Sit amet, consectetur adipiscing elit quisque eget maximus
                velit, non eleifend libero curabitur.
              </p>

              <div className="phone-box d-flex align-items-center">
                <div className="icon">
                  <img src={phoneIcon} alt="Call Icon" className="img-fluid" />
                </div>
                <a href="tel:+911234567890" className="number">+91 123 456 789 0</a>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="col-lg-6 col-md-6 col-12 fade-right">
            <div className="reservation-form">
              <h3 className="form-title mb-4 text-center">BOOK A TABLE</h3>
              <form>
                <div className="mb-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    required
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    required
                  />
                </div>
                <div className="mb-4">
                  <select className="form-control" required>
                    <option value="">How many persons?</option>
                    <option value="5">5 Persons</option>
                    <option value="4">4 Persons</option>
                    <option value="3">3 Persons</option>
                  </select>
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Date"
                    required
                  />
                </div>
                <div className="text-start">
                  <button type="submit" className="btn book-btn">
                    Book Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reservation;
