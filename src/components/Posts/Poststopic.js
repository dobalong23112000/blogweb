import React from "react";
import { Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import { doc, updateDoc } from "@firebase/firestore";
import { db } from "../../firebase/firebase";
export default function Poststopic({ topic }) {
  const navigate = useNavigate();

  return (
    <div
      className="topic my-5 clearfix"
      style={{ padding: "0px 0px 30px 0px" }}
    >
      <div className="title-topic">
        <h1
          className="my-2 text-center"
          style={{
            fontFamily: "sora",
            fontWeight: "bold",
            fontSize: "70px",
            padding: "30px 0px 15px 0px",
            textAlign: "center",
            color: "black",
            background: "white",
            textTransform: "uppercase",
            borderTop: "2px solid",
          }}
        >
          {topic.nametopic}
        </h1>
        <div
          style={{
            textAlign: "center",
            fontSize: "35px",
            color: "#43679c",
            fontFamily: "Meow Script",
            fontWeight: "700",
          }}
        >
          Lorem Ipsum is simply dummy text of the printing and typesetting
        </div>
      </div>
      <div
        className="content-topic d-flex justify-content-evenly flex-wrap"
        style={{ backgroundColor: "white", padding: "30px 0 60px 0" }}
      >
        {topic.posts.map((post, index) => (
          <Card
            style={{
              width: "23rem",
              boxShadow: "0 0 15px 5px #d1d1d1",
            }}
            className="mt-5"
            key={index}
          >
            <Card.Img
              variant="top"
              src={post.image}
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
                {post.namepost}
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
                {post.descriptionpost}
              </Card.Text>
              <div className="my-2">
                <FontAwesomeIcon icon={faEye} className="me-2" />
                Views: {post.views}
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
                onClick={() => {
                  navigate("/userpage", {
                    state: {
                      emailauthor: post.emailauthor,
                      author: post.author,
                    },
                  });
                }}
              >
                Author: {post.author}
              </div>
              <Button
                variant="primary"
                className="readmorebtn "
                onClick={async () => {
                  const datapost = {
                    idpost: post.idpost,
                  };
                  navigate(`/postdetail`, {
                    state: {
                      ...datapost,
                    },
                  });
                  await updateDoc(doc(db, "posts", `${post.idpost}`), {
                    views: post.views + 1,
                  });
                }}
                style={{ fontSize: "20px", marginTop: "15px" }}
              >
                Read more{" "}
                {/* <FontAwesomeIcon icon={faArrowRight} className="ms-2" /> */}
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}
