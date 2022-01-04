import React, { useEffect, useState } from "react";
import { Row, Button, Col, Container, Image } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";

import axios from "axios";
import _ from "lodash";
import moment from "moment";

import { GITHUB_TOKEN } from "../utils/constants.js";
import GitHubItem from "../components/GitHubItem.js";
import Swapper from "../components/Swapper.js";

import loaderbg from "../assets/loader-bg.svg";
import loadermain from "../assets/loader-main.svg";
import flower from "../assets/flower-icon.svg";
import brokenflower from "../assets/broken-flower.svg";

const hacktoberPullFilter = (pulls) => {
  const validPulls = pulls.filter((pr) => {
    //Filter invalid or spam marked pulls
    const isInvalid = pr.labels.some((label) => {
      return (
        label.name.toLowerCase() === "invalid" ||
        label.name.toLowerCase() === "spam"
      );
    });

    return !isInvalid;
  });
  return validPulls.map((pr) => {
    //Filter unwanted information
    const repo = pr.pull_request.html_url
      .substring(0, pr.pull_request.html_url.search("/pull"))
      .replace("https://github.com/", "");
    const hacktoberfestLabels = _.some(
      pr.labels,
      (label) => label.name.toLowerCase() === "hacktoberfest-accepted"
    );
    const twoWeeksOld = moment.utc().subtract(14, "days").startOf("day");

    return {
      number: pr.number,
      repo_name: repo,
      repo_must_have_topic: moment
        .utc(pr.created_at)
        .isAfter("2020-10-03T12:00:00.000Z"),
      title: pr.title,
      open: pr.state === "open",
      merged: pr.state === "closed" && pr.pull_request.merged_at !== null,
      has_hacktoberfest_label: hacktoberfestLabels,
      is_pending: moment.utc(pr.created_at).isAfter(twoWeeksOld),
      created_at: moment.utc(pr.created_at).format("MMMM Do YYYY"),
      url: pr.html_url,
    };
  });
};

const generateQuote = (prs) => {
  switch (prs) {
    case 0:
      return "Now is the time to begin!";
    case 1:
      return "Keep going, you can do it!";
    case 2:
      return "Halfway through!";
    case 3:
      return "One more to go!";
    case 4:
      return "Woohooo!!!";
    default:
      return "You always exceed expectations, don't you?";
  }
};

