import React from "react";
import { Row, Col } from "react-bootstrap";
import "./Features.css";

// Import your icons
import smartClassIcon from "../assets/school.png";
import videoTutorialIcon from "../assets/tutorial12.png";
import onlineExamIcon from "../assets/exam.png";
import attendanceIcon from "../assets/attendance-1.png";
import homeworkIcon from "../assets/folder.png";
import timetableIcon from "../assets/schedule.png";

const features = [
  {
    id: 1,
    icon: smartClassIcon,
    title: "Smart Class",
    desc: "SWEEDU School ERP Software helps schools by providing them tools to conduct online classes with increased efficiency.",
  },
  {
    id: 2,
    icon: videoTutorialIcon,
    title: "Video Tutorials",
    desc: "The video tutorial feature in SWEEDU offers a complete learning management system to the students of your school.",
  },
  {
    id: 3,
    icon: onlineExamIcon,
    title: "Online Exam",
    desc: "SWEEDU School ERP Software offers a robust online examination system for your school students and teachers.",
  },
  {
    id: 4,
    icon: attendanceIcon,
    title: "Attendance",
    desc: "With the Attendance module in SWEEDU School ERP, schools and other educational institutions can easily manage school attendance.",
  },
  {
    id: 5,
    icon: homeworkIcon,
    title: "Homework Management",
    desc: "The video tutorial feature in SWEEDU offers a complete learning management system to the students of your school.",
  },
  {
    id: 6,
    icon: timetableIcon,
    title: "Timetable Management",
    desc: "With SWEEDU's Timetable Management feature, school admins and teachers can create timetables for every student within their school.",
  },
];

const Features = () => {
  return (
    <section className="features-section">
      <h2 className="features-title">
        What features do you get in the Student Management System of{" "}
        <span>SWEEDU ERP Software?</span>
      </h2>

      <Row className="features-row justify-content-center">
        {features.map((feature) => (
          <Col
            key={feature.id}
            lg={4}
            md={6}
            sm={12}
            className="d-flex justify-content-center"
          >
            <div className="feature-card">
              <img
                src={feature.icon}
                alt={feature.title}
                className="feature-icon"
              />
              <h4 className="feature-title">{feature.title}</h4>
              <p className="feature-desc">{feature.desc}</p>
            </div>
          </Col>
        ))}
      </Row>
    </section>
  );
};

export default Features;
