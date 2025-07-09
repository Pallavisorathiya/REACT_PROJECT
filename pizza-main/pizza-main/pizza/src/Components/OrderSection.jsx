import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './OrderSection.css';

import { orderImages, orderSteps } from './OrderData';

function OrderSection() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section className="order-section ptb">
      <Container>
        <div className="order-top">
          <img src={orderImages.top} alt="top design" />
        </div>

        <Row className="position-relative z-2">
          {orderSteps.map((step, index) => (
            <Col
              key={index}
              xl={4}
              lg={4}
              md={4}
              className="servose-box text-center padding-lf"
              data-aos="fade-up"
              data-aos-delay={index * 150}
            >
              <img src={step.img} alt={step.title} className="order-img" />
              <h2 className="order-title text-uppercase">{step.title}</h2>
              <p className="order-des">{step.desc}</p>
            </Col>
          ))}
        </Row>

        <div className="order-bottom">
          <img src={orderImages.bottom} alt="bottom design" />
        </div>
      </Container>
    </section>
  );
}

export default OrderSection;
