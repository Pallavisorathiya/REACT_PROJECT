import { Container, Row, Col, Navbar } from "react-bootstrap";
import logo from "../assets/logo.svg";
import { IoMdArrowDropdown } from "react-icons/io";
import { Link } from "react-router-dom"; 
import "./Header.css";

const Header = () => {
  return (
    <header className="position-sticky top-0 bg-white z-2 border-bottom position-relative">
      <Container fluid>
        <Row className="align-items-center">
          <Col md="4" className="d-flex align-items-center gap-3">
            <Navbar.Brand href="/">
              <img src={logo} alt="logo" className="my-2 me-2 ms-3" />
            </Navbar.Brand>
            <div className="vertical-line"></div>
            <div className="delivery-time mx-auto pt-3 pb-2">
              <h5 className="mb-0">
                <strong> Delivery in 11 minutes </strong>
              </h5>
              <div className="text-address ">
                Surat, Gujarat, India <IoMdArrowDropdown className="fs-4 mb-1" />
              </div>
            </div>
          </Col>

         

          <Col md="7" className="text-end d-flex justify-content-end me-5">
            <Navbar.Text>
              <Link to={"/add-product"} className="button-header  d-flex justify-content-end ">
                Add Product
              </Link>
            </Navbar.Text>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
