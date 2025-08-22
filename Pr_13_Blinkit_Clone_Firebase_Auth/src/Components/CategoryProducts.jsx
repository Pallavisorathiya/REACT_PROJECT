import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Card, Button, Form } from "react-bootstrap";

const CategoryProducts = () => {
  const { categoryName } = useParams();
  const { products } = useSelector((state) => state.productReducer);
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");


  let filteredProducts = products.filter(
    (prod) => prod.category.toLowerCase() === categoryName.toLowerCase()
  );

  if (searchTerm.trim() !== "") {
    filteredProducts = filteredProducts.filter((prod) =>
      prod.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (sortOrder === "lowToHigh") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "highToLow") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="container mt-4">
    
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>{categoryName} Products</h3>
        <Button variant="outline-success" onClick={() => navigate("/")}> ← Back </Button>
      </div>

      <div className="d-flex gap-3 mb-4">
        <Form.Control
          type="text"  placeholder="Search products..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ maxWidth: "250px" }} />
        <Form.Select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)} style={{ maxWidth: "200px" }} >
          <option value="">Sort By</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </Form.Select>
      </div>

      <div className="row g-3">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((prod) => (
            <div className="col-6 col-sm-4 col-md-3" key={prod.id}>
              <Card className="product-card h-100">
                <div style={{ height: "180px", overflow: "hidden" }}>
                  <Card.Img variant="top" src={prod.image} alt="img" style={{ height: "100%", objectFit: "cover" }}  />
                </div>
                <Card.Body className="d-flex flex-column justify-content-between">
                  <Card.Title style={{ fontSize: "16px", minHeight: "48px" }}>
                    {prod.title}
                  </Card.Title>
                  <br/>
                  <div className="fw-bold mt-2">₹{prod.price}</div><br/>
                  <Button variant="outline-success" size="sm"  onClick={() => navigate(`/product/${prod.id}`)} >View </Button>
                </Card.Body>
              </Card>
            </div>
          ))
        ) : (
          <p>No products found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryProducts;
