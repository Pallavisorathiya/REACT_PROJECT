import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Card, Badge, Button } from "react-bootstrap";
import { getAllStudentAsync } from "../Services/Actions/studentAction";
import { IoArrowBackOutline } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import "./StudentDetails.css";

const StudentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { students = [], isLoading, isError } = useSelector(
    (state) => state.studentReducer || {}
  );

  useEffect(() => {
    if (!students || students.length === 0) {
      dispatch(getAllStudentAsync());
    }
  }, [dispatch, students?.length]);

  const student = Array.isArray(students)
    ? students.find((s) => String(s.id) === String(id))
    : null;

  const handleBack = () => navigate(-1);

  const handleEdit = () => {
    if (student?.id) {
      navigate(`/students/edit/${student.id}`);
    }
  };

  if (isLoading && !student) {
    return <div className="text-center mt-5">Loading student...</div>;
  }

  if (isError && !student) {
    return <div className="text-center mt-5 text-danger">{isError}</div>;
  }

  if (!student) {
    return <div className="text-center mt-5">Student not found.</div>;
  }

  return (
    <Container className="student-details-container py-4">
      <Button className="back-btn" onClick={handleBack}>
        <IoArrowBackOutline className="me-1" /> Back
      </Button>

      <Row className="mt-4 align-items-start">
        {/* Image */}
        <Col md={5} className="mb-3">
          <Card className="shadow-lg border-0 student-img-card">
            <Card.Img
              variant="top"
              src={student.image || "https://via.placeholder.com/600x350?text=Student"}
              alt={student.fullName}
              className="student-img"
            />
          </Card>
        </Col>

        {/* Details */}
        <Col md={7}>
          <h2 className="student-name">{student.fullName}</h2>
          {student.course && (
            <Badge bg="success" className="student-badge">{student.course}</Badge>
          )}
          <div className="student-meta">
            {student.rollNo && <span>Roll No: <strong>{student.rollNo}</strong></span>}
            {student.rollNo && student.gender && " • "}
            {student.gender && <span>Gender: <strong>{student.gender}</strong></span>}
          </div>

          <Card className="border-0 shadow-sm student-info-card mb-3">
            <Card.Body>
              <Row className="gy-3">
                <Col sm={6}>
                  <div className="label">Age</div>
                  <div className="value">{student.age || "-"}</div>
                </Col>
                <Col sm={6}>
                  <div className="label">DOB</div>
                  <div className="value">
                    {student.dob ? new Date(student.dob).toLocaleDateString() : "-"}
                  </div>
                </Col>
                <Col sm={6}>
                  <div className="label">Email</div>
                  <div className="value">{student.email || "-"}</div>
                </Col>
                <Col sm={6}>
                  <div className="label">Phone</div>
                  <div className="value">{student.phone || "-"}</div>
                </Col>
                <Col sm={12}>
                  <div className="label">Address</div>
                  <div className="value">{student.address || "-"}</div>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          <div className="mt-3 d-flex gap-3">
            <Button className="edit-btn" onClick={handleEdit}>
              <FaRegEdit className="me-1" /> Edit
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default StudentDetails;
