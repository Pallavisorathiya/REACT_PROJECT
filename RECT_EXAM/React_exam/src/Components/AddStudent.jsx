// src/Pages/AddStudent.jsx
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
// import { useNavigate } from "react-router";
import { useNavigate } from "react-router-dom";
import { MdArrowRightAlt } from "react-icons/md";
import generateUniqueId from "generate-unique-id";
import { useDispatch, useSelector } from "react-redux";
import { addStudentAsync } from "../Services/Actions/studentAction"; // <-- update path if different
import "./AddStudent.css";

const AddStudent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Expect your studentReducer to expose these flags
  const { isCreated, isError } = useSelector((state) => state.studentReducer || {});

  const initialState = {
    id: "",
    fullName: "",
    dob: "",
    age: "",
    gender: "",
    email: "",
    phone: "",
    course: "",
    rollNo: "",
    address: "",
    image: "",
  };

  const [inputForm, setInputForm] = useState(initialState);
  const [errors, setErrors] = useState({});

  const calcAgeFromDob = (dobStr) => {
    if (!dobStr) return "";
    const today = new Date();
    const dob = new Date(dobStr);
    if (isNaN(dob.getTime())) return "";
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    return age < 0 ? "" : String(age);
  };

  const handleChanged = (e) => {
    const { name, value } = e.target;

    // Auto-calc age when dob changes (keeps manual edit possible)
    if (name === "dob") {
      const computedAge = calcAgeFromDob(value);
      setInputForm((prev) => ({
        ...prev,
        dob: value,
        age: computedAge || prev.age,
      }));
      return;
    }

    setInputForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    let err = {};

    if (!inputForm.fullName.trim()) err.fullName = "Please enter full name";

    if (!inputForm.dob) err.dob = "Please select date of birth";

    if (!inputForm.age || Number(inputForm.age) <= 0) {
      err.age = "Enter valid age";
    }

    if (!inputForm.gender || inputForm.gender === "Select Gender") {
      err.gender = "Please select gender";
    }

    if (!inputForm.email.trim()) {
      err.email = "Please enter email";
    } else if (!/^\S+@\S+\.\S+$/.test(inputForm.email)) {
      err.email = "Enter valid email";
    }

    if (!inputForm.phone.trim()) {
      err.phone = "Please enter phone number";
    } else if (!/^\d{10}$/.test(inputForm.phone)) {
      err.phone = "Enter 10-digit phone";
    }

    if (!inputForm.course.trim()) err.course = "Please enter course/class";
    if (!inputForm.rollNo.trim()) err.rollNo = "Please enter roll number";
    if (!inputForm.address.trim()) err.address = "Please enter address";


    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      const id = generateUniqueId({ length: 6, useLetters: false });
      const newStudent = { ...inputForm, id };

      dispatch(addStudentAsync(newStudent));
       navigate("/");
    }
  };

  useEffect(() => {
    if (isCreated) {
      setInputForm(initialState);
      navigate("/"); // change to "/students" if you have a listing route
    }
  }, [isCreated, navigate]);



  return (
    <Container className="add-student-container">
      <h1>Add New Student</h1>
      {isError && <p className="text-danger">{isError}</p>}

      <Form className="mt-4" onSubmit={handleSubmit}>
        {/* Full Name */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2" className="fs-5">Full Name</Form.Label>
          <Col sm="6">
            <Form.Control
              type="text"
              name="fullName"
              placeholder="Enter full name"
              value={inputForm.fullName}
              onChange={handleChanged}
              isInvalid={!!errors.fullName}
            />
            <Form.Control.Feedback type="invalid">{errors.fullName}</Form.Control.Feedback>
          </Col>
        </Form.Group>

        {/* DOB */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2" className="fs-5">Date of Birth</Form.Label>
          <Col sm="6">
            <Form.Control
              type="date"
              name="dob"
              value={inputForm.dob}
              onChange={handleChanged}
              isInvalid={!!errors.dob}
            />
            <Form.Control.Feedback type="invalid">{errors.dob}</Form.Control.Feedback>
          </Col>
        </Form.Group>

        {/* Age */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2" className="fs-5">Age</Form.Label>
          <Col sm="6">
            <Form.Control
              type="number"
              name="age"
              placeholder="Enter age"
              value={inputForm.age}
              onChange={handleChanged}
              isInvalid={!!errors.age}
            />
            <Form.Control.Feedback type="invalid">{errors.age}</Form.Control.Feedback>
          </Col>
        </Form.Group>

        {/* Gender */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2" className="fs-5">Gender</Form.Label>
          <Col sm="6">
            <Form.Select
              name="gender"
              value={inputForm.gender}
              onChange={handleChanged}
              isInvalid={!!errors.gender}
            >
              <option>Select Gender</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Other">Other</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">{errors.gender}</Form.Control.Feedback>
          </Col>
        </Form.Group>

        {/* Email */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2" className="fs-5">Email</Form.Label>
          <Col sm="6">
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              value={inputForm.email}
              onChange={handleChanged}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
          </Col>
        </Form.Group>

        {/* Phone */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2" className="fs-5">Phone</Form.Label>
          <Col sm="6">
            <Form.Control
              type="text"
              name="phone"
              placeholder="Enter 10-digit phone"
              value={inputForm.phone}
              onChange={handleChanged}
              isInvalid={!!errors.phone}
              inputMode="numeric"
              maxLength={10}
            />
            <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
          </Col>
        </Form.Group>

        {/* Course / Class */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2" className="fs-5">Course / Class</Form.Label>
          <Col sm="6">
            <Form.Control
              type="text"
              name="course"
              placeholder="e.g., BCA, BCom, 12th Sci"
              value={inputForm.course}
              onChange={handleChanged}
              isInvalid={!!errors.course}
            />
            <Form.Control.Feedback type="invalid">{errors.course}</Form.Control.Feedback>
          </Col>
        </Form.Group>

        {/* Roll No */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2" className="fs-5">Roll No</Form.Label>
          <Col sm="6">
            <Form.Control
              type="text"
              name="rollNo"
              placeholder="Enter roll number"
              value={inputForm.rollNo}
              onChange={handleChanged}
              isInvalid={!!errors.rollNo}
            />
            <Form.Control.Feedback type="invalid">{errors.rollNo}</Form.Control.Feedback>
          </Col>
        </Form.Group>

        {/* Address */}
        <Form.Group as={Row} className=" ad mb-3">
          <Form.Label column sm="2" className="fs-5">Address</Form.Label>
          <Col sm="6">
            <Form.Control
              type="text"
              rows={3}
              name="address"
              placeholder="Enter address"
              value={inputForm.address}
              onChange={handleChanged}
              isInvalid={!!errors.address}
            />
            <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
          </Col>
        </Form.Group>

        {/* Image */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2" className="fs-5">Image URL</Form.Label>
          <Col sm="6">
            <Form.Control
              type="text"
              name="image"
              placeholder="Enter image URL"
              value={inputForm.image}
              onChange={handleChanged}
              isInvalid={!!errors.image}
            />
            <Form.Control.Feedback type="invalid">{errors.image}</Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Button type="submit" className="fs-4">Add Student <MdArrowRightAlt className="fs-2" /></Button>
      </Form>
    </Container>
  );
};

export default AddStudent;
