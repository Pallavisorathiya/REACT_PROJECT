import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavDropdown } from 'react-bootstrap';
import logo from '../assets/header-logo.png';
import { IoCallOutline } from "react-icons/io5";
import { HiOutlineShoppingBag } from "react-icons/hi";
import './Header.css';
import { useEffect, useState } from 'react';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Navbar expand="lg" fixed="top" className={`custom-navbar ${scrolled ? 'scrolled' : ''}`}>
      <Container fluid className="px-4" style={{ maxWidth: '1200px' }}>
        {/* Logo */}
        <Navbar.Brand href="javascript:void(0)" className="logo-wrapper me-auto me-lg-0">
          <img src={logo} alt="header-logo" className="img-fluid logo-img" />
        </Navbar.Brand>

        {/* Mobile: Button + Toggle beside each other */}
        <div className="d-lg-none d-flex align-items-center gap-2 ms-auto">
          <button className="order-button mobile-header-btn">ORDER ONLINE</button>
          <Navbar.Toggle aria-controls="main-navbar" className="bg-white" />
        </div>

        <Navbar.Collapse id="main-navbar" className="justify-content-between align-items-center">
          {/* Nav Links */}
          <Nav className="index-header mx-auto text-center text-lg-start">
            <Nav.Link href="javascript:void(0)" className="nav-link">HOME</Nav.Link>

            <NavDropdown title="MENU" id="menu-dropdown" className="nav-link-custom dropdown-custom">
              <NavDropdown.Item href="javascript:void(0)">Menu list</NavDropdown.Item>
              <NavDropdown.Item href="javascript:void(0)">Menu grid</NavDropdown.Item>
              <NavDropdown.Item href="javascript:void(0)">Special Pizza</NavDropdown.Item>
              <NavDropdown.Item href="javascript:void(0)">All pizza</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="BLOG" id="blog-dropdown" className="nav-link-custom dropdown-custom">
              <NavDropdown.Item href="javascript:void(0)">Blog Leftside</NavDropdown.Item>
              <NavDropdown.Item href="javascript:void(0)">Blog Rightside</NavDropdown.Item>
              <NavDropdown.Item href="javascript:void(0)">Blog Detail</NavDropdown.Item>
            </NavDropdown>

            <Nav.Link href="javascript:void(0)" className="nav-link">RESERVATION</Nav.Link>

            <NavDropdown title="PAGES" id="pages-dropdown" className="nav-link-custom dropdown-custom">
              <NavDropdown.Item href="javascript:void(0)">About Us</NavDropdown.Item>
              <NavDropdown.Item href="javascript:void(0)">Contact</NavDropdown.Item>
              <NavDropdown.Item href="javascript:void(0)">Shop Grid</NavDropdown.Item>
              <NavDropdown.Item href="javascript:void(0)">404</NavDropdown.Item>
            </NavDropdown>
          </Nav>

          {/* Desktop Right Side */}
          <div className="d-none d-lg-flex flex-column flex-sm-row align-items-center gap-3 mt-3 mt-lg-0 text-center text-sm-start">
            <div className="d-flex align-items-center text-white phone-icon-hover">
              <IoCallOutline className="me-2 header-icon" />
              +91 123 456 789
            </div>
            <div className="d-flex align-items-center text-white">
              <HiOutlineShoppingBag className="me-2 header-icon" />
              0 items - <span className="ms-1">$0.00</span>
            </div>
            <button className="order-button">ORDER ONLINE</button>
          </div>

          {/* Mobile toggle content */}
          <div className="d-flex d-lg-none flex-column gap-3 mt-4 text-center">
            <div className="d-flex justify-content-center align-items-center text-white">
              <IoCallOutline className="me-2 header-icon text-white" />
              +91 123 456 789
            </div>
            <div className="d-flex justify-content-center align-items-center text-white">
              <HiOutlineShoppingBag className="me-2 header-icon text-white" />
              0 items - <span className="ms-1">$0.00</span>
            </div>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
