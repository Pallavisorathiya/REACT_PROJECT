
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getStudentAsync, updateStudentAsync } from "../Services/Actions/studentAction";
import "./AddStudent.css";
import { MdArrowRightAlt } from "react-icons/md";

const EditStudent = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { student, isUpdated } = useSelector((state) => state.studentReducer);

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

  const validate = () => {
    const newErrors = {};
    if (!inputForm.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!inputForm.dob.trim()) newErrors.dob = "Date of birth is required";
    if (!inputForm.age || Number(inputForm.age) <= 0)
      newErrors.age = "Valid age is required";
    if (!inputForm.gender.trim() || inputForm.gender === "Select Gender")
      newErrors.gender = "Please select gender";
    if (!inputForm.email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(inputForm.email))
      newErrors.email = "Enter valid email";
    if (!inputForm.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(inputForm.phone))
      newErrors.phone = "Enter 10-digit phone";
    if (!inputForm.course.trim()) newErrors.course = "Course/Class is required";
    if (!inputForm.rollNo.trim()) newErrors.rollNo = "Roll number is required";
    if (!inputForm.address.trim()) newErrors.address = "Address is required";
    if (!inputForm.image.trim()) newErrors.image = "Image URL is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChanged = (e) => {
    const { name, value } = e.target;
    setInputForm({ ...inputForm, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(updateStudentAsync(inputForm));
      
        navigate("/");
    }
  };

  useEffect(() => {
    if (isUpdated) {
      navigate("/"); 
    }
  }, [isUpdated, navigate]);

  useEffect(() => {
    if (student) {
      setInputForm({
        id: student.id || "",
        fullName: student.fullName || "",
        dob: student.dob || "",
        age: student.age || "",
        gender: student.gender || "",
        email: student.email || "",
        phone: student.phone || "",
        course: student.course || "",
        rollNo: student.rollNo || "",
        address: student.address || "",
        image: student.image || "",
      });
    }
  }, [student]);

  useEffect(() => {
    if (id) {
      dispatch(getStudentAsync(id));
    }
  }, [id, dispatch]);

  return (
    <Container>
      <div className="add-student-container">
        <h1 className="fs-2">Edit Student</h1>
        <Form onSubmit={handleSubmit}>
          {/* Full Name */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2" className="fs-5">Full Name</Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                name="fullName"
                value={inputForm.fullName}
                onChange={handleChanged}
                isInvalid={!!errors.fullName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.fullName}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          {/* DOB */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2" className="fs-5">Date of Birth</Form.Label>
            <Col sm="10">
              <Form.Control
                type="date"
                name="dob"
                value={inputForm.dob}
                onChange={handleChanged}
                isInvalid={!!errors.dob}
              />
              <Form.Control.Feedback type="invalid">
                {errors.dob}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          {/* Age */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2" className="fs-5">Age</Form.Label>
            <Col sm="10">
              <Form.Control
                type="number"
                name="age"
                value={inputForm.age}
                onChange={handleChanged}
                isInvalid={!!errors.age}
              />
              <Form.Control.Feedback type="invalid">
                {errors.age}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          {/* Gender */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2" className="fs-5">Gender</Form.Label>
            <Col sm="10">
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
              <Form.Control.Feedback type="invalid">
                {errors.gender}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          {/* Email */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2" className="fs-5">Email</Form.Label>
            <Col sm="10">
              <Form.Control
                type="email"
                name="email"
                value={inputForm.email}
                onChange={handleChanged}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          {/* Phone */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2" className="fs-5">Phone</Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                name="phone"
                value={inputForm.phone}
                onChange={handleChanged}
                isInvalid={!!errors.phone}
              />
              <Form.Control.Feedback type="invalid">
                {errors.phone}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          {/* Course */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2" className="fs-5">Course / Class</Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                name="course"
                value={inputForm.course}
                onChange={handleChanged}
                isInvalid={!!errors.course}
              />
              <Form.Control.Feedback type="invalid">
                {errors.course}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          {/* Roll No */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2" className="fs-5">Roll No</Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                name="rollNo"
                value={inputForm.rollNo}
                onChange={handleChanged}
                isInvalid={!!errors.rollNo}
              />
              <Form.Control.Feedback type="invalid">
                {errors.rollNo}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          {/* Address */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2" className="fs-5">Address</Form.Label>
            <Col sm="10">
              <Form.Control
                as="textarea"
                rows={3}
                name="address"
                value={inputForm.address}
                onChange={handleChanged}
                isInvalid={!!errors.address}
              />
              <Form.Control.Feedback type="invalid">
                {errors.address}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          {/* Image */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2" className="fs-5">Image URL</Form.Label>
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

          <Button variant="success"  className="fs-5" type="submit">Update Student <MdArrowRightAlt className="fs-2" /></Button>
        </Form>
      </div>
    </Container>
  );
};

export default EditStudent;
