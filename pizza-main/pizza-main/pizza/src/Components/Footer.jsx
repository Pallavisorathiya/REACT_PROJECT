import './Footer.css';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { RiArrowUpSLine } from "react-icons/ri";
import footer from '../assets/footer.png';
import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <div className="footer-container">
          {/* Column 1 */}
          <div className="footer-col">
            <div className="footer-logo">
              <img src={footer} alt="footer logo" />
            </div>
            <div className="footer-p">
              <p>20 Carrochan Rd, Balloch, Alexandria G83 8EG, UK <br />
                69QJ+2F Alexandria, United Kingdom</p>
            </div>
            <div className="calls">
              <p>PHONE - +91 123 456 789 0, +91 123 456 789 0</p>
              <p>EMAIL - info@gmail.com</p>
            </div>
          </div>

          {/* Column 2 */}
          <div className="footer-col">
            <h2>OPENING HOURS</h2>
            <div className="footer-p1">
              <p>Mon - Tues : <span>6.00 am - 10.00 pm</span></p>
              <p>Wednes - Thurs : <span>6.00 am - 10.00 pm</span></p>
              <p>Lunch : <span>Everyday</span></p>
              <p>Sunday : <span className="closed">Closed</span></p>
            </div>
          </div>

          {/* Column 3 */}
          <div className="footer-col">
            <h2>USEFUL LINKS</h2>
            <ul>
              <li>Privacy Policy</li>
              <li>Order Tracking</li>
              <li>Warranty and Services</li>
              <li>About</li>
              <li>Contact Us</li>
              <li>Wishlist</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© Pizzon all Rights Reserved. Designed by <span className="design">TemplatesCoder</span></p>
          <div className="social-icons">
            <FaFacebookF />
            <FaTwitter />
            <FaLinkedinIn />
            <FaInstagram />
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
