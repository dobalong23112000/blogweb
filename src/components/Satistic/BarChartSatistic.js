import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
let datefive = moment().format("DD/MM/YYYY");
let dateone = moment().subtract(4, "d").format("DD/MM/YYYY");
let datetwo = moment().subtract(3, "d").format("DD/MM/YYYY");
let datethree = moment().subtract(2, "d").format("DD/MM/YYYY");
let datefour = moment().subtract(1, "d").format("DD/MM/YYYY");

export default function BarCharSatistic({ getallposts }) {
  const [dataComments, setDataComments] = useState({
    dataone: 0,
    datathree: 0,
    datatwo: 0,
    datafour: 0,
    datafive: 0,
  });

  let data = [
    {
      name: `${dateone}`,
      comments: dataComments.dataone,
    },
    {
      name: `${datetwo}`,
      comments: dataComments.datatwo,
    },
    {
      name: `${datethree}`,
      comments: dataComments.datathree,
    },
    {
      name: `${datefour}`,
      comments: dataComments.datafour,
    },
    {
      name: `${datefive}`,
      comments: dataComments.datafive,
    },
  ];
  useEffect(() => {
    let numbercomment = {
      dataone: 0,
      datathree: 0,
      datatwo: 0,
      datafour: 0,
      datafive: 0,
    };
    if (getallposts) {
      getallposts.forEach((post) => {
        if (post.comments) {
          post.comments.forEach((comment) => {
            let datecomment = comment.creAt.slice(-10);
            if (datecomment === dateone) {
              numbercomment.dataone += 1;
            } else if (datecomment === datethree) {
              numbercomment.datathree += 1;
            } else if (datecomment === datetwo) {
              numbercomment.datatwo += 1;
            } else if (datecomment === datefour) {
              numbercomment.datafour += 1;
            } else if (datecomment === datefive) {
              numbercomment.datafive += 1;
            }
          });
        }
      });
    }
    setDataComments(numbercomment);
  }, [getallposts]);

  return (
    <div
      style={{
        display: "flex",
        height: "472px",
        backgroundColor: "#f1f1f1",
        alignItems: "flex-end",
        padding: "35px",
      }}
    >
      <LineChart
        width={800}
        height={400}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />

        <Line
          type="monotone"
          dataKey="comments"
          stroke="#82ca9d"
          strokeWidth={2}
        />
      </LineChart>
    </div>
  );
}
