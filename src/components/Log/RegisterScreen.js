import React, { useState } from "react";
import { Container, Row, Form, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { auth } from "../../firebase/firebase";
import { validateEmail } from "../ultis";
import { createUserWithEmailAndPassword, updateProfile } from "@firebase/auth";
import { addDoc, collection } from "@firebase/firestore";
import { db } from "../../firebase/firebase";
export default function RegisterScreen() {
  const navigate = useNavigate();
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    let validation = validate();
    if (validation) {
      try {
        await createUserWithEmailAndPassword(auth, user.email, user.password);
        await updateProfile(auth.currentUser, {
          displayName: user.username,
        });
        await addDoc(collection(db, "users"), {
          displayName: user.username,
          email: user.email,
          password: user.password,
          blacklist: [],
          tagged: [],
        });
        navigate("/home");
      } catch (e) {
        setError((error) => {
          return { ...error, email: "Email is existed" };
        });
      }
    }
  };

  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
    confirmpassword: "",
  });
  const [error, setError] = useState({
    email: "",
    username: "",
    password: "",
    confirmpassword: "",
  });

  const handleOnChange = (e) => {
    setUser((user) => {
      return { ...user, [e.target.name]: e.target.value };
    });
  };
  const validate = () => {
    let messageError = {
      email: "",
      username: "",
      password: "",
      confirmpassword: "",
    };
    let isPassed = true;
    if (!validateEmail(user.email)) {
      messageError.email = "Email is incorrect";
      isPassed = false;
    }
    if (user.confirmpassword !== user.password) {
      messageError.confirmpassword = "Check password again";
      isPassed = false;
    }
    if (user.password.length < 6) {
      messageError.password = "minximum the password length is 6";
      isPassed = false;
    }
    if (!user.email) {
      messageError.email = "Please input your email";
      isPassed = false;
    }
    if (!user.password) {
      messageError.password = "Please input your password";
      isPassed = false;
    }
    if (!user.username) {
      messageError.username = "Please input your username";
      isPassed = false;
    }
    if (!user.confirmpassword) {
      messageError.confirmpassword = "Please input your confirmpassword";
      isPassed = false;
    }

    if (isPassed) {
      setError({
        email: "",
        username: "",
        password: "",
        confirmpassword: "",
      });
    } else {
      setError({ ...messageError });
    }
    return isPassed;
  };
  return (
    <div style={{ backgroundColor: "antiquewhite" }}>
      <Container
        style={{ height: "100vh" }}
        className="d-flex align-items-center justify-content-center"
      >
        <Row
          style={{
            alignItems: "center",
            width: "100%",
          }}
        >
          <Col></Col>
          <Col
            className="p-3 "
            xs={6}
            style={{
              border: "2px solid #d1d1d1",
              boxShadow: "0 0 10px 10px #d1d1d1",
              backgroundColor: "white",
            }}
          >
            <Form>
              <h1 className="mb-3 text-center pt-3">Register</h1>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  name="email"
                  type="email"
                  placeholder="Enter email"
                  value={user.email}
                  onChange={handleOnChange}
                />
                <div className="my-1 font-weight-light  text-danger">
                  {error.email}
                </div>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>User name</Form.Label>
                <Form.Control
                  name="username"
                  type="text"
                  placeholder="Enter your name"
                  value={user.username}
                  onChange={handleOnChange}
                />
                <div className="my-1 font-weight-light  text-danger">
                  {error.username}
                </div>
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
                <div className="my-1 font-weight-light  text-danger">
                  {error.password}
                </div>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicConfirpassword">
                <Form.Label>Confirmation Password</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmpassword"
                  placeholder="Password again"
                  value={user.confirmpassword}
                  onChange={handleOnChange}
                />
                <div className="my-1 font-weight-light  text-danger">
                  {error.confirmpassword}
                </div>
              </Form.Group>

              <div className="text-center d-grid gap-2">
                <Button
                  variant="success"
                  type="submit"
                  onClick={handleOnSubmit}
                >
                  Register
                </Button>
              </div>
            </Form>
            <div className="text-center mt-3 d-grid gap-2">
              <Button
                variant="primary"
                onClick={(e) => {
                  navigate("/login");
                }}
              >
                Back to Login
              </Button>
            </div>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
}
