import React, { useState, useRef, useEffect } from "react";
import { Row, Col, Container, Image } from "react-bootstrap";
import axios from "axios";

import { resultPerPage, sortOptions } from "../utils/constants.js";
import flower from "../assets/flower-icon.svg";
import GitHubItem from "../components/GitHubItem.js";
import Filters from "../components/Filters.js";
import Swapper from "../components/Swapper.js";

// eslint-disable-next-line no-undef
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

String.prototype.camelToSpaces = function () {
  return this.replace(/([a-z])([A-Z])/g, "$1 $2");
};

String.prototype.addQuotes = function () {
  return `"${this}"`;
};

const hasUpperCase = (str) => {
  return str.toLowerCase() !== str;
};

const getActiveItems = (items) => {
  return Object.keys(items).filter((item) => items[item]);
};

const formatLabelsForUrl = (labels) => {
  return labels.map((label) => {
    if (!hasUpperCase(label)) {
      return label;
    }
    return label.camelToSpaces().toLowerCase().addQuotes();
  });
};

const joinItemsForUrl = (items, itemType) => {
  return items.map((item) => `+${itemType.slice(0, -1)}:${item}`).join("");
};

const IssuesScreen = ({ match }) => {
  const [issues, setIssues] = useState({});
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalpages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

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

  const firstIssueRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const labels = {
      bug: bug,
      documentation: doc,
      goodFirstIssue: gfi,
      helpWanted: hw,
    };
    const activeLabels = getActiveItems(labels);
    const formattedLabels = formatLabelsForUrl(activeLabels);
    const joinedLabels = joinItemsForUrl(formattedLabels, "labels");

    const languages = {
      javascript: js,
      java: java,
      php: php,
      python: python,
      ruby: ruby,
      swift: swift,
    };
    const activeLanguage = getActiveItems(languages);
    const joinedLanguage = joinItemsForUrl(activeLanguage, "languages");

    axios
      .get(
        `https://api.github.com/search/issues?q=type:issue+label:hacktoberfest${joinedLabels}${joinedLanguage}${sortOptions}&page=${page}`,
        {
          headers: {
            Authorization: `token ${GITHUB_TOKEN}`,
          },
        }
      )
      .then((res) => {
        setTotalResults(res.data.total_count);
        setTotalpages(Math.ceil(totalResults / resultPerPage));
        const issues = res.data.items;
        const filteredIssues = issues.map((issue) => {
          const repo = issue.html_url
            .substring(0, issue.html_url.search("/issues"))
            .replace("https://github.com/", "");
          const repoowner = repo.split("/")[0];
          return {
            repo: repo,
            link: issue.html_url,
            title: issue.title,
            description: issue.body,
            repoowner: repoowner,
          };
        });
        setIssues(filteredIssues);
        setLoading(false);
        if (firstIssueRef.current)
          firstIssueRef.current.scrollIntoView({ behavior: "smooth" });
      });
  }, [bug, doc, gfi, hw, js, java, php, python, ruby, swift, page]);

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

  useOutsideAlerter(wrapperRef);

  return loading ? (
    <div
      className="d-flex flex-column justify-content-center align-items-center loader-screen"
      style={{ height: "100vh", maxHeight: "100vh" }}
    >
      <img src={flower} width={80} className="spin" />
      <p className="loadertext mt-3">
        Fetching
        <br />
        Issues
      </p>
    </div>
  ) : (
    <Container className="d-flex flex-column align-items-center pt-140 issuesscreen">
      {popupxs && (
        <div className="d-xl-none position-fixed filterpopup" ref={wrapperRef}>
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
              page: setPage,
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
      <div className="pt-3 d-flex flex-row issuesbox">
        <Col className="issues d-flex w-auto flex-column align-items-center">
          <div ref={firstIssueRef}></div>
          {issues.map((issue, index) => {
            return (
              <GitHubItem
                key={index}
                contri={{
                  type: "issue",
                  title: issue.title,
                  repo: issue.repo,
                  repoowner: issue.repoowner,
                  link: issue.link,
                  description: issue.description,
                }}
              />
            );
          })}
          <div className="d-flex flex-row justify-content-center align-items-center pb-2">
            <span
              className={
                "material-icons-outlined page " +
                (page !== 1 ? "pointer" : "pagedull")
              }
              onClick={() => {
                page !== 1 ? setPage(page - 1) : page;
              }}
            >
              navigate_before
            </span>
            <div className="pagenumber">{page}</div>
            <span
              className={
                "material-icons-outlined page " +
                (page !== totalPages ? "pointer" : "pagedull")
              }
              onClick={() => {
                page !== totalPages ? setPage(page + 1) : page;
              }}
            >
              navigate_next
            </span>
          </div>
          <div className="lablang">[Total Results: {totalResults}]</div>
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
              page: setPage,
            }}
          />
        </Col>
      </div>
    </Container>
  );
};

export default IssuesScreen;