const ProgressScreen = ({ match }) => {
  const [username, setUsername] = useState(useParams().username);
  const [inputun, setInputun] = useState(useParams().username);
  const [prs, setPrs] = useState({});
  const [loading, setLoading] = useState(true);
  const [btnloading, setBtnloading] = useState(false);
  const history = useHistory();

  const onCheck = (e) => {
    e.preventDefault();
    if (inputun.trim() === username.trim()) return;
    setUsername(inputun.trim());
    setBtnloading(true);
    history.push(`/progress/${inputun.trim()}`);
  };

  useEffect(() => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const searchYear = currentMonth < 9 ? currentYear - 1 : currentYear;

    axios
      .get(
        `https://api.github.com/search/issues?q=author:${username}%20type:pr%20created:${searchYear}-09-30T00:00:00-12:00..${searchYear}-10-31T23:59:59-12:00`,
        {
          headers: {
            Authorization: `token ${GITHUB_TOKEN}`,
          },
        }
      )
      .then((res) => {
        const pulls = res.data.items;
        const filteredPulls = hacktoberPullFilter(pulls).filter(
          (pr) => pr.repo_must_have_topic
        );
        const createTopicRequests = (repo) => {
          return axios.get(`https://api.github.com/repos/${repo}`, {
            headers: {
              Authorization: `token ${GITHUB_TOKEN}`,
            },
          });
        };

        const repoTopicRequests = _.uniq(
          filteredPulls.map((pr) => pr.repo_name)
        ).map((pr) => createTopicRequests(pr));

        axios
          .all(repoTopicRequests)
          .then((resps) => {
            const repoTopicMap = resps.reduce((map, res) => {
              map[res.data.full_name] = res.data.topics;
              return map;
            }, {});

            const repoTopicPulls = _.map(filteredPulls, (pr) =>
              _.assign(
                pr,
                pr.repo_must_have_topic
                  ? {
                      repo_has_hacktoberfest_topic: repoTopicMap[
                        pr.repo_name
                      ].some(
                        (topic) => topic.toLowerCase() === "hacktoberfest"
                      ),
                    }
                  : {}
              )
            ).filter((pr) => {
              if (!pr.repo_must_have_topic) return true;
              return (
                pr.has_hacktoberfest_label || pr.repo_has_hacktoberfest_topic
              );
            });

            const createReviewRequests = (repo, number) => {
              return axios.get(
                `https://api.github.com/repos/${repo}/pulls/${number}/reviews`,
                {
                  headers: {
                    Authorization: `token ${GITHUB_TOKEN}`,
                  },
                }
              );
            };

            const approvedRequests = repoTopicPulls.map((pr) =>
              createReviewRequests(pr.repo_name, pr.number)
            );

            axios
              .all(approvedRequests)
              .then((resps) => {
                const approvalStatus = resps.map((res) => {
                  return {
                    approved: res.data.some(
                      (review) => review.state === "APPROVED"
                    ),
                  };
                });

                const result = _.zipWith(
                  repoTopicPulls,
                  approvalStatus,
                  (pr, { approved }) => _.assign(pr, { approved })
                ).filter((pr) => {
                  if (!pr.repo_must_have_topic) return true;
                  return (
                    pr.has_hacktoberfest_label ||
                    (pr.repo_has_hacktoberfest_topic &&
                      (pr.merged || pr.approved))
                  );
                });

                setPrs(result);
                setLoading(false);
                setBtnloading(false);
              })
              .catch((err) => {
                console.log("Error while fetching approved pulls: ", err);
              });
          })
          .catch((err) => {
            console.log("Error while fetching repo topics: ", err);
          });
      })
      .catch((err) => {
        console.log("Error while fetching pulls: ", err);
      });
  }, [username]);

  return loading ? (
    <div
      className="d-flex flex-column justify-content-center align-items-center loader-screen"
      style={{ height: "100vh", maxHeight: "100vh" }}
    >
      <img src={flower} width={80} className="spin" />
      <p className="loadertext mt-3">
        Fetching
        <br />
        Contributions
      </p>
    </div>
  ) : (
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
          {new Date().getMonth() < 9 && (
            <div className="position-absolute top-0 start-50 translate-middle tag d-flex align-items-center">
              Previous Year&apos;s Result
            </div>
          )}
          <div>
            <Row className="align-items-center">
              <Col xs={3} md={2}>
                <Image
                  src={"https://github.com/" + username + ".png"}
                  width="100%"
                  style={{
                    borderRadius: "50%",
                    border: "1.5px solid var(--main-color)",
                  }}
                />
              </Col>
              <Col xs={6} md={7}>
                <Row>
                  <h4 className="headline-1 username scroll-x">{username}</h4>
                  <p className="quote">
                    {btnloading
                      ? "Fetching Data..."
                      : generateQuote(prs.length)}
                  </p>
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
                    {btnloading ? (
                      <img src={loadermain} width={25} />
                    ) : (
                      prs.length + "/4"
                    )}
                  </div>
                </Row>
              </Col>
            </Row>
            <form
              className="row justify-content-center align-items-center mt-3 mt-md-4"
              onSubmit={onCheck}
            >
              <Col xs={9} className="pl-0 pr-2 px-md-3">
                <input
                  type="text"
                  value={inputun}
                  onChange={(e) => setInputun(e.target.value)}
                  className="w-100 input"
                />
              </Col>
              <Col xs={3} className="pl-1 pr-0 px-md-3">
                <Button className="button w-100" type="submit">
                  {btnloading ? <img src={loaderbg} width={25} /> : "Check"}
                </Button>
              </Col>
            </form>
          </div>
        </Col>
      </Row>
      <div className="pullrequests pt-4 d-flex flex-column align-items-center">
        {btnloading && (
          <div className=" d-flex flex-column p-3 justify-content-center align-items-center">
            <img src={flower} className="spin" width={70} />
            <p className="nopullstext mt-3">Loading Pulls...</p>
          </div>
        )}
        {!btnloading && prs.length === 0 && (
          <div className=" d-flex flex-column justify-content-center align-items-center">
            <img src={brokenflower} width={70} />
            <p className="nopullstext mt-3">No contributions to show.</p>
          </div>
        )}
        {!btnloading
          ? prs.map((pr, index) => {
              return (
                <GitHubItem
                  key={index}
                  contri={{
                    type: "pr",
                    done: !pr.is_pending,
                    title: pr.title,
                    repo: pr.repo_name,
                    link: pr.url,
                  }}
                />
              );
            })
          : ""}
      </div>
    </Container>
  );
};

export default ProgressScreen;
