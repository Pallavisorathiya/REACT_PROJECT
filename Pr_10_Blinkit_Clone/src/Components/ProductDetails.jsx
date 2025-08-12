import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button, Container, Row, Col, Card, Badge } from "react-bootstrap";
import { deleteProductAsync } from "../Services/Actions/productAction"; 
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { IoArrowBackOutline } from "react-icons/io5";

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
        <IoArrowBackOutline className="me-1" />Back
      </Button>

      <Row className="mt-4">
        <Col md={6}>
          <Card className="shadow-sm border-0">
            <Card.Img variant="top" src={product.image}
              style={{height: "350px",objectFit: "contain",backgroundColor: "#f8f9fa",
              }} />
              </Card>
        </Col>

        <Col md={6}>
          <h3 className="fw-bold">{product.title}</h3>
          <Badge bg="success" className="mb-2">{product.category}</Badge>
          <p className="text-secondary mb-1">{product.amount}</p>
          <h4 className="text-success fw-bold">₹{product.price}</h4>
          <p className="mt-3">{product.desc}</p>

          <div className="mt-4 d-flex gap-3">
            <Button variant="success"onClick={() => navigate(`/edit-product/${product.id}`)}>
              <FaRegEdit className="me-1" />Edit</Button>
            <Button variant="success" onClick={handleDelete}>
              <RiDeleteBin5Line className="me-1" />Delete
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;
