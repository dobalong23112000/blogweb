import Button from "@restart/ui/esm/Button";
import React from "react";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "./Context/AuthProvider";
export default function Banner() {
  const navigate = useNavigate();
  const { displayName, email } = useContext(AuthContext);
  const handleClickCreateNewPost = () => {
    navigate("/createnewpost", { state: { displayname: displayName, email } });
  };

  return (
    <div
      style={{
        width: "100%",
        backgroundImage: `url("https://images.pexels.com/photos/7063767/pexels-photo-7063767.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")`,
        height: "90vh",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        marginTop: "80px",
      }}
    >
      <div
        style={{ color: "white" }}
        className="d-flex justify-content-center align-items-center flex-column h-100"
      >
        <h1 className="mb-3" style={{ fontFamily: "sora" }}>
          Publish your passion, your way{" "}
        </h1>
        <h3 className="my-5 fst-italic fw-lighter">
          Create a unique and beatiful blog. It's easy and free
        </h3>
        <Button
          className="btn btn-primary mt-3 btn-lg rounded-pill"
          onClick={handleClickCreateNewPost}
        >
          Create a new blog
        </Button>
      </div>
    </div>
  );
}
