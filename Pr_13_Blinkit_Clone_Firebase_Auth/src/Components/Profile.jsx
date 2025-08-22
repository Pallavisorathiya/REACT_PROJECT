import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const { user } = useSelector((state) => state.userReducer);
  const navigate = useNavigate();

  const getInitial = (email) => (email ? email.charAt(0).toUpperCase() : "");

  const handleBack = () => {
    navigate("/"); 
  };

  return (
    <Container className="profile-page mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="p-4 shadow-sm">
          
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3 className="m-0">My Profile</h3>
              <Button variant="outline-success" onClick={handleBack}>
                ← Back
              </Button>
            </div>

            <div className="d-flex align-items-center gap-3">
            
              <div className="profile-avatar">{getInitial(user.email)}</div>
              <div>
                <h4 className="mb-1">{user.email}</h4>
                <p className="text-muted mb-0">Member since 2025</p>
              </div>
            </div>

            <hr />

            <div className="mt-3">
              <Button variant="success" className="me-3">
                Edit Profile
              </Button>
              <Button variant="outline-success" className="me-3">
                Orders
              </Button>
              <Button variant="outline-success">Wishlist</Button>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
