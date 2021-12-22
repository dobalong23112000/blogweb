import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenFancy,
  faEye,
  faCommentDots,
  faChartArea,
  faChartPie,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";
export default function DataBaseSatistic({ total }) {
  const { posts, comments, views } = total;
  return (
    <div
      className="d-flex justify-content-between align-items-center"
      style={{
        color: "white",
        padding: "30px 0 30px 0",
      }}
    >
      <div className="boxDatabase">
        <h3 className="d-flex align-items-center ">
          <div
            className="icondatabase"
            style={{ backgroundColor: "navy", color: "white" }}
          >
            <FontAwesomeIcon icon={faPenFancy} />
          </div>
          <span className="me-3">Posts</span>{" "}
        </h3>
        <h3 className="contentdatabase">
          {posts}{" "}
          <FontAwesomeIcon icon={faChartArea} style={{ color: "navy" }} />
        </h3>
      </div>
      <div className="boxDatabase">
        <h3 className="d-flex align-items-center ">
          <div
            className="icondatabase"
            style={{ backgroundColor: "gold", color: "white" }}
          >
            <FontAwesomeIcon icon={faEye} />
          </div>
          <span className="me-3">Views</span>
        </h3>
        <h3 className="contentdatabase">
          {views}{" "}
          <FontAwesomeIcon icon={faChartPie} style={{ color: "gold" }} />
        </h3>
      </div>
      <div className="boxDatabase">
        {" "}
        <h3 className="mb-3 d-flex align-items-center ">
          <div
            className="icondatabase"
            style={{ backgroundColor: "cyan", color: "white" }}
          >
            <FontAwesomeIcon icon={faCommentDots} />
          </div>
          <span className="me-3">Comments</span>
        </h3>
        <h3 className="contentdatabase">
          {comments}{" "}
          <FontAwesomeIcon icon={faChartLine} style={{ color: "cyan" }} />
        </h3>
      </div>
    </div>
  );
}
