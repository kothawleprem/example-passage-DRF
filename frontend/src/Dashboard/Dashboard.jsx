import { useAuthStatus } from "../hooks/useAuthStatus";
import React from "react";
import { Container, Card, Col, Row, Button, Navbar, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import './Dashboard.css'

const Dashboard = () => {
  const { isLoading, isAuthorized, userid } = useAuthStatus();
  const navigate = useNavigate()

  if (isLoading) {
    return null;
  }
  const authorizedBody = (
    <>
      You successfully signed in with Passage.
      <br />
      <br />
      Your userid is: <b>{userid}</b>
    </>
  );

  const unauthorizedBody = (
    <>
      You have not logged in and cannot view the dashboard.
      <br />
      <br />
      <a href="/">
        Login to continue.
      </a>
    </>
  );

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Navbar.Brand href="#home">drf-passage-identity</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/profile">Profile</Nav.Link>
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
            <br /><br />
            <h5>
              Head towards your Profile Page: <Button onClick={onclick=> navigate("/profile")}>View Profile</Button>
            </h5>
          </div>
        </Card>
      </Container>
    </div>
  );
}

export default Dashboard;
