import { useState, useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

const AdmitForm = ({ onSave, onCancel, initialData }) => {
  const initialState = {
    fullName: '',
    dob: '',
    age: '',
    contact: '',
    gender: '',
    department: '',
    doctor:'',
    disease: '',
    admitDate: '',
    wardNo: ''
  };

  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    } else {
      setForm(initialState);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const err = {};
    if (!form.fullName || form.fullName.length < 3) err.fullName = "Name must be at least 3 characters.";
    if (!form.dob) err.dob = "DOB is required.";
    if (!form.age || parseInt(form.age) <= 0) err.age = "Age must be valid.";
    if (!form.contact || form.contact.length !== 10) err.contact = "Contact must be 10 digits.";
    if (!form.gender) err.gender = "Gender is required.";
    if (!form.department) err.department = "Department is required.";
    if (!form.disease || form.disease.length < 3) err.disease = "Disease must be at least 3 characters.";
    if(!form.doctor)err.doctor ="Select Doctor is requried."
    if (!form.admitDate) err.admitDate = "Admit date is required.";
    if (!form.wardNo) err.wardNo = "Ward number is required.";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("✅ Form is valid, submitting:", form);
      onSave({ ...form, id: initialData?.id });
      setForm(initialState);
    }
  };

  return (
    <Container className="my-4" style={{ maxWidth: '900px' }}>
      <h2 className=" form-title text-center mb-4">{initialData ? "Update Patient Details" : "Admit Form"}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Full Name:</Form.Label>
          <Form.Control name="fullName" value={form.fullName} onChange={handleChange} isInvalid={!!errors.fullName} />
          <Form.Control.Feedback type="invalid">{errors.fullName}</Form.Control.Feedback>
        </Form.Group>
        <br />

        <Row>
          <Col>
            <Form.Label>DOB:</Form.Label>
            <Form.Control type="date" name="dob" value={form.dob} onChange={handleChange} isInvalid={!!errors.dob} />
            <Form.Control.Feedback type="invalid">{errors.dob}</Form.Control.Feedback>
          </Col>
          <Col>
            <Form.Label>Age:</Form.Label>
            <Form.Control type="number" name="age" value={form.age} onChange={handleChange} isInvalid={!!errors.age} />
            <Form.Control.Feedback type="invalid">{errors.age}</Form.Control.Feedback>
          </Col>
        </Row>
        <br />

        <Row>
          <Col>
            <Form.Label>Contact:</Form.Label>
            <Form.Control name="contact" value={form.contact} onChange={handleChange} isInvalid={!!errors.contact} />
            <Form.Control.Feedback type="invalid">{errors.contact}</Form.Control.Feedback>
          </Col>
          <Col>
            <Form.Label>Gender:</Form.Label>
            <div>
              {["Female", "Male", "Other"].map(g => (
                <Form.Check
                  inline
                  key={g}
                  label={g}
                  type="radio"
                  name="gender"
                  value={g}
                  checked={form.gender === g}
                  onChange={handleChange}
                />
              ))}
              {errors.gender && <div className="text-danger">{errors.gender}</div>}
            </div>
          </Col>
        </Row>
        <br />

        <Row>
          <Col>
            <Form.Label>Department:</Form.Label>
            <Form.Select name="department" value={form.department} onChange={handleChange} isInvalid={!!errors.department}>
              <option value="">Select Department</option>
              <option >Denture Care</option>
              <option>Orthopedics</option>
              <option >Otology</option>
              <option >Neurology</option>
              <option >ENT</option>
              <option >Genral</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">{errors.department}</Form.Control.Feedback>
          </Col>
          <Col>
            <Form.Label>Disease:</Form.Label>
            <Form.Control name="disease" value={form.disease} onChange={handleChange} isInvalid={!!errors.disease} />
            <Form.Control.Feedback type="invalid">{errors.disease}</Form.Control.Feedback>
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
          <Form.Label>Select Doctor:</Form.Label>
            <Form.Select name="doctor" value={form.doctor} onChange={handleChange} isInvalid={!!errors.doctor}>
              <option value="">Select a Doctor</option>
              <option >Dr. Ravi Sharma</option>
              <option>Dr. Sneha Patel</option>
              <option >Dr. Amit Kumar</option>
              <option>Dr. Priya Mehta</option>
              <option >Dr. Sanjay Verma</option>
              <option >Dr. Anita Joshi</option>
              <option>Dr. Rahul Desai</option>
              <option >Dr. Nidhi Singh</option>

            </Form.Select>
          </Col>
        </Row>
        <br/>

        <Row>
          <Col>
            <Form.Label>Admit Date:</Form.Label>
            <Form.Control type="date" name="admitDate" value={form.admitDate} onChange={handleChange} isInvalid={!!errors.admitDate} />
            <Form.Control.Feedback type="invalid">{errors.admitDate}</Form.Control.Feedback>
          </Col>
          <Col>
            <Form.Label>Ward No:</Form.Label>
            <Form.Control type="number" name="wardNo" value={form.wardNo} onChange={handleChange} isInvalid={!!errors.wardNo} />
            <Form.Control.Feedback type="invalid">{errors.wardNo}</Form.Control.Feedback>
          </Col>
        </Row>
        <br />

        <div className="text-center">
          <Button type="submit" variant="primary" className=" submit-btn me-2">
            {initialData ? "Update" : "Submit"}
          </Button>
          <Button variant="secondary" className="cancel-btn"  onClick={onCancel}>Cancel</Button>
        </div>
      </Form>
    </Container>
  );
};

export default AdmitForm;
