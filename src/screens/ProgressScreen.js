import React, { useContext } from "react";
import { Row, Button, Col, Container, Image } from "react-bootstrap";
import { UserContext } from "../User";

import GitHubItem from "../components/GitHubItem.js";
import Swapper from "../components/Swapper.js";

const generateQuote = (prs) => {
  switch (prs) {
    case 0:
      return "Now is the time to begin!";
    case 1:
      return "";
    case 2:
      return "";
    case 3:
      return "One more to go!";
    case 4:
      return "Donee!!!";
    default:
      return "You always exceed expectations, don't you?";
  }
};

const ProgressScreen = ({ match }) => {
  const user = useContext(UserContext);
  return (
    <Container
      className="d-flex flex-column align-items-center pt-140"
      style={{ height: "100vh", maxHeight: "100vh" }}
    >
      <Swapper path={match.path} />
      <Row
        className="px-3 d-flex justify-content-center mb-4"
        style={{ minWidth: "100%", maxWidth: "100%" }}
      >
        <Col className="formbox w-100">
          <div>
            <Row className="align-items-center">
              <Col xs={3} md={2}>
                <Image
                  src={"https://github.com/" + user.name + ".png"}
                  width="100%"
                  style={{
                    borderRadius: "50%",
                    border: "1.5px solid var(--main-color)",
                  }}
                />
              </Col>
              <Col xs={6} md={7}>
                <Row>
                  <h4 className="headline-1 username scroll-x">{user.name}</h4>
                  <p className="quote">{generateQuote(user.prs)}</p>
                </Row>
              </Col>
              <Col xs={3} md={3}>
                <Row>
                  <div
                    className="d-flex justify-content-end prs"
                    style={{
                      lineHeight: 1,
                      fontWeight: "700",
                    }}
                  >
                    3/4
                  </div>
                </Row>
              </Col>
            </Row>
            <Row className="justify-content-center align-items-center mt-3 mt-md-4">
              <Col xs={9} className="pl-0 pr-2 px-md-3">
                <input type="text" value={user.name} className="w-100 input" />
              </Col>
              <Col xs={3} className="pl-1 pr-0 px-md-3">
                <Button className="button w-100">Check</Button>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      <div className="pullrequests pt-4 d-flex flex-column align-items-center">
        <GitHubItem
          contri={{
            type: "pr",
            done: true,
            title: "Fix typos lmao",
            repo: "RocketChat/Rocket.Chat",
          }}
        />
        <GitHubItem
          contri={{
            type: "pr",
            done: true,
            title:
              "Fix a very very very very very very very very very very very very very very very very very very very very very big issue",
            repo: "RocketChat/Rocket.Chat",
          }}
        />
        <GitHubItem
          contri={{
            type: "pr",
            done: false,
            title:
              "Fix a very very very very very very very very very very very very very very very very very very very very very big issue",
            repo: "RocketChat/Rocket.Chat",
          }}
        />
        <GitHubItem
          contri={{
            type: "pr",
            done: false,
            title:
              "Fix a very very very very very very very very very very very very very very very very very very very very very big issue",
            repo: "RocketChat/Rocket.Chat",
          }}
        />
      </div>
    </Container>
  );
};

export default ProgressScreen;
