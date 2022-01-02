import React, { useState, useRef, useEffect } from "react";
import { Row, Col, Container, Image } from "react-bootstrap";

import flower from "../assets/flower-icon.svg";
import GitHubItem from "../components/GitHubItem.js";
import Filters from "../components/Filters.js";
import Swapper from "../components/Swapper.js";

const IssuesScreen = ({ match }) => {
  const [bug, setBug] = useState(false);
  const [doc, setDoc] = useState(false);
  const [gfi, setGfi] = useState(false);
  const [hw, setHw] = useState(false);

  const [js, setJs] = useState(false);
  const [java, setJava] = useState(false);
  const [php, setPhp] = useState(false);
  const [python, setPython] = useState(false);
  const [ruby, setRuby] = useState(false);
  const [swift, setSwift] = useState(false);

  const [popupxs, setPopupxs] = useState(false);

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setPopupxs(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  return (
    <Container
      className="d-flex flex-column align-items-center pt-140"
      style={{ height: "100vh", maxHeight: "100vh" }}
    >
      {popupxs && (
        <div
          className="d-xl-none position-absolute filterpopup"
          ref={wrapperRef}
        >
          <div className="filterheading d-flex justify-content-between align-items-center mb-3 pb-1">
            <span className="d-flex align-items-center">
              Apply Filters
              <span className="material-icons-outlined">filter_alt</span>
            </span>
            <span
              className="material-icons pointer"
              onClick={() => setPopupxs(false)}
            >
              close
            </span>
          </div>
          <Filters
            className=""
            values={{ bug, doc, gfi, hw, js, java, php, python, ruby, swift }}
            handlers={{
              bug: setBug,
              doc: setDoc,
              gfi: setGfi,
              hw: setHw,
              js: setJs,
              java: setJava,
              php: setPhp,
              python: setPython,
              ruby: setRuby,
              swift: setSwift,
            }}
          />
        </div>
      )}
      <Swapper path={match.path} />
      <Row style={{ minWidth: "100%", maxWidth: "100%" }}>
        <div className="d-flex flex-row align-items-center justify-content-center">
          <Image src={flower} className="mx-3" style={{ width: "30px" }} />
          <h3 className="headline-1 m-0">
            All issues are Hacktoberfest-Friendly
          </h3>
        </div>
      </Row>
      <Row>
        <div
          className="filtermenu mt-3 position-relative d-flex flex-row align-items-center justify-content-center d-xl-none pointer"
          onClick={() => setPopupxs(!popupxs)}
        >
          <span className="material-icons-outlined">filter_alt</span>
          <span>Apply Filters</span>
          <div className="filternotif position-absolute top-0 start-95 translate-middle">
            {bug + doc + gfi + hw + js + java + php + python + ruby + swift}
          </div>
        </div>
      </Row>
      <div
        className="pt-3 d-flex flex-row w-auto"
        style={{ overflow: "hidden" }}
      >
        <Col className="issues d-flex w-auto flex-column align-items-center">
          <GitHubItem
            contri={{
              type: "issue",
              title: "An unnecessary issue",
              repo: "RocketChat/Rocket.Chat",
              link: "rocketchat",
              description:
                "lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
            }}
          />
          <GitHubItem
            contri={{
              type: "issue",
              title: "An unnecessary issue",
              repo: "RocketChat/Rocket.Chat",
              link: "rocketchat",
              description:
                "lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
            }}
          />
          <GitHubItem
            contri={{
              type: "issue",
              title: "An unnecessary issue",
              repo: "RocketChat/Rocket.Chat",
              link: "rocketchat",
              description:
                "lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
            }}
          />
          <GitHubItem
            contri={{
              type: "issue",
              title: "An unnecessary issue",
              repo: "RocketChat/Rocket.Chat",
              link: "rocketchat",
              description:
                "lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
            }}
          />
          <GitHubItem
            contri={{
              type: "issue",
              title: "An unnecessary issue",
              repo: "RocketChat/Rocket.Chat",
              link: "rocketchat",
              description:
                "lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
            }}
          />
        </Col>
        <Col
          xl={{ span: 2, offset: 5 }}
          className="pl-5 position-absolute d-none d-xl-block"
        >
          <Filters
            values={{ bug, doc, gfi, hw, js, java, php, python, ruby, swift }}
            handlers={{
              bug: setBug,
              doc: setDoc,
              gfi: setGfi,
              hw: setHw,
              js: setJs,
              java: setJava,
              php: setPhp,
              python: setPython,
              ruby: setRuby,
              swift: setSwift,
            }}
          />
        </Col>
      </div>
    </Container>
  );
};

export default IssuesScreen;
