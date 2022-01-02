import React from "react";
import { Image } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { UserProvider } from "./User";
import PrivateRoute from "./PrivateRoute";

import NavigationBar from "./components/NavigationBar";
import Notif from "./components/Notif";

import IssuesScreen from "./screens/IssuesScreen";
import LandingScreen from "./screens/LandingScreen";
import ProgressScreen from "./screens/ProgressScreen";

import githublogo from "./assets/github-logo.svg";
import branchdesign from "./assets/branch-design.svg";

function App() {
  return (
    <Router>
      <NavigationBar />
      <Notif />
      <main>
        <Route exact path="/" component={LandingScreen} />
        <UserProvider>
          <PrivateRoute path="/progress" component={ProgressScreen} />
          <PrivateRoute path="/issues" component={IssuesScreen} />
        </UserProvider>
      </main>
      <a href={"https://github.com/im-adithya/Checktober"}>
        <Image
          src={githublogo}
          width="50px"
          className="position-fixed bottom-0 start-0 m-3 githublogo"
        />
      </a>
      <Image
        src={branchdesign}
        className="branch position-fixed top-100 start-100 translate-branch .d-none"
      />
    </Router>
  );
}

export default App;
