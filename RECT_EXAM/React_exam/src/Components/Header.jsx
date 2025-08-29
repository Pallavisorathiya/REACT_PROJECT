
import { useEffect, useState } from "react";
import { Container, Row, Col, Navbar, Dropdown, Badge } from "react-bootstrap";
import logo from "../assets/cropped-logo2.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOutAsync } from "../Services/Actions/userAction";
import "./Header.css";
import { FaPerson } from "react-icons/fa6";
import { PiSignInBold } from "react-icons/pi";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { user } =
    useSelector(
      (state) =>
        state?.userReducer ??
        state?.authReducer ??
        state?.auth ??
        {}
    ) || {};

  const [studentCount, setStudentCount] = useState(0);

  useEffect(() => {
    let abort = new AbortController();

    const load = async () => {
      try {
        if (!user?.id) {
          setStudentCount(0);
          return;
        }

        // Try userId first
        let res = await fetch(
          `http://localhost:3000/students?userId=${encodeURIComponent(user.id)}`,
          { signal: abort.signal }
        );
        let data = await res.json();

    
        if (!Array.isArray(data) || data.length === 0) {
          const res2 = await fetch(
            `http://localhost:3000/students?createdBy=${encodeURIComponent(user.id)}`,
            { signal: abort.signal }
          );
          data = await res2.json();
        }

        setStudentCount(Array.isArray(data) ? data.length : 0);
      } catch {
        if (!abort.signal.aborted) setStudentCount(0);
      }
    };

    load();
    return () => {
      abort.abort();
    };
  }, [user?.id]);

  const handleLogout = () => {
    dispatch(logOutAsync());
   
    navigate("/", { replace: true, state: { from: location } });
  };

  const getInitial = (email) => (email ? email.charAt(0).toUpperCase() : "");

  return (
    <header className="app-header">
      <Container fluid className="px-3">
        <Row className="align-items-center">
          <Col xs="6" md="4" className="d-flex align-items-center">
            <Navbar.Brand
              as={Link}
              to={user ? "/" : "/sign-in"}
              className="d-inline-flex align-items-center"
            >
              <img src={logo} alt="Sweedu" className="header-logo" />
            </Navbar.Brand>
          </Col>

          <Col
            xs="6"
            md="8"
            className="d-flex justify-content-end align-items-center gap-3"
          >
        
            <Link
              to="/students"
              className="button-header position-relative d-flex align-items-center"
              aria-label="Students"
            >
              <FaPerson style={{ marginRight: 8 }} />
              Students
              {user && studentCount > 0 && (
                <Badge
                  pill
                  bg="warning"
                  text="dark"
                  style={{
                    fontSize: "0.7rem",
                    marginLeft: 8,
                    backgroundColor: "#b0892b",
                  }}
                >
                  {studentCount}
                </Badge>
              )}
            </Link>

        
            {user ? (
              <Link to="/students/add" className="button-header">
                + Add Student
              </Link>
            ) : null}

        
            {!user ? (
              <Link to="/sign-in" className="button-header" aria-label="Sign In">
                Sign In <PiSignInBold style={{ marginLeft: 6 }} />
              </Link>
            ) : (
              <Dropdown align="end">
                <Dropdown.Toggle className="account-btn d-flex align-items-center gap-2">
                  <div className="user-avatar">{getInitial(user.email)}</div>
                  <span className="fw-semibold">{user.email}</span>
                </Dropdown.Toggle>
                <Dropdown.Menu className="account-menu">
                  <Dropdown.Item as={Link} to="/profile">
                    My Profile
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
