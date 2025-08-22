import { Container, Row, Col, Navbar, Button, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"; 
import { IoMdArrowDropdown } from "react-icons/io";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { logOutAsync } from "../Services/Actions/userAction";
import logo from "../assets/logo.svg";
import "./Header.css";

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userReducer);

  const handleLogOut = () => {
    dispatch(logOutAsync());
  };

  const getInitial = (email) => email ? email.charAt(0).toUpperCase() : "";

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
                <strong>Delivery in 11 minutes</strong>
              </h5>
              <div className="text-address">
                Surat, Gujarat, India <IoMdArrowDropdown className="fs-4 mb-1" />
              </div>
            </div>
          </Col>

          <Col md="6" className="d-flex justify-content-end align-items-center gap-3 me-5">
            {user ? (
              <Dropdown align="end">
                <Dropdown.Toggle
                  variant="light"
                  id="user-dropdown"
                  className="d-flex align-items-center gap-2 border-0 bg-transparent">
             
                  <div className="user-avatar">
                    {getInitial(user.email)}
                  </div>
                  <span className="fw-bold">{user.email}</span>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/profile">My Profile</Dropdown.Item>
                 
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogOut}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Link className="btn ms-5 gap-5 me-2 fs-5 fw-bold" to={"/signIn"}>
                <HiOutlineUserCircle className="fs-5 fw-bold" /> Login
              </Link>
            )}
          </Col>

          <Col md="1" className="d-flex justify-content-end align-items-center gap-4 me-5">
            <Link to={"/add-product"} className="button-header d-flex justify-content-end">
              Add Product
            </Link>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
