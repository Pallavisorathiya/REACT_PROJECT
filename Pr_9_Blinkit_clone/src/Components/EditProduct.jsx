import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getProduct, updateProduct } from "../Services/Actions/productAction";
import "./AddProduct.css";

const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product } = useSelector((state) => state.productReducer);

  const initialState = {
    id: "",
    title: "",
    desc: "",
    price: "",
    category: "",
    image: "",
  };

  const [inputForm, setInputForm] = useState(initialState);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!inputForm.title.trim()) newErrors.title = "Title is required";
    if (!inputForm.desc.trim()) newErrors.desc = "Description is required";
    if (!inputForm.price || isNaN(inputForm.price))
      newErrors.price = "Valid price is required";
    if (!inputForm.category.trim() || inputForm.category === "Select Category")
      newErrors.category = "Please select a category";
    if (!inputForm.image.trim()) newErrors.image = "Image URL is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChanged = (e) => {
    const { name, value } = e.target;
    setInputForm({
      ...inputForm,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(updateProduct(inputForm));
      navigate("/");
    }
  };

  useEffect(() => {
    if (product) {
      setInputForm(product);
    }
  }, [product]);

  useEffect(() => {
    if (id) {
      dispatch(getProduct(id));
    }
  }, [id]);

  return (
    <Container>
      <div className="add-product-container">
        <h1>Edit Product</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2" className="form-label">Title</Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                name="title"
                value={inputForm.title}
                onChange={handleChanged}
                isInvalid={!!errors.title}
              />
              <Form.Control.Feedback type="invalid">
                {errors.title}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2" className="form-label">
              Description
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                name="desc"
                value={inputForm.desc}
                onChange={handleChanged}
                isInvalid={!!errors.desc}
              />
              <Form.Control.Feedback type="invalid">
                {errors.desc}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2" className="form-label">
              Price
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="number"
                name="price"
                value={inputForm.price}
                onChange={handleChanged}
                isInvalid={!!errors.price}
              />
              <Form.Control.Feedback type="invalid">
                {errors.price}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2" className="form-label">
              Category
            </Form.Label>
            <Col sm="10">
              <Form.Select
                name="category"
                value={inputForm.category}
                onChange={handleChanged}
                isInvalid={!!errors.category}
              >
                <option>Select Category</option>
              <option value="Fruits & Vegetables">Fruits & Vegetables</option>
              <option value="Grocery">Grocery</option>
              <option value="Snacks & Branded Foods">Snacks & Branded Foods</option>
              <option value="Beverages">Beverages</option>
              <option value="Medicines & Wellness">Medicines & Wellness</option>
              <option value="Personal Care">Personal Care</option>
              <option value="Household Needs">Household Needs</option>
              <option value="Home & Kitchen">Home & Kitchen</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">{errors.category}</Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2" className="form-label">
              Image
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                name="image"
                value={inputForm.image}
                onChange={handleChanged}
                isInvalid={!!errors.image}
              />
              <Form.Control.Feedback type="invalid">
                {errors.image}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Button variant="success" type="submit">
            Update Product
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default EditProduct;
