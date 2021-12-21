import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import NavbarScreen from "../NavbarScreen";
import { useLocation, useNavigate } from "react-router";
import FooterScreen from "../FooterScreen";
import { db } from "../../firebase/firebase";
import { addDoc, collection } from "@firebase/firestore";

export default function CreateNewPost() {
  const { state } = useLocation();
  const { displayname, email } = state;
  const navigate = useNavigate();
  const [newpost, setNewpost] = useState({
    namepost: "",
    author: displayname,
    topic: "",
    descriptionpost: "",
    content: "",
    image: "",
    emailauthor: email,
  });
  const [error, setError] = useState({
    namepost: "",
    author: "",
    topic: "",
    descriptionpost: "",
    content: "",
    image: "",
  });
  const handleChange = (e) => {
    setNewpost((newpost) => {
      return { ...newpost, [e.target.name]: e.target.value };
    });
  };

  const validate = () => {
    let isPassed = true;
    let message = {
      namepost: "",
      author: "",
      topic: "",
      descriptionpost: "",
      content: "",
      image: "",
    };
    for (const key in newpost) {
      if (!newpost[key]) {
        message[key] = `Please input ${key}`;
        isPassed = false;
      }
    }

    if (isPassed) {
      setError({
        namepost: "",
        author: "",
        topic: "",
        descriptionpost: "",
        content: "",
        image: "",
      });
    } else {
      setError({ ...message });
    }
    return isPassed;
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      await addDoc(collection(db, "posts"), {
        ...newpost,
        comments: [],
        views: 0,
      });
      navigate("/home");
    } else {
    }
  };
  return (
    <div>
      <NavbarScreen />
      <Container style={{ paddingTop: "100px", marginBottom: "50px" }}>
        <div>
          <h1>Create a new post</h1>
        </div>
        <Form>
          <Form.Group className="mb-3" controlId="formGridAuthor">
            <Form.Label>Author Name</Form.Label>
            <Form.Control value={newpost.author} disabled={true} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGridTopic">
            <Form.Label>Select one topic</Form.Label>
            <Form.Select
              aria-label="Default select example"
              value={newpost.topic}
              onChange={handleChange}
              name="topic"
            >
              <option value="">Open this select menu</option>
              <option value="Life Blog">Life Blog</option>
              <option value="Sport Blog">Sport Blog</option>
              <option value="Health Blog">Health Blog</option>
            </Form.Select>
            <div className="my-1 font-weight-light  text-danger">
              {error.topic}
            </div>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGridTitle">
            <Form.Label>Tilte</Form.Label>
            <Form.Control
              placeholder="Enter title post you want..."
              value={newpost.namepost}
              onChange={handleChange}
              name="namepost"
            />
            <div className="my-1 font-weight-light  text-danger">
              {error.namepost}
            </div>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGridTitle">
            <Form.Label>Link Image</Form.Label>
            <Form.Control
              placeholder="Enter link image post ..."
              value={newpost.image}
              onChange={handleChange}
              name="image"
            />
            <div className="my-1 font-weight-light  text-danger">
              {error.image}
            </div>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGridDescription">
            <Form.Label>Description post</Form.Label>
            <Form.Control
              placeholder="Let's describe this..."
              value={newpost.descriptionpost}
              onChange={handleChange}
              name="descriptionpost"
            />
            <div className="my-1 font-weight-light  text-danger">
              {error.descriptionpost}
            </div>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridContent">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Let's type post content ..."
              value={newpost.content}
              onChange={handleChange}
              name="content"
            />
            <div className="my-1 font-weight-light  text-danger">
              {error.content}
            </div>
          </Form.Group>
          <Button variant="primary" type="submit" onClick={handleOnSubmit}>
            Create a new post
          </Button>
        </Form>
      </Container>
      <FooterScreen />
    </div>
  );
}
