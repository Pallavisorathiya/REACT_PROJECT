import React, { useEffect } from 'react';
import { Container, Row, Col, Nav, Tab } from 'react-bootstrap';
import './SpecialMenu.css';
import { menuItems } from './MenuData';
import AOS from 'aos';
import 'aos/dist/aos.css';

import menuTopBg from '../assets/menu-top-bg.png';
import menuBottomBg from '../assets/menu-bottom-bg.png';

const SpecialMenu = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <section className="special-menu ptb pt-140">
      <Container>
        <div className="menu-top-bg">
          <img src={menuTopBg} alt="menu top bg" />
        </div>

        <Row>
          <Col className="text-center pb-5" data-aos="fade-up">
            <p className="headding-sub italic">Fresh From Pizzon</p>
            <h2 className="sp-title text-white text-uppercase fw-bold">Our Special Menu</h2>
          </Col>
        </Row>

        <Row>
          <Col data-aos="fade-up">
            <div className="special-tab text-center">
              <Tab.Container defaultActiveKey="all">
                <Nav variant="tabs" className="justify-content-center nav-tabs">
                  {Object.keys(menuItems).map((key, index) => (
                    <Nav.Item key={index} className="text-uppercase fw-bold">
                      <Nav.Link eventKey={key}>{key}</Nav.Link>
                    </Nav.Item>
                  ))}
                </Nav>

                <Tab.Content className="pt-4">
                  {Object.entries(menuItems).map(([key, items], idx) => (
                    <Tab.Pane key={idx} eventKey={key}>
                      <Row className="our-menu-panel">
                        {items.map((item, index) => (
                          <Col
                            key={index}
                            xl={3}
                            lg={3}
                            md={4}
                            sm={6}
                            xs={12}
                            className="text-center menu-box"
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                          >
                            <div className="menu-img">
                              <img src={item.img} alt={item.title} className="menu-image" />
                            </div>
                            <div className="menu-title text-uppercase">{item.title}</div>
                            <p className="menu-des">
                              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            </p>
                            <span className="menu-price">$20.50</span>
                          </Col>
                        ))}
                      </Row>
                    </Tab.Pane>
                  ))}
                </Tab.Content>
              </Tab.Container>
            </div>
          </Col>
        </Row>

        <div className="menu-bottom-bg">
          <img src={menuBottomBg} alt="menu bottom bg" />
        </div>
      </Container>
    </section>
  );
};

export default SpecialMenu;