import React, { useState } from "react";
import BoxChat from "./BoxChat";

export default function ListUsers() {
  const [appear, Setappear] = useState(false);
  const handleDissapearUsers = () => {
    Setappear(!appear);
  };
  let arrayBoxChat = [
    { username: "Long" },
    { username: "Ba Long" },
    { username: "Do Ba Long" },
    { username: "An Nguyen" },
  ];
  return (
    <div
      style={{
        backgroundColor: "white",
        position: "fixed",
        bottom: "5px",
        right: "5px",
        width: "300px",
        boxShadow: "0px 0px 20px 10px",
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
        <div style={{ fontSize: "larger" }}>ChatBox</div>
        <div
          style={{
            fontWeight: "900",
            width: "25px",
            height: "5px",
            backgroundColor: "black",
            position: "absolute",
            right: "20px",
            cursor: "pointer",
          }}
          onClick={handleDissapearUsers}
        ></div>
      </div>
      <div
        style={{
          maxHeight: "400px",
          paddingTop: "10px",
          paddingBottom: "20px",
          minHeight: "400px",
          overflowY: "auto",
          display: appear ? "block" : "none",
        }}
      >
        <div
          className="d-flex justify-content-between p-3"
          style={{ borderBottom: "1px solid #d1d1d1" }}
        >
          <div>Users 1</div>
          <div>Online</div>
        </div>
        <div
          className="d-flex justify-content-between p-3"
          style={{ borderBottom: "1px solid #d1d1d1" }}
        >
          <div>Users 1</div>
          <div>Online</div>
        </div>
        <div
          className="d-flex justify-content-between p-3"
          style={{ borderBottom: "1px solid #d1d1d1" }}
        >
          <div>Users 1</div>
          <div>Online</div>
        </div>
        <div
          className="d-flex justify-content-between p-3"
          style={{ borderBottom: "1px solid #d1d1d1" }}
        >
          <div>Users 1</div>
          <div>Online</div>
        </div>
      </div>
      <div>
        {arrayBoxChat.map((infor, index) => (
          <BoxChat space={index} username={infor} />
        ))}
        {/* <BoxChat space={1} />
        <BoxChat space={2} />
        <BoxChat space={3} />
        <BoxChat space={4} /> */}
      </div>
    </div>
  );
}
