import { useEffect, useState } from "react";
import { getStorageData, setStorageData } from "../Services/StorageData";
import { Badge, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router";
import "./Header.css";

const Home = () => {
  const [productData, setProductData] = useState([]);
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/edit-product/${id}`);
  };

  const handleDelete = (id) => {
    let data = getStorageData();
    let updateData = data.filter((product) => product.id !== id);
    setStorageData(updateData);
    setProductData(updateData);
  };

  const getCategoryColor = (category) => {
    switch (category.toLowerCase()) {
      case "makeup":
        return "danger";
      case "skincare":
        return "success";
      case "hair":
        return "info";
      case "fragrance":
        return "primary";
      default:
        return "secondary";
    }
  };

  useEffect(() => {
    let data = getStorageData();
    setProductData(data);
  }, []);

  return (
    <>
      <h1 className="text-center my-4" style={{ color: "#c2185b" }}> All Products
      </h1>

      <div className="d-flex flex-wrap justify-content-center">
        {productData.map((product) => (
          <Card style={{ width: "18rem", margin: "15px" }} key={product.id}>
            <Card.Img variant="top" src={product.image} />
            <Card.Body>
              <Card.Title>{product.title} - {product.id}
              </Card.Title>
              <Card.Text>{product.desc}</Card.Text>
              <Card.Text><strong>Price:</strong> ₹{product.price}
              </Card.Text>
              <Badge bg={getCategoryColor(product.category)}>{product.category}</Badge>
              <br />
              <br />
              <div className="d-flex justify-content-center gap-3">
                <Button onClick={() => handleEdit(product.id)}variant="warning">Edit
                </Button>
                <Button onClick={() => handleDelete(product.id)}variant="danger"> Delete
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Home;
