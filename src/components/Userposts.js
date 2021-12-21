import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/firebase";

export default function Userposts({ InforUser }) {
  const [posts, setDataposts] = useState([]);
  const { setInforUser, emailauthor } = InforUser;
  const navigate = useNavigate();
  useEffect(() => {
    let dataposts = [];
    let totalviews = 0;
    let totalcomments = 0;
    let totalposts = 0;
    async function FetchUserPosts() {
      const querySnapshot = await getDocs(collection(db, "posts"));
      querySnapshot.forEach((doc) => {
        if (doc.data().emailauthor === emailauthor) {
          dataposts.unshift({ ...doc.data(), idpost: doc.id });
          totalviews += doc.data().views;
          totalcomments += doc.data().comments.length;
          totalposts += 1;
        }
      });

      setInforUser({
        views: totalviews,
        comments: totalcomments,
        posts: totalposts,
      });
      setDataposts(dataposts);
    }

    FetchUserPosts();
  }, [emailauthor, setInforUser]);

  return (
    <div className="d-flex flex-wrap justify-content-between">
      {posts.map((post, index) => (
        <Card
          style={{
            width: "23rem",
            boxShadow: "0 0 15px 5px #d1d1d1",
          }}
          className="mt-5"
          key={index}
        >
          <Card.Img
            variant="top"
            src={post.image}
            style={{ height: "325px" }}
          />
          <Card.Body style={{ textAlign: "center" }}>
            <Card.Title
              style={{
                display: "-webkit-box",
                textOverflow: "ellipsis",
                overflow: "hidden",
                WebkitLineClamp: "1",
                WebkitBoxOrient: "vertical",
                fontWeight: "900",
                fontSize: "x-large",
                color: "rgb(67, 103, 156)",
              }}
            >
              {post.namepost}
            </Card.Title>
            <Card.Text
              style={{
                display: "-webkit-box",
                textOverflow: "ellipsis",
                overflow: "hidden",
                WebkitLineClamp: "3",
                WebkitBoxOrient: "vertical",
                minHeight: "72px",
                fontFamily: "sora",
              }}
            >
              {post.descriptionpost}
            </Card.Text>
            <div className="my-2">
              <FontAwesomeIcon icon={faEye} className="me-2" />
              Views: {post.views}
            </div>
            <div
              style={{
                fontStyle: "italic",
                fontWeight: "200",
                fontSize: "larger",
                paddingBottom: "15px",
                borderBottom: "1px solid",
              }}
              className="mb-2"
            >
              Author: {post.author}
            </div>
            <Button
              variant="primary"
              className="readmorebtn "
              onClick={async () => {
                const datapost = {
                  idpost: post.idpost,
                };
                navigate(`/postdetail`, {
                  state: {
                    ...datapost,
                  },
                });
                await updateDoc(doc(db, "posts", `${post.idpost}`), {
                  views: post.views + 1,
                });
              }}
              style={{ fontSize: "20px", marginTop: "15px" }}
            >
              Read more{" "}
              {/* <FontAwesomeIcon icon={faArrowRight} className="ms-2" /> */}
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}
