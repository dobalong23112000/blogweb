import React from "react";
import { Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
export default function TopLists({ posts }) {
  const navigate = useNavigate();
  return (
    <div>
      {posts && (
        <div className="d-flex justify-content-center">
          <div
            className="top2"
            style={{ marginTop: "35px", position: "relative" }}
          >
            <div
              className="toplists"
              style={{
                backgroundColor: "#e9ecef",
              }}
            >
              2
            </div>
            <Card
              style={{
                width: "23rem",
                boxShadow: "0 0 15px 5px #d1d1d1",
              }}
              className="mt-5"
            >
              <Card.Img
                variant="top"
                src={posts[1].image}
                style={{ height: "325px" }}
              />
              <Card.Body style={{ textAlign: "center" }}>
                <Card.Title
                  style={{
                    display: "-webkit-box",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    WebkitLineClamp: "1",
                    WebkitBoxOrient: "vertical",
                    fontWeight: "900",
                    fontSize: "x-large",
                    color: "#43679c",
                  }}
                >
                  {posts[1].namepost}
                </Card.Title>
                <Card.Text
                  style={{
                    display: "-webkit-box",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    WebkitLineClamp: "3",
                    WebkitBoxOrient: "vertical",
                    minHeight: "72px",
                    fontFamily: "sora",
                  }}
                >
                  {posts[1].descriptionpost}
                </Card.Text>
                <div className="my-2">
                  <FontAwesomeIcon icon={faEye} className="me-2" />
                  Views: {posts[1].views}
                </div>
                <div
                  style={{
                    fontStyle: "italic",
                    fontWeight: "200",
                    fontSize: "larger",
                    paddingBottom: "15px",
                    borderBottom: "1px solid",
                  }}
                  className="mb-2 author"
                >
                  Author: {posts[1].author}
                </div>
                <Button
                  variant="primary"
                  className="readmorebtn "
                  style={{ fontSize: "20px", marginTop: "15px" }}
                  onClick={() => {
                    navigate(`/postdetail`, {
                      state: {
                        idpost: posts[1].id,
                      },
                    });
                  }}
                >
                  Read more{" "}
                </Button>
              </Card.Body>
            </Card>
          </div>
          <div className="top1 mx-3" style={{ position: "relative" }}>
            <div
              className="toplists"
              style={{
                backgroundColor: "yellow",
              }}
            >
              1
            </div>
            <Card
              style={{
                width: "23rem",
                boxShadow: "0 0 15px 5px #d1d1d1",
              }}
              className="mt-5"
            >
              <Card.Img
                variant="top"
                src={posts[0].image}
                style={{ height: "325px" }}
              />
              <Card.Body style={{ textAlign: "center" }}>
                <Card.Title
                  style={{
                    display: "-webkit-box",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    WebkitLineClamp: "1",
                    WebkitBoxOrient: "vertical",
                    fontWeight: "900",
                    fontSize: "x-large",
                    color: "#43679c",
                  }}
                >
                  {posts[0].namepost}
                </Card.Title>
                <Card.Text
                  style={{
                    display: "-webkit-box",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    WebkitLineClamp: "3",
                    WebkitBoxOrient: "vertical",
                    minHeight: "72px",
                    fontFamily: "sora",
                  }}
                >
                  {posts[0].descriptionpost}
                </Card.Text>
                <div className="my-2">
                  <FontAwesomeIcon icon={faEye} className="me-2" />
                  Views: {posts[0].views}
                </div>
                <div
                  style={{
                    fontStyle: "italic",
                    fontWeight: "200",
                    fontSize: "larger",
                    paddingBottom: "15px",
                    borderBottom: "1px solid",
                  }}
                  className="mb-2 author"
                >
                  Author: {posts[0].author}
                </div>
                <Button
                  variant="primary"
                  className="readmorebtn "
                  style={{ fontSize: "20px", marginTop: "15px" }}
                  onClick={() => {
                    navigate(`/postdetail`, {
                      state: {
                        idpost: posts[0].id,
                      },
                    });
                  }}
                >
                  Read more{" "}
                </Button>
              </Card.Body>
            </Card>
          </div>
          <div
            className="top3"
            style={{ marginTop: "80px", position: "relative" }}
          >
            <div
              className="toplists"
              style={{
                backgroundColor: "orange",
              }}
            >
              3
            </div>
            <Card
              style={{
                width: "23rem",
                boxShadow: "0 0 15px 5px #d1d1d1",
              }}
              className="mt-5"
            >
              <Card.Img
                variant="top"
                src={posts[2].image}
                style={{ height: "325px" }}
              />
              <Card.Body style={{ textAlign: "center" }}>
                <Card.Title
                  style={{
                    display: "-webkit-box",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    WebkitLineClamp: "1",
                    WebkitBoxOrient: "vertical",
                    fontWeight: "900",
                    fontSize: "x-large",
                    color: "#43679c",
                  }}
                >
                  {posts[2].namepost}
                </Card.Title>
                <Card.Text
                  style={{
                    display: "-webkit-box",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    WebkitLineClamp: "3",
                    WebkitBoxOrient: "vertical",
                    minHeight: "72px",
                    fontFamily: "sora",
                  }}
                >
                  {posts[2].descriptionpost}
                </Card.Text>
                <div className="my-2">
                  <FontAwesomeIcon icon={faEye} className="me-2" />
                  Views: {posts[2].views}
                </div>
                <div
                  style={{
                    fontStyle: "italic",
                    fontWeight: "200",
                    fontSize: "larger",
                    paddingBottom: "15px",
                    borderBottom: "1px solid",
                  }}
                  className="mb-2 author"
                >
                  Author: {posts[2].author}
                </div>
                <Button
                  variant="primary"
                  className="readmorebtn "
                  style={{ fontSize: "20px", marginTop: "15px" }}
                  onClick={() => {
                    navigate(`/postdetail`, {
                      state: {
                        idpost: posts[2].id,
                      },
                    });
                  }}
                >
                  Read more{" "}
                </Button>
              </Card.Body>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
