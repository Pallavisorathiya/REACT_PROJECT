import generateUniqueId from "generate-unique-id";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Form } from "react-bootstrap";
import { getStorageData, setStorageData } from "../Services/StorageData";
import "./Header.css"; 

const AddProduct = () => {
  const navigate = useNavigate();

  const intialState = {
    title: "",
    desc: "",
    price: "",
    category: "",
    image: "",
    
  };

  const [inputForm, setInputForm] = useState(intialState);
  const [errorList, setErrorList] = useState({});

  const handleChanged = (e) => {
    const { name, value } = e.target;
    setInputForm({
      ...inputForm,
      [name]: value,
    });
  };

  const formValidation = () => {
    let formError = {};

    if (inputForm.title.trim() === "") {
      formError.titleErr = "Title cannot be empty";
    }

    if (inputForm.desc.trim() === "") {
      formError.descErr = "Description cannot be empty";
    }

    if (inputForm.price === "") {
      formError.priceErr = "Price is required";
    } else if (isNaN(inputForm.price) || Number(inputForm.price) <= 0) {
      formError.priceErr = "Enter a valid positive price";
    }

    if (
      inputForm.category === "" ||
      inputForm.category === "Select Category"
    ) {
      formError.categoryErr = "Please select a category";
    }

    if (inputForm.image.trim() === "") {
      formError.imageErr = "Image URL is required";
    } else if (!inputForm.image.startsWith("http")) {
      formError.imageErr = "Enter a valid image URL";
    }

    setErrorList(formError);
    return Object.keys(formError).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formValidation()) {
      let id = generateUniqueId({
        length: 6,
        useLetters: false,
      });
      inputForm.id = id;

      let data = getStorageData();
      data.push(inputForm);
      setStorageData(data);
      navigate("/");
    }
  };

  return (
    <div className="add-product-wrapper">
      <div className="add-product-container">
        <h2>Add Product</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text"placeholder="Enter Title"name="title"value={inputForm.title}onChange={handleChanged}/>
            {errorList.titleErr && (<div className="text-danger">{errorList.titleErr}</div>)}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text"placeholder="Enter Description"name="desc"value={inputForm.desc}onChange={handleChanged}/>
            {errorList.descErr && (<div className="text-danger">{errorList.descErr}</div>)}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control type="number"placeholder="Enter Price"name="price"value={inputForm.price} onChange={handleChanged}/>
            {errorList.priceErr && (<div className="text-danger">{errorList.priceErr}</div>)}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select
              name="category"
              value={inputForm.category}
              onChange={handleChanged}>
              <option>Select Category</option>
              <option value="Makeup">Makeup</option>
              <option value="Skin">Skin</option>
              <option value="Hair">Hair</option>
              <option value="Appliances">Appliances</option>
              <option value="Bath&Body">Bath & Body</option>
              <option value="Fragrance">Fragrance</option>
              <option value="Natural">Natural</option>
            </Form.Select> {errorList.categoryErr && (<div className="text-danger">{errorList.categoryErr}</div>)}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control type="text"placeholder="Enter Image URL"name="image"value={inputForm.image}onChange={handleChanged}  />
            {errorList.imageErr && (<div className="text-danger">{errorList.imageErr}</div> )}
          </Form.Group>
    <Button type="submit" className="add-btn" >Add Product</Button>
        </Form>
      </div>
    </div>
  );
};

export default AddProduct;
