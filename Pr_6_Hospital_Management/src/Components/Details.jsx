import { Card, Col, Container, Row, Button } from "react-bootstrap";
import './Details.css'
import { MdEdit } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";

const Details = ({ patients, onEdit, onDelete }) => {
  return (
    <Container>
      <Row>
        <div className="title p-5 border text-white my-5">
           <h2 className=" text-center mt-4 fw-bold">Patient Details</h2>
        </div>
      </Row>
      <Row xs={1} md={2} lg={3} className="g-4 mt-3">
        {patients.map(patient => (
          <Col key={patient.id}>
            <Card className="h-100 shadow-sm border-0">
              <Card.Body>
                
                <Card.Title className=" card-name  fw-bold">{patient.fullName}</Card.Title>
                 <Card.Text><strong>Dob:</strong> {patient.dob}</Card.Text>
                <Card.Text><strong>Age:</strong> {patient.age}</Card.Text>
                <Card.Text><strong>Gender:</strong> {patient.gender}</Card.Text>
                <Card.Text><strong>Contact:</strong> {patient.contact}</Card.Text>
                <Card.Text><strong>Department:</strong> {patient.department}</Card.Text>
                <Card.Text><strong>Disease:</strong> {patient.disease}</Card.Text>
                <Card.Text><strong>Doctor:</strong> {patient.doctor}</Card.Text>
                <Card.Text><strong>Admit Date:</strong> {patient.admitDate}</Card.Text>
                <Card.Text><strong>Ward:</strong> {patient.wardNo}</Card.Text>

                <Button  className=" edit-btn me-2" onClick={() => onEdit(patient)}> <MdEdit size={18} /></Button>
                <Button className="deleate-btn "  onClick={() => onDelete(patient.id)}> <RiDeleteBin5Fill size={18} /></Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Details;