import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"; // 🔥 correct import
import { FaGoogle } from "react-icons/fa";
import { signInAsync, signInWithGoogleAsync } from "../../Services/Actions/userAction";
import "./SignIn.css";
import blinkitLogo from "../../assets/app_logo.svg";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, error } = useSelector((state) => state.userReducer);

  const initialState = {
    email: "",
    password: "",
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
    if (!inputForm.email.trim()) err.email = "Please enter email";
    if (!inputForm.password.trim()) err.password = "Please enter password";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(signInAsync(inputForm));
    }
  };

  const handleGoogleLogin = () => {
    dispatch(signInWithGoogleAsync());
  };

  // 🔥 Redirect when user is logged in
  useEffect(() => {
    if (user) {
      navigate("/"); // change to "/dashboard" or other page if needed
    }
  }, [user, navigate]);

  return (
    <Container className="signin-container">
      <div className="signin-card">
        <img src={blinkitLogo} alt="blinkit-logo" className="signin-logo" />
        <h3 className="signin-title">India's Last Minute App</h3>
        <p className="signin-subtitle">Log in or Sign up</p>

        {error && <p className="text-danger">{error}</p>}

        <Form className="signin-form" onSubmit={handleSubmit}>
          {/* Email */}
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              name="email"
              placeholder="Enter Email"
              value={inputForm.email}
              onChange={handleChanged}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
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
            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
          </Form.Group>

          {/* Sign In Button */}
          <Button
            type="submit"
            className="signin-btn"
            // disabled={!inputForm.email || !inputForm.password || isLoading}
          >
           
              Sign In
          
          </Button>
        </Form>

        {/* Divider */}
        <div className="signin-divider">
          <span>OR</span>
        </div>

        {/* Google Login */}
        <Button onClick={handleGoogleLogin} variant="outline-dark" className="google-btn">
          <FaGoogle className="me-2" /> Sign in with Google
        </Button>

        <p className="signin-footer">
          Don’t have an account? <Link to="/signUp">Sign Up</Link>
        </p>
      </div>
    </Container>
  );
};

export default SignIn;
