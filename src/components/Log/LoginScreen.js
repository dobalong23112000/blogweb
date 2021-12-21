import React, { useState } from "react";

import { Row, Col, Container, Form, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { signInWithEmailAndPassword } from "@firebase/auth";

export default function LoginScreen() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState("");
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setisLoading(true);
    try {
      await signInWithEmailAndPassword(auth, user.email, user.password);
      setTimeout(() => {
        setisLoading(false);
        navigate("/home");
      }, 1000);
    } catch (e) {
      setisLoading(false);
      setError("Email or password is incorrect");
    }
  };
  const handleOnChange = (e) => {
    setUser((user) => {
      return { ...user, [e.target.name]: e.target.value };
    });
  };
  return (
    <div>
      {isLoading ? (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spinner
            animation="border"
            role="status"
            style={{ backgroundColor: "white" }}
          >
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <div style={{ backgroundColor: "antiquewhite" }}>
          <Container
            style={{
              height: "100vh",
            }}
            className="d-flex justify-content-center align-items-center"
          >
            <Row
              style={{
                alignItems: "center",
                width: "100%",

                height: "600px",
                boxShadow: "0 0 10px 10px #d1d1d1",
                backgroundColor: "white",
              }}
            >
              <Col
                className="d-flex align-items-center justify-content-center"
                style={{
                  borderRight: "2px solid #0000004f",
                  height: "100%",
                  backgroundImage: `url("https://cdn5.f-cdn.com/contestentries/1578585/21468461/5d62b49ac544b_thumb900.jpg")`,
                  backgroundSize: "cover",
                }}
              >
                <h2 style={{ color: "#362d2d", fontFamily: "cursive" }}>
                  Hello, Welcome to BlogW
                </h2>
              </Col>
              <Col className="px-5">
                <Form>
                  <h1 className="mb-3 text-center">Login</h1>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      name="email"
                      type="email"
                      placeholder="Enter email"
                      value={user.email}
                      onChange={handleOnChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={user.password}
                      onChange={handleOnChange}
                    />
                  </Form.Group>
                  <div className="my-3 font-weight-light  text-danger">
                    {error}
                  </div>
                  <div className="text-center d-grid gap-2">
                    <Button
                      variant="primary"
                      type="submit"
                      onClick={handleOnSubmit}
                    >
                      Login
                    </Button>
                  </div>
                </Form>
                <div className="text-center mt-3 d-grid gap-2">
                  <Button
                    variant="success"
                    onClick={() => {
                      navigate("/register");
                    }}
                  >
                    Register
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </div>
  );
}
