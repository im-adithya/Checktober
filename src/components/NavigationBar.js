import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Image, Navbar, Nav } from "react-bootstrap";

import logo from "../assets/checktober-logo.svg";

const NavigationBar = () => {
  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.getMonth();
  return (
    <header>
      <Navbar
        variant="light"
        expand="lg"
        className="zindex1 py-2"
        collapseOnSelect
      >
        <LinkContainer to={"/"} className="pointer">
          <Image src={logo} width="180px" className="p-3" />
        </LinkContainer>
        <Nav className="ml-auto">
          <div
            className="d-flex flex-column align-items-center"
            style={{ color: "var(--main-color)" }}
          >
            <div
              style={{ fontSize: "2.5rem", lineHeight: 1, fontWeight: "800" }}
            >
              {currentMonth === 9
                ? 31 - currentDay
                : currentMonth < 9
                ? 9 - currentMonth
                : 18 - currentMonth}
            </div>
            <div
              style={{ fontSize: "0.6rem", fontWeight: "800" }}
              className="m-0"
            >
              {currentMonth === 9 ? "Days to Go" : "Months to Begin"}!
            </div>
          </div>
        </Nav>
      </Navbar>
    </header>
  );
};

export default NavigationBar;
