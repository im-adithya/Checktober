import React, { useState } from "react";
import { Row, Button, Col, Container, Image } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import hflogo from "../assets/hacktoberfest-logo.svg";

const LandingScreen = () => {
  const [username, setUsername] = useState();
  const history = useHistory();

  const onCheck = (e) => {
    e.preventDefault();
    if (username.trim().length === 0) return;
    history.push(`/progress/${username.trim()}`);
  };

  return (
    <Container
      className="d-flex flex-column align-items-center pt-140"
      style={{ height: "100vh", maxHeight: "100vh" }}
    >
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <h1 className="headline-1 text-center">
            &quot;Open source is changing the world, one contribution at a
            time.&quot;
          </h1>
        </Col>
      </Row>
      <Row
        className="mt-5 px-3 d-flex justify-content-center mb-4"
        style={{ minWidth: "100%", maxWidth: "100%" }}
      >
        <Col className="formbox w-100">
          <div>
            <Row>
              <h4 className="headline-1">Check Your Progress</h4>
            </Row>
            <Row>
              <p style={{ fontSize: "0.7rem", marginBottom: 0 }}>
                No authentication required! You can check anyone’s progress
                here!
              </p>
            </Row>
            <form
              className="row justify-content-center align-items-center mt-3 mt-md-4"
              onSubmit={onCheck}
            >
              <Col xs={9} className="pl-0 pr-2 px-md-3">
                <input
                  type="text"
                  placeholder="GitHub Username"
                  className="w-100 input"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Col>
              <Col xs={3} className="pl-1 pr-0 px-md-3">
                <Button className="button w-100" type="submit">
                  Check
                </Button>
              </Col>
            </form>
          </div>
        </Col>
      </Row>
      <a
        href={"https://hacktoberfest.digitalocean.com/"}
        className="d-flex flex-column align-items-center justify-content-end h-100"
      >
        <Image src={hflogo} className=" hflogo pb-5 mb-4" />
      </a>
    </Container>
  );
};

export default LandingScreen;
