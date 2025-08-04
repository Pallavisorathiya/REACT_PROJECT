import { useDispatch } from "react-redux";
import { searchProduct } from "../Services/Actions/productAction";
import { Container, Row, Col, Form, InputGroup } from "react-bootstrap";
import logo from "../assets/logo.svg";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    const query = e.target.value;
    dispatch(searchProduct(query));
  };

  return (
    <header className="border-bottom position-relative" style={{ height: "87px" }}>
      <Container fluid>
        <Row className="align-items-center">
          <Col md="4" className="d-flex align-items-center gap-3">
            <div><img src={logo} alt="logo" /></div>
            <div className="vertical-line" style={{ width: "1px", backgroundColor: "rgb(242, 242, 242)", height: "87px" }}></div>
            <div>
              <strong>Delivery in 11 minutes</strong>
              <div className="text-muted" style={{ fontSize: "0.9rem" }}>
                Surat, Gujarat, India ▼
              </div>
            </div>
          </Col>

          <Col md="5">
            <InputGroup>
              <InputGroup.Text><FaSearch /></InputGroup.Text>
              <Form.Control
                type="text"
                placeholder='Search Product'
                onChange={handleSearch}
              />
            </InputGroup>
          </Col>

          <Col md="3" className="text-end">
            <Link className="button-header" to={"/add-product"}>Add Product</Link>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
