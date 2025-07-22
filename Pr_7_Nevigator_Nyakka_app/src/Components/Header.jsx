import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom"; 
import logo from "../assets/logo.svg"; 
import "./Header.css"; 
const Header = () => {
  return (
    <div className="custom-header-wrapper">
      <Navbar className="custom-navbar">
        <div className="custom-navbar-container">
        
          <div className="logo-container">
            <Link to="/">
              <img src={logo} alt="Nykaa Logo" className="logo-img" />
            </Link>
          </div>

          <div className="menu-container">
            <Link to="/add-product" className="add-product-link">
              Add Product
            </Link>
          </div>
        </div>
      </Navbar>
    </div>
  );
};

export default Header;
