import { faCog, faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { db } from "../firebase/firebase";
import { AuthContext } from "./Context/AuthProvider";
import FooterScreen from "./FooterScreen";
import NavbarScreen from "./NavbarScreen";
import Userposts from "./Userposts";
import { useNavigate } from "react-router-dom";
import ListUserBlocked from "./ListUserBlocked";

export default function Userpage() {
  const [useOpenBlock, setOpenBlock] = useState(false);
  const { state } = useLocation();
  const { emailauthor, author } = state;
  const { email } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleClickBlock = async () => {
    async function FetchDataUsers() {
      try {
        let UserId;
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
          if (doc.data().email === email) {
            UserId = doc.id;
          }
        });
        await updateDoc(doc(db, "users", `${UserId}`), {
          blacklist: arrayUnion(emailauthor),
        });
        navigate("/home");
      } catch (e) {
        console.log(e.message);
      }
    }
    FetchDataUsers();
  };
  useEffect(() => {}, []);
  const [inForUser, setInforUser] = useState({
    views: 0,
    posts: 0,
    comments: 0,
  });
  const ChangeOpenBlock = () => {
    setOpenBlock(false);
  };
  return (
    <div>
      <NavbarScreen />
      <Container style={{ marginTop: "105px", marginBottom: "100px" }}>
        <Row className="mb-5">
          <Col sm={4}>
            <img
              src="https://jes.edu.vn/wp-content/uploads/2017/10/h%C3%ACnh-%E1%BA%A3nh.jpg"
              alt=""
              style={{ width: "100%", height: "538px" }}
            ></img>
          </Col>
          <Col className="d-flex flex-column justify-content-evenly " sm={8}>
            <div
              className="d-flex flex-row  justify-content-end "
              style={{
                height: "100%",
                backgroundColor: "antiquewhite",
                position: "relative",
              }}
            >
              <div
                style={{
                  transform: "rotate(-90deg)",
                  display: "flex",
                  alignItems: "center",
                  position: "absolute",
                  left: "-65px",
                  bottom: "235px",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: "65px",
                      fontWeight: "900",
                      borderBottom: "1px solid",
                      paddingBottom: "30px",
                      textTransform: "uppercase",
                      fontFamily: "Bakbak One",
                    }}
                  >
                    About me
                  </div>
                </div>
              </div>
              <div
                className="d-flex justify-content-evenly flex-column"
                style={{
                  width: "73%",
                  paddingLeft: "25px",
                  paddingRight: "25px",
                }}
              >
                <div className="d-flex justify-content-between align-items-center mt-5 mb-3 me-5">
                  {" "}
                  <h2
                    className="me-2"
                    title={emailauthor}
                    style={{ color: "brown" }}
                  >
                    Name: {author}
                  </h2>
                  {email === emailauthor ? (
                    <div>
                      <button
                        style={{
                          background: "transparent",
                          border: "none",
                          display: "block",
                        }}
                        onClick={() => {
                          setOpenBlock(true);
                        }}
                      >
                        <FontAwesomeIcon icon={faCog} size="lg" />
                      </button>
                      <ListUserBlocked
                        showUserBlocked={{
                          ChangeOpenBlock,
                          useOpenBlock,
                          email,
                        }}
                      />
                    </div>
                  ) : (
                    <div>
                      <button
                        style={{
                          background: "transparent",
                          border: "none",
                          position: "relative",
                          display: "block",
                        }}
                        onClick={() => {
                          setOpenBlock(!useOpenBlock);
                        }}
                      >
                        <FontAwesomeIcon icon={faCog} size="lg" />
                      </button>
                      <div
                        style={{
                          width: "150px",
                          padding: "15px",
                          position: "absolute",
                          fontWeight: "900",
                          color: "red",
                          right: "8px",
                          textAlign: "center",
                          display: useOpenBlock ? "block" : "none",
                        }}
                        className="btnBlock"
                        onClick={handleClickBlock}
                      >
                        Block
                      </div>
                    </div>
                  )}
                </div>
                <Row
                  style={{
                    fontSize: "larger",
                    borderBottom: "1px solid brown",
                  }}
                  className="pb-3"
                >
                  <Col style={{ color: "brown" }}>Posts: {inForUser.posts}</Col>
                  <Col style={{ color: "brown" }}>Views: {inForUser.views}</Col>
                  <Col style={{ color: "brown" }}>
                    Coments: {inForUser.comments}
                  </Col>
                </Row>

                <div
                  style={{
                    textAlign: "start",
                    marginTop: "15px",
                    paddingBottom: "15px",
                  }}
                >
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took
                  <br />
                  <br /> but also the leap into electronic typesetting,
                  remaining essentially unchanged. It was popularised in the
                  1960s with the release of Letraset sheets containing Lorem
                  Ipsum passages
                  <br />
                  <br /> but also the leap into electronic typesetting,
                  remaining essentially unchanged. It was popularised in the
                  1960s with the release of Letraset sheets containing Lorem
                  Ipsum passages, and more recently with desktop publishing
                  software like Aldus PageMaker including versions of Lorem
                  Ipsum.
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <div
          style={{
            backgroundColor: "#f1f1f1",
            padding: "45px 130px",
            fontFamily: "'Cedarville Cursive'",
            textAlign: "center",
            lineHeight: "2.5rem",
            fontSize: "21px",
          }}
        >
          {/* <FontAwesomeIcon icon={faQuoteLeft} className="me-3" /> Lorem Ipsum is */}
          " simply dummy text of the printing and typesetting industry. Lorem
          Ipsum has been the industry's standard dummy text ever since the
          1500s, when an unknown printer took "
          {/* <FontAwesomeIcon icon={faQuoteRight} className="ms-3" /> */}
        </div>
        <div>
          <h1 className="mt-5 text-center">
            {" "}
            {email === emailauthor ? "My Posts" : `${author}' Posts`}
          </h1>
          <Userposts InforUser={{ setInforUser, emailauthor }} />
        </div>
      </Container>
      <FooterScreen />
    </div>
  );
}
