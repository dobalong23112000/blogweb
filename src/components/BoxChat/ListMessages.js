import React, { useRef, useEffect, useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
export default function ListMessages({ infor, messages }) {
  const { email } = useContext(AuthContext);
  const ref = useRef(null);
  useEffect(() => {
    ref.current.scrollTop = ref.current.scrollHeight;
  }, []);

  return (
    <div style={{ height: "85%", overflowY: "auto" }} ref={ref}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "0 20px",
        }}
      >
        {messages &&
          messages.map((message, index) =>
            message.email === email ? (
              <div
                key={index}
                className="right-mess"
                title={`${message.email} creAt ${message.creAt}`}
              >
                <div>{message.message}</div>
              </div>
            ) : (
              <div
                key={index}
                className="left-mess"
                title={`${message.email} creAt ${message.creAt}`}
              >
                {message.message}
              </div>
            )
          )}
      </div>
    </div>
  );
}
