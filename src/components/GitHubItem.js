import React from "react";
import { Row, Col, Image } from "react-bootstrap";

import flower from "../assets/flower-icon.svg";
import merge from "../assets/merge-icon.svg";
import fallback from "../assets/org-fallback.svg";

const GitHubItem = ({ contri }) => {
  return (
    <Row
      className={
        "mb-4 d-flex justify-content-center" +
        (contri.type === "issue" ? " px-2" : " px-3")
      }
      style={{ minWidth: "100%", maxWidth: "100%" }}
      onClick={() => {
        window.location = contri.link;
      }}
    >
      <Col className="githubbox w-100">
        <div>
          <Row className="align-items-center">
            <Col xs={2} className="p-0 p-md-2 d-flex justify-content-center">
              <Image
                src={
                  contri.type === "issue"
                    ? "https://github.com/" + contri.repoowner + ".png"
                    : merge
                }
                className={contri.type === "issue" ? "issueimage" : "primage"}
                onError={(event) => (event.target.src = fallback)}
              />
            </Col>
            <Col xs={10}>
              <Row>
                <div className="orgname scroll-x">{contri.repo}</div>
                <p className="title">{contri.title}</p>
              </Row>
            </Col>
          </Row>
          {contri.type === "issue" && (
            <Row>
              <p className="description mt-2 mt-md-0 max-lines">
                {contri.description}
              </p>
            </Row>
          )}
        </div>
        {contri.type === "pr" && (
          <div className="position-absolute top-0 start-100 translate-modified tag d-flex align-items-center">
            {contri.done ? "Counted" : "Pending"}
          </div>
        )}
        {contri.type === "pr" && contri.done && (
          <Image
            src={flower}
            className="position-absolute top-0 start-0 translate-middle compflower"
            width="35px"
          />
        )}
      </Col>
    </Row>
  );
};

export default GitHubItem;
