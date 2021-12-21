import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import { useLocation } from "react-router";
import { db } from "../../firebase/firebase";
import { useNavigate } from "react-router";
import FooterScreen from "../FooterScreen";
import NavbarScreen from "../NavbarScreen";
import CommentScreen from "./CommentScreen";

export default function Postdetail() {
  const { state } = useLocation();
  const [data, setData] = useState();
  const { idpost } = state;
  useEffect(() => {
    // async function FetchDataPost() {
    //   let datapost = await getDoc(doc(db, "posts", `${idpost}`));

    //   setData(datapost.data());
    // }
    const unsub = onSnapshot(doc(db, "posts", `${idpost}`), (doc) => {
      setData(doc.data());
    });
    // FetchDataPost();
    return () => {
      unsub();
    };
  }, [idpost]);
  const navigate = useNavigate();
  return (
    <div>
      {data ? (
        <div style={{ backgroundColor: "#d1d1d1", paddingTop: "40px" }}>
          <NavbarScreen></NavbarScreen>
          <Container
            style={{
              marginTop: "79px",
              padding: "0 50px 70px 50px",

              backgroundColor: "white",
            }}
            className="mb-3"
          >
            <h1
              style={{
                paddingTop: "35px",
                fontSize: "90px",
                fontFamily: "Libre Baskerville",
              }}
              className="mb-3"
            >
              {data.namepost}
            </h1>
            <h4 className="mb-3" style={{ fontFamily: "Libre Baskerville" }}>
              Topic: {data.topic}
            </h4>
            <div
              style={{
                fontStyle: "italic",
                fontWeight: "200",
                fontSize: "19px",
                fontFamily: "Libre Baskerville",
                cursor: "pointer",
              }}
              className="mb-3"
              title={data.emailauthor}
              onClick={() => {
                navigate("/userpage", {
                  state: {
                    emailauthor: data.emailauthor,
                    author: data.author,
                  },
                });
              }}
            >
              Author: {data.author}
            </div>

            <div>
              Views: {data.views} <FontAwesomeIcon icon={faEye} />
            </div>
            <h4
              className="mb-5 mt-3 pb-5"
              style={{
                borderBottom: "2px solid #d1d1d1",
                fontFamily: "Libre Baskerville",
              }}
            >
              Description: {data.descriptionpost}
            </h4>
            <img
              src={data.image}
              alt=""
              style={{ width: "100%", height: "500px" }}
            />
            <div className="mt-5" style={{ whiteSpace: "pre-wrap" }}>
              {data.content}
            </div>
            <CommentScreen
              info={{
                comments: data.comments,
                emailauthor: data.emailauthor,
                idpost,
                author: data.author,
                namepost: data.namepost,
                views: data.views,
              }}
            />
          </Container>

          <FooterScreen />
        </div>
      ) : (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
    </div>
  );
}
