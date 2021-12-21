import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import ListMessages from "./ListMessages";
export default function BoxChat({ space, username }) {
  return (
    <div
      style={{
        backgroundColor: "white",
        position: "fixed",
        bottom: "5px",
        right: `${(space + 1) * 310 + 5}px`,
        width: "300px",

        zIndex: 5,
      }}
    >
      <div
        style={{
          height: "50px",
          background: "#0d6efd",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "0 30px",
          position: "relative",
        }}
      >
        <div style={{ fontSize: "larger" }}>{username.username}</div>
        <div
          style={{
            position: "absolute",
            right: "20px",
            cursor: "pointer",
          }}
        >
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </div>
      </div>
      <div
        style={{
          paddingTop: "10px",
          paddingBottom: "20px",
          height: "300px",
          overflowY: "auto",
          position: "relative",
        }}
      >
        <ListMessages />
        <div
          style={{
            position: "absolute",
            bottom: "5px",
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <input
            type={"text"}
            placeholder="Enter your message..."
            style={{
              width: "80%",
              marginRight: "10px",
              marginLeft: "10px",
              borderRadius: "20px",
              border: "1px solid",
              padding: "6px",
              paddingLeft: "15px",
            }}
          />
          <FontAwesomeIcon
            icon={faPaperPlane}
            size="lg"
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
    </div>
  );
}
