import React, { useState } from 'react'
import { useAuthStatus } from "../hooks/useAuthStatus";
import { useEffect } from 'react';
import {
  Container,
  Card,
  Col,
  Row,
  Button,
  Navbar,
  Nav,
  Form
} from "react-bootstrap";
import axios from 'axios';

const Profile = () => {
  const { isLoading, isAuthorized, userid } = useAuthStatus();
  const [profile, setProfile] = useState()
  const [quote, setQuote] = useState("");
  const [initialQuote, setInitialQuote] = useState("");

  const token = localStorage.getItem("psg_auth_token");

  const API_URL = "http://localhost:8000";

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    axios.get(`${API_URL}/api/client/profile/`, config)
    .then((response) => {
        const data = response.data
        console.log(data)
        setProfile(data)
        setQuote(data.motivation_quote)
        setInitialQuote(data.motivation_quote)
    })
  },[])

  const handleInputChange = (event) => {
    setQuote(event.target.value);
  };

  const handleSubmit = async () => {
    if (quote === initialQuote) {
      alert("The Quote is already set to this value.");
      return;
    }

    if (!quote) {
      alert("Please enter a Quote");
      return;
    }

    const data = {
      motivation_quote: quote,
    };

    axios
      .patch(`${API_URL}/api/client/profile/`, data, config)
      .then((response) => {
        alert("Quote updated successfully!");
        setInitialQuote(quote);
      })
      .catch((error) => {
        alert("An error occurred while updating the Quote.");
      });
  };

  if (isLoading) {
    return null;
  }

  const authorizedBody = (
    <>
      {profile !== undefined ? (
        <>
          {" "}
          Your Email: {profile.email}
          <br />
          <br />
          <Form>
            <Row>
              <Col>
                <Form.Group controlId="formTextField">
                  <Form.Control
                    type="text"
                    onChange={handleInputChange}
                    value={quote}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formButton">
                  <Button
                    className="formButton"
                    type="button"
                    onClick={handleSubmit}
                  >
                    Update Quote
                  </Button>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </>
      ) : (
        <> Waiting For Data</>
      )}
    </>
  );

  const unauthorizedBody = (
    <>
      You have not logged in and cannot view the dashboard.
      <br />
      <br />
      <a href="/">Login to continue.</a>
    </>
  );

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Navbar.Brand href="#home">drf-passage-identity</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Container className="welcome">
        <Card className="loginCard">
          <div className="dashboardCard">
            <Card.Title>
              <h3>{isAuthorized ? "Welcome!" : "Unauthorized"}</h3>
            </Card.Title>
            <h5>
              <div>{isAuthorized ? authorizedBody : unauthorizedBody}</div>
            </h5>
            
          </div>
        </Card>
      </Container>
    </div>
  );
}

export default Profile