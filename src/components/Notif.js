import React from "react";
import { Row, Col } from "react-bootstrap";

const Notif = () => {
  return (
    <Row className="popup zindex10 align-items-center position-absolute start-50 translate-middle-x m-0">
      <Col>
        <Row>
          <Col className="d-flex px-0 align-items-center justify-content-center">
            <span
              className="material-icons-outlined px-1"
              style={{ fontSize: "1.4rem" }}
            >
              announcement
            </span>
            <div style={{ fontSize: "0.8rem" }}>
              Don’t forget to{" "}
              <a
                href="https://hacktoberfest.digitalocean.com/"
                style={{ fontWeight: "700" }}
              >
                register
              </a>{" "}
              to receive a tee!
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Notif;
