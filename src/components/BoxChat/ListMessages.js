import React, { useRef, useEffect } from "react";

export default function ListMessages() {
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
        <div className="right-mess">
          <div>Hello</div>
        </div>
        <div className="left-mess">Hello, too</div>
        <div className="right-mess">
          <div>How are u?</div>
        </div>
        <div className="left-mess">I'm fine tks</div>
        <div className="left-mess">I'm fine tks</div>
        <div className="left-mess">I'm fine tks</div>
        <div className="left-mess">I'm fine tks</div>
      </div>
    </div>
  );
}
