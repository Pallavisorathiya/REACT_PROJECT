import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router";
import generateUniqueId from "generate-unique-id";
import { useDispatch } from "react-redux";
import { addProduct } from "../Services/Actions/productAction";
import "./AddProduct.css";


const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const intialState = {
    id: "",
    title: "",
    desc: "",
    price: "",
    category: "",
    image: "",
  };

  const [inputForm, setInputForm] = useState(intialState);
  const [errors, setErrors] = useState({});

  const handleChanged = (e) => {
    const { name, value } = e.target;
    setInputForm({
      ...inputForm,
      [name]: value,
    });
  };


  const validate = () => {
    let err = {};
    if (!inputForm.title.trim()) err.title = "Please enter title";
    if (!inputForm.desc.trim()) err.desc = "Please enter description";
    if (!inputForm.price || inputForm.price <= 0) err.price = "Enter valid price";
    if (!inputForm.category || inputForm.category === "Select Category") err.category = "Please select category";
    if (!inputForm.image.trim()) err.image = "Please enter image URL";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      const id = generateUniqueId({ length: 6, useLetters: false });
      const newProduct = { ...inputForm, id };

      dispatch(addProduct(newProduct));
      navigate("/");
    }
  };

  return (
    <Container className="add-product-container">
      <h1>Add New Product</h1>
      <Form className="mt-4" onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">Title</Form.Label>
          <Col sm="6">
            <Form.Control
              type="text"
              name="title"
              placeholder="Enter Title"
              value={inputForm.title}
              onChange={handleChanged}
              isInvalid={!!errors.title}
            />
            <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">Description</Form.Label>
          <Col sm="6">
            <Form.Control
              type="text"
              name="desc"
              placeholder="Enter Description"
              value={inputForm.desc}
              onChange={handleChanged}
              isInvalid={!!errors.desc}
            />
            <Form.Control.Feedback type="invalid">{errors.desc}</Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">Price</Form.Label>
          <Col sm="6">
            <Form.Control
              type="number"
              name="price"
              placeholder="Enter Price"
              value={inputForm.price}
              onChange={handleChanged}
              isInvalid={!!errors.price}
            />
            <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">Category</Form.Label>
          <Col sm="6">
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
          <Form.Label column sm="2">Image</Form.Label>
          <Col sm="6">
            <Form.Control
              type="text"
              name="image"
              placeholder="Enter Image URL"
              value={inputForm.image}
              onChange={handleChanged}isInvalid={!!errors.image}/>
            <Form.Control.Feedback type="invalid">{errors.image}</Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Button type="submit">Add Product</Button>
      </Form>
    </Container>
  );
};

export default AddProduct;
