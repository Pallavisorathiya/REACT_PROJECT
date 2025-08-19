import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getProductAsync, updateProductAsync } from "../Services/Actions/productAction";
import { uploadImage } from "../Services/imageUpload";
import "./AddProduct.css";

const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product, isUpdated } = useSelector((state) => state.productReducer);

  const initialState = {
    id: "",
    title: "",
    amount: "",
    desc: "",
    price: "",
    category: "",
    image: "",
  };

  const [inputForm, setInputForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [loadingImage, setLoadingImage] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!inputForm.title.trim()) newErrors.title = "Title is required";
    if (!inputForm.amount.trim()) newErrors.amount = "Amount is required";
    if (!inputForm.desc.trim()) newErrors.desc = "Description is required";
    if (!inputForm.price || isNaN(inputForm.price) || Number(inputForm.price) <= 0)
      newErrors.price = "Valid price is required";
    if (!inputForm.category.trim() || inputForm.category === "Select Category")
      newErrors.category = "Please select a category";
    if (!inputForm.image.trim()) newErrors.image = "Image URL is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChanged = (e) => {
    const { name, value } = e.target;
    setInputForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChanged = async (e) => {
    if (!e.target.files[0]) return;

    setLoadingImage(true);
    try {
      const imagePath = await uploadImage(e.target.files[0]);
      setInputForm((prev) => ({ ...prev, image: imagePath }));
    } catch (err) {
      console.error("Image upload failed", err);
      setErrors((prev) => ({ ...prev, image: "Image upload failed" }));
    } finally {
      setLoadingImage(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(updateProductAsync(inputForm));
    }
  };

  useEffect(() => {
    if (isUpdated) {
      navigate("/");
    }
  }, [isUpdated, navigate]);

  useEffect(() => {
    if (product && Object.keys(product).length > 0) {
      setInputForm({
        id: product.id || "",
        title: product.title || "",
        amount: product.amount || "",
        desc: product.desc || "",
        price: product.price || "",
        category: product.category || "",
        image: product.image || "",
      });
    }
  }, [product]);

  useEffect(() => {
    if (id) {
      dispatch(getProductAsync(id));
    }
  }, [id, dispatch]);

  return (
    <Container>
      <div className="add-product-container">
        <h1>Edit Product</h1>
        <Form onSubmit={handleSubmit}>
       
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">Title</Form.Label>
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
            <Form.Label column sm="2">Amount</Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                name="amount"
                placeholder="Enter amount in (Kg, g, L, ml, units)"
                value={inputForm.amount}
                onChange={handleChanged}
                isInvalid={!!errors.amount}
              />
              <Form.Control.Feedback type="invalid">
                {errors.amount}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">Description</Form.Label>
            <Col sm="10">
              <Form.Control
                as="textarea"
                rows={3}
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
            <Form.Label column sm="2">Price</Form.Label>
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
            <Form.Label column sm="2">Category</Form.Label>
            <Col sm="10">
              <Form.Select
                name="category"
                value={inputForm.category}
                onChange={handleChanged}
                isInvalid={!!errors.category}
              >
                <option>Select Category</option>
                <option value="Dairy & Bread">Dairy & Bread</option>
                <option value="Fruits & Vegetables">Fruits & Vegetables</option>
                <option value="Grocery">Grocery</option>
                <option value="Snacks & Branded Foods">Snacks & Branded Foods</option>
                <option value="Beverages">Beverages</option>
                <option value="Medicines & Wellness">Medicines & Wellness</option>
                <option value="Personal Care">Personal Care</option>
                <option value="Household Needs">Household Needs</option>
                <option value="Home & Kitchen">Home & Kitchen</option>
              </Form.Select>
              {errors.category && (
                <Form.Control.Feedback type="invalid">
                  {errors.category}
                </Form.Control.Feedback>
              )}
            </Col>
          </Form.Group>


<Form.Group as={Row} className="mb-3 align-items-center">
  <Form.Label column sm="2">Image </Form.Label>

  <Col sm="10">
    <div className="d-flex align-items-center me-5">
    
      <Form.Control
        type="file"
        name="image"
        onChange={handleFileChanged}
        isInvalid={!!errors.image}
        style={{ maxWidth: "250px" }}
      />

      {inputForm.image && (
        <img
          src={inputForm.image}
          alt="preview"
          style={{
            width: "60px",
            height: "60px",
            objectFit: "cover",
            borderRadius: "6px",
            marginLeft: "15px",
            border: "1px solid #ccc",
          }}
        />
      )}
    </div>

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
