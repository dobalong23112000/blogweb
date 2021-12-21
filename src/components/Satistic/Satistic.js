import React, { useEffect, useState } from "react";
import FooterScreen from "../FooterScreen";
import NavbarScreen from "../NavbarScreen";
import BarCharSatistic from "./BarChartSatistic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire, faCog, faDatabase } from "@fortawesome/free-solid-svg-icons";
import DataBaseSatistic from "./DataBaseSatistic";
import TopLists from "./TopLists";
import PieChartDatabase from "./PieChartDatabase";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { Spinner } from "react-bootstrap";
export default function Satistic() {
  const [total, setToltal] = useState({
    posts: 0,
    views: 0,
    comments: 0,
  });
  const [posts, setPosts] = useState();
  const [getallposts, setGetallposts] = useState();
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "posts"), (docs) => {
      let numberposts = 0;
      let numbercomments = 0;
      let numberviews = 0;
      let allposts = [];
      docs.forEach((doc) => {
        numberposts += 1;
        numberviews += doc.data().views;
        numbercomments += doc.data().comments.length;
        allposts.push({ ...doc.data(), id: doc.id });
      });
      setToltal({
        posts: numberposts,
        comments: numbercomments,
        views: numberviews,
      });
      setGetallposts(allposts);
      allposts.sort((a, b) => b.views - a.views);
      let toplists = allposts.slice(0, 3);
      setPosts(toplists);
    });

    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <div>
      {!getallposts ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <div>
          <NavbarScreen />
          <div
            style={{ marginTop: "80px", paddingTop: "50px" }}
            className="container"
          >
            <h1
              className="mb-2 text-center"
              style={{ fontSize: "50px", fontWeight: "900" }}
            >
              STATISTICS
            </h1>

            {/* DataBase */}
            <div
              className="my-5"
              style={{
                borderBottom: "1px solid",
                paddingTop: "20px",
                borderTop: "1px solid",
              }}
            >
              <h2 className="mb-5">
                <FontAwesomeIcon icon={faDatabase} className="me-3" />
                DATABASE
              </h2>
              <DataBaseSatistic total={total} />
            </div>
            {/* Top Lists*/}
            <div style={{ borderBottom: "1px solid", paddingBottom: "30px" }}>
              <h2 className="mb-5" style={{ textTransform: "uppercase" }}>
                <FontAwesomeIcon icon={faFire} className="me-3" />
                Top 3 posts with the most views
              </h2>
              <TopLists posts={posts} />
            </div>
            {/* BarChart and PieChart */}
            <div className="my-5">
              <h2 className="mb-5">
                <FontAwesomeIcon icon={faCog} className="me-3" />
                SATISTIC FIGURATION
              </h2>
              <div className="d-flex align-items-end justify-content-between">
                <BarCharSatistic getallposts={getallposts} />
                <PieChartDatabase getallposts={getallposts} />
              </div>
            </div>
          </div>
          <FooterScreen />
        </div>
      )}
    </div>
  );
}
