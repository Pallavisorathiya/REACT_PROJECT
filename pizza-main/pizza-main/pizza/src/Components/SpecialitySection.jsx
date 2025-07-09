import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './SpecialitySection.css';

import { specialities } from './SpecialityData';

function SpecialitySection() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section className="speciality-section ptb pt-140">
      <Container fluid>
        <Row>
          <Col md={12} className="text-center pb-50" data-aos="fade-up">
            <p className="headding-sub italic">Fresh From Pizzon</p>
            <h2 className="se-title text-uppercase fw-bold">OUR SPECIALITY</h2>
          </Col>
        </Row>

        <div className="speciality-main">
          <Row className="justify-content-center">
            {specialities.map((item, index) => (
              <Col
                key={index}
                xl={4}
                lg={4}
                md={4}
                className="text-center speciality-box"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="speciality-img">
                  <a href={item.link} aria-label={`${item.title} pizza detail`}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className={item.imgClass}
                    />
                  </a>
                </div>
                <a
                  href={item.link}
                  className="ser-title text-uppercase fw-bold"
                >
                  {item.title}
                </a>
              </Col>
            ))}
          </Row>

          <Row className="mt-5">
            <Col md={12} className="text-center" data-aos="fade-up">
              <a href="menu-1.html" className="com-btn">
                VIEW MORE
              </a>
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
}

export default SpecialitySection;
