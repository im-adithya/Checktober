import React from "react";
import { useHistory, useParams } from "react-router-dom";

const Swapper = ({ path }) => {
  let history = useHistory();
  const username = useParams().username;
  const pathname = path.split("/")[1];

  return (
    <>
      <div className="d-flex flex-row justify-content-center align-items-center d-lg-none d-xl-none mb-4">
        <div
          className={
            "tabswitchxs-issues" + (pathname === "issues" ? "-active" : "")
          }
          onClick={() => {
            pathname !== "issues" && history.push(`/issues/${username}`);
          }}
        >
          Find Issues
        </div>
        <div
          className={
            "tabswitchxs-progress" + (pathname === "progress" ? "-active" : "")
          }
          onClick={() => {
            pathname !== "progress" && history.push(`/progress/${username}`);
          }}
        >
          Progress
        </div>
      </div>
      <div className="d-none d-lg-block d-xl-block position-absolute top-50 start-0 translate-middle-y">
        <div
          className={
            "mb-2 tabswitchlg-issues" + (pathname === "issues" ? "-active" : "")
          }
          onClick={() => {
            pathname !== "issues" && history.push(`/issues/${username}`);
          }}
        >
          Find Issues
        </div>
        <div
          className={
            "tabswitchlg-progress" + (pathname === "progress" ? "-active" : "")
          }
          onClick={() => {
            pathname !== "progress" && history.push(`/progress/${username}`);
          }}
        >
          Progress
        </div>
      </div>
    </>
  );
};

export default Swapper;
