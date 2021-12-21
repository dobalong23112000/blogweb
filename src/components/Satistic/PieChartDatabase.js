import React, { useEffect, useState } from "react";

import { VictoryPie } from "victory";

export default function PieChartDatabase({ getallposts }) {
  const [percents, setPercents] = useState({
    lifetopic: 0,
    sporttopic: 0,
    healthtopic: 0,
  });
  useEffect(() => {
    if (getallposts) {
      let numberlifetopic = 0;
      let numbersporttopic = 0;
      let numberhealthtopic = 0;
      getallposts.forEach((post) => {
        if (post.topic === "Life Blog") {
          numberlifetopic += 1;
        } else if (post.topic === "Sport Blog") {
          numbersporttopic += 1;
        } else {
          numberhealthtopic += 1;
        }
      });
      setPercents({
        lifetopic: ((numberlifetopic / getallposts.length) * 100).toFixed(0),
        sporttopic: ((numbersporttopic / getallposts.length) * 100).toFixed(0),
        healthtopic: ((numberhealthtopic / getallposts.length) * 100).toFixed(
          0
        ),
      });
    }
  }, [getallposts]);
  let sampleData = [
    { name: ` ${percents.lifetopic}%`, value: parseInt(percents.lifetopic) },
    { name: ` ${percents.sporttopic}%`, value: parseInt(percents.sporttopic) },
    {
      name: ` ${percents.healthtopic}%`,
      value: parseInt(percents.healthtopic),
    },
  ];
  console.log(percents);
  return (
    <div className="d-flex flex-column">
      <VictoryPie
        colorScale={["gold", "cyan", "navy"]}
        data={sampleData}
        x="name"
        y="value"
        labelRadius={({ innerRadius }) => innerRadius + 20}
        innerRadius={70}
        style={{
          labels: {
            fill: "white",
            fontSize: 15,
            fontWeight: "bold",
          },
        }}
      />
      <div
        className="d-flex justify-content-around flex-column"
        style={{ paddingLeft: "35%" }}
      >
        <div className="d-flex">
          {" "}
          <div
            style={{ height: "20px", width: "20px", backgroundColor: "gold" }}
          ></div>
          <div className="ms-3">Life Blog</div>
        </div>
        <div className="d-flex">
          {" "}
          <div
            style={{ height: "20px", width: "20px", backgroundColor: "cyan" }}
          ></div>
          <div className="ms-3">Sport Blog</div>
        </div>
        <div className="d-flex">
          {" "}
          <div
            style={{ height: "20px", width: "20px", backgroundColor: "navy" }}
          ></div>
          <div className="ms-3">Health Blog</div>
        </div>
      </div>
    </div>
  );
}
