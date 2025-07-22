import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Button, Col, Form, Row } from "react-bootstrap";
import { getStorageData, setStorageData } from "../Services/StorageData";
import "./Header.css"; 

const EditProduct = () => {
  const { id } = useParams();
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

  const handleChanged = (e) => {
    const { name, value } = e.target;
    setInputForm({
      ...inputForm,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = getStorageData();
    let updateData = data.map((prod) => (prod.id == id ? inputForm : prod));
    setStorageData(updateData);
    navigate("/");
  };

  useEffect(() => {
    let data = getStorageData();
    let singleRec = data.find((product) => product.id == id);
    setInputForm(singleRec);
  }, [id]);

  return (
    <div className="edit-product-wrapper">
      <div className="edit-product-container">
        <h2 className="text-center ">Edit Product</h2>
        <Form className="mt-4" onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text"name="title"value={inputForm.title}onChange={handleChanged}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text"name="desc" value={inputForm.desc}onChange={handleChanged}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control type="number"name="price"value={inputForm.price}onChange={handleChanged}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select name="category"value={inputForm.category}onChange={handleChanged}>
              <option>Select Category</option>
              <option value="Makeup">Makeup</option>
              <option value="Skin">Skin</option>
              <option value="Hair">Hair</option>
              <option value="Appliances">Appliances</option>
              <option value="Bath&Body">Bath & Body</option>
              <option value="Fragrance">Fragrance</option>
              <option value="Natural">Natural</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Image</Form.Label>
            <Form.Control type="text"name="image"value={inputForm.image}onChange={handleChanged}/>
          </Form.Group>

          <Button type="submit" variant="primary" className="w-100">
            Update Product
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default EditProduct;
