import React from 'react'
import { Container, Card, Col, Row, Button, Navbar} from "react-bootstrap"
import "@passageidentity/passage-elements/passage-auth";

import './Login/Login.css'

const Login = () => {
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Navbar.Brand href="#home">drf-passage-identity</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
      </Navbar>
      <Container className="container">
        <Row>
          <Col className="welcome">
            <h2>Hey 👋</h2>
            <h5>
              Weclome to this demo of &nbsp;
              <b>
                <i>drf-passage-identity</i>
              </b>, a django package to easily integrate Passage by 1Passowrd in
              your django rest framework application and a React.js frontend.
            </h5>
            <h5>On this page you can Register / Login.</h5>
            <br />
            <br />
            <h5>
              You can read the complete article <a href="">here</a>
            </h5>
            <h5>
              You can checkout the code for the package <a href="">here</a>
            </h5>
            <h5>
              You can checkout the code for this demo <a href="">here</a>
            </h5>
          </Col>
          <Col>
            <Card className="loginCard">
              <center>
                <passage-auth app-id="your-app-id"></passage-auth>
              </center>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Login