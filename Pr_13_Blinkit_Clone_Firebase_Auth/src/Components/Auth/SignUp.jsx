import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { registerAsync } from "../../Services/Actions/userAction";
import "./SignIn.css"; // same CSS as SignIn for consistency

import blinkitLogo from "../../assets/app_logo.svg"; // add your logo image

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, isCreated } = useSelector((state) => state.userReducer);

  const initialState = {
    fullName: "",
    email: "",
    password: "",
    cpass: "",
  };

  const [inputForm, setInputForm] = useState(initialState);
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
    if (!inputForm.fullName.trim()) err.fullName = "Please enter full name";
    if (!inputForm.email.trim()) err.email = "Please enter email";
    if (!inputForm.password.trim()) err.password = "Please enter password";
    if (inputForm.password !== inputForm.cpass)
      err.cpass = "Passwords do not match";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(registerAsync(inputForm));
    }
  };

  useEffect(() => {
    if (isCreated) {
      navigate("/signIn");
    }
  }, [isCreated, navigate]);

  return (
    <Container className="signin-container">
      <div className="signin-card">
        <img src={blinkitLogo} alt="blinkit-logo" className="signin-logo" />
        <h3 className="signin-title">Create your account</h3>
        <p className="signin-subtitle">Sign up to get started</p>

        {error && <p className="text-danger">{error}</p>}

        <Form className="signin-form" onSubmit={handleSubmit}>
          {/* Full Name */}
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              name="fullName"
              placeholder="Enter Full Name"
              value={inputForm.fullName}
              onChange={handleChanged}
              isInvalid={!!errors.fullName}
            />
            <Form.Control.Feedback type="invalid">
              {errors.fullName}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Email */}
          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter Email"
              value={inputForm.email}
              onChange={handleChanged}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Password */}
          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter Password"
              value={inputForm.password}
              onChange={handleChanged}
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Confirm Password */}
          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              name="cpass"
              placeholder="Confirm Password"
              value={inputForm.cpass}
              onChange={handleChanged}
              isInvalid={!!errors.cpass}
            />
            <Form.Control.Feedback type="invalid">
              {errors.cpass}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Sign Up Button */}
          <Button
            type="submit"
            className="signin-btn"
            // disabled={
            //   !inputForm.fullName ||
            //   !inputForm.email ||
            //   !inputForm.password ||
            //   !inputForm.cpass
            // }
          >
            Sign Up
          </Button>
        </Form>

        <p className="signin-footer">
          Already have an account? <Link to="/signIn">Sign In</Link>
        </p>
      </div>
    </Container>
  );
};

export default SignUp;
