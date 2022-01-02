import React from "react";
import { useHistory } from "react-router-dom";

const Swapper = ({ path }) => {
  let history = useHistory();

  return (
    <>
      <div className="d-flex flex-row justify-content-center align-items-center d-lg-none d-xl-none mb-3">
        <div
          className={
            "tabswitchxs-issues" + (path === "/issues" ? "-active" : "")
          }
          onClick={() => {
            path !== "/issues" && history.push("/issues");
          }}
        >
          Find Issues
        </div>
        <div
          className={
            "tabswitchxs-progress" + (path === "/progress" ? "-active" : "")
          }
          onClick={() => {
            path !== "/progress" && history.push("/progress");
          }}
        >
          Progress
        </div>
      </div>
      <div className="d-none d-lg-block d-xl-block position-absolute top-50 start-0 translate-middle-y">
        <div
          className={
            "mb-2 tabswitchlg-issues" + (path === "/issues" ? "-active" : "")
          }
          onClick={() => {
            path !== "/issues" && history.push("/issues");
          }}
        >
          Find Issues
        </div>
        <div
          className={
            "tabswitchlg-progress" + (path === "/progress" ? "-active" : "")
          }
          onClick={() => {
            path !== "/progress" && history.push("/progress");
          }}
        >
          Progress
        </div>
      </div>
    </>
  );
};

export default Swapper;
