import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button, Container, Row, Col, Card, Badge } from "react-bootstrap";
import { deleteProductAsync } from "../Services/Actions/productAction";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { IoArrowBackOutline } from "react-icons/io5";
import fastDeliveryImg from "../assets/view_1.avif";
import bestpriceImg from "../assets/view_2.avif";
import wideImg from "../assets/view_3.avif";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.productReducer);

  const product = products.find((p) => String(p.id) === String(id));

  if (!product) {
    return <div className="text-center mt-5">Product not found.</div>;
  }

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProductAsync(product.id));
      navigate("/");
    }
  };

  return (
    <Container className="py-4">
      <Button variant="outline-success" onClick={() => navigate(-1)}>
        <IoArrowBackOutline className="me-1" /> Back
      </Button>

      <Row className="mt-4">
        <Col md={6}>
          <Card className="shadow-sm border-0">
            <Card.Img
              variant="top"
              src={product.image}
              style={{
                height: "350px",
                objectFit: "contain",
                backgroundColor: "#f8f9fa",
              }}
            />
          </Card>
        </Col>

        <Col md={6}>
          <h3 className="fw-bold">{product.title}</h3>
          <Badge bg="success" className="mb-2">
            {product.category}
          </Badge>
          <p className="text-secondary mb-1">{product.amount}</p>
          <h4 className="text-success fw-bold">₹{product.price}</h4>
          <p className="mt-3">{product.desc}</p>

          <div className="mt-4 d-flex gap-3">
            <Button variant="success" onClick={() => navigate(`/edit-product/${product.id}`)}>
              <FaRegEdit className="me-1" /> Edit </Button>
            <Button variant="success" onClick={handleDelete}>
              <RiDeleteBin5Line className="me-1" /> Delete
            </Button>
          </div>
        </Col>
      </Row>

      <div className="mt-5">
        <h5 className="fw-bold">Why shop from blinkit?</h5>
        <Row className="mt-3">
          <Col md={4} className="mb-3">
            <div className="p-3 border rounded shadow-sm h-100">
              <div className="d-flex align-items-center mb-2">
                <img src={fastDeliveryImg} alt="Superfast Delivery"  style={{ width: "48px", height: "48px" }} />
                <h6 className="fw-bold ms-2 mb-0">Superfast Delivery</h6>
              </div>
              <p className="mb-0 text-secondary"> Get your order delivered to your doorstep at the earliest from dark stores near you.  </p>
            </div>
          </Col>

          <Col md={4} className="mb-3">
            <div className="p-3 border rounded shadow-sm h-100">
              <div className="d-flex align-items-center mb-2">
                <img src={bestpriceImg} alt="Best Prices & Offers" style={{ width: "48px", height: "48px" }} />
                <div className="ms-2">
                  <h6 className="fw-bold mb-0">Superfast Delivery</h6>
                  <h6 className="fw-bold mb-0">Best Prices & Offers</h6>
                </div>
              </div>
              <p className="mb-0 text-secondary">
                Best price destination with offers directly from the manufacturers.
              </p>
            </div>
          </Col>

          <Col md={4} className="mb-3">
            <div className="p-3 border rounded shadow-sm h-100">
              <div className="d-flex align-items-center mb-2">
                <img src={wideImg} alt="Wide Assortment"  style={{ width: "48px", height: "48px" }}  />
                <h6 className="fw-bold ms-2 mb-0">Wide Assortment</h6>
              </div>
              <p className="mb-0 text-secondary">
                Choose from 5000+ products across food, personal care, household &
                more categories.
              </p>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default ProductDetails;
