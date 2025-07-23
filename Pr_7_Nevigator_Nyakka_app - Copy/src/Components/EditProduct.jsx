import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Button, Form } from "react-bootstrap";
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
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const data = getStorageData();
    const singleRec = data.find((product) => product.id == id);
    if (singleRec) setInputForm(singleRec);
  }, [id]);

  const handleChanged = (e) => {
    const { name, value } = e.target;
    setInputForm({ ...inputForm, [name]: value });
    setErrors({ ...errors, [name]: "" }); 
  };

  const validate = () => {
    let newErrors = {};
    if (!inputForm.title.trim()) newErrors.title = "Title is required";
    if (!inputForm.desc.trim()) newErrors.desc = "Description is required";
    if (!inputForm.price.trim()) newErrors.price = "Price is required";
    if (!inputForm.category || inputForm.category === "Select Category")
      newErrors.category = "Category is required";
    if (!inputForm.image.trim()) newErrors.image = "Image URL is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const data = getStorageData();
    const updatedData = data.map((prod) =>
      prod.id === id ? inputForm : prod
    );
    setStorageData(updatedData);
    navigate("/");
  };

  return (
    <div className="edit-product-wrapper">
      <div className="edit-product-container">
        <h2 className="text-center">Edit Product</h2>
        <Form className="mt-4" onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control   type="text" name="title"value={inputForm.title}  onChange={handleChanged} isInvalid={!!errors.title}/>
            <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text"name="desc"value={inputForm.desc}onChange={handleChanged}isInvalid={!!errors.desc} />
            <Form.Control.Feedback type="invalid">{errors.desc}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control type="number"name="price"value={inputForm.price}onChange={handleChanged}isInvalid={!!errors.price}/>
            <Form.Control.Feedback type="invalid"> {errors.price}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select name="category"value={inputForm.category}onChange={handleChanged}isInvalid={!!errors.category} >
              <option>Select Category</option>
              <option value="Makeup">Makeup</option>
              <option value="Skin">Skin</option>
              <option value="Hair">Hair</option>
              <option value="Appliances">Appliances</option>
              <option value="Bath&Body">Bath & Body</option>
              <option value="Fragrance">Fragrance</option>
              <option value="Natural">Natural</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">{errors.category}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Image</Form.Label>
            <Form.Control type="text"name="image"value={inputForm.image}onChange={handleChanged}isInvalid={!!errors.image}/>
            <Form.Control.Feedback type="invalid">{errors.image}</Form.Control.Feedback>
          </Form.Group>

          <Button type="submit" variant="primary" className="w-100">Update Product</Button>
        </Form>
      </div>
    </div>
  );
};

export default EditProduct;
