import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/firebase";
import { AuthContext } from "./Context/AuthProvider";
export default function Notice(props) {
  const { email } = useContext(AuthContext);
  const [noticeTag, setnoticeTag] = useState([]);
  const navigate = useNavigate();
  const { openModalNotice, setCountSeen } = props;
  const handleClick = async (tag) => {
    navigate(`/postdetail`, {
      state: {
        idpost: tag.idpost,
      },
    });

    async function updateViews() {
      await updateDoc(doc(db, "posts", `${tag.idpost}`), {
        views: tag.views + 1,
      });
    }
    updateViews();
    const washingtonRef = doc(db, "users", `${tag.iduser}`);
    const newtag = {
      usertagged: tag.username,
      namepost: tag.namepost,
      idpost: tag.idpost,
      views: tag.views,
      seen: true,
      creAt: tag.creAt,
      id: tag.id,
    };
    await updateDoc(washingtonRef, {
      tagged: arrayRemove({
        usertagged: tag.username,
        namepost: tag.namepost,
        idpost: tag.idpost,
        views: tag.views,
        seen: false,
        creAt: tag.creAt,
        id: tag.id,
      }),
    });
    await updateDoc(washingtonRef, {
      tagged: arrayUnion(newtag),
    });
  };
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "users"), (res) => {
      const newNotice = [];
      let countSeen = 0;
      res.docs.forEach((doc) => {
        if (doc.data().email === email) {
          if (doc.data().tagged) {
            doc.data().tagged.forEach((posttagged) => {
              newNotice.push({
                username: posttagged.usertagged,
                namepost: posttagged.namepost,
                idpost: posttagged.idpost,
                creAt: posttagged.creAt,
                views: posttagged.views,
                checkSeen: posttagged.seen,
                iduser: doc.id,
                id: posttagged.id,
              });
              if (!posttagged.seen) {
                countSeen += 1;
              }
            });
            setCountSeen(countSeen);
          }
        }
      });

      setnoticeTag(newNotice);
    });
    return () => {
      unsub();
    };
  }, [email, setCountSeen]);
  const RenderMessageTag = ({ username, namepost, creAt }) => {
    return (
      <div style={{ fontWeight: "200" }}>
        <span style={{ fontWeight: "900", fontStyle: "oblique" }}>
          {username}
        </span>{" "}
        tagged you in post : <br />
        <span style={{ fontWeight: "900" }}>{namepost}</span>
        <br />
        <div
          className="text-end"
          style={{ fontSize: "small", fontWeight: "lighter" }}
        >
          {creAt}
        </div>
      </div>
    );
  };
  return (
    <ListGroup
      className={openModalNotice ? "d-flex " : "d-none"}
      style={{
        position: "absolute",
        right: "0",
        top: "48px",
        width: "315px",
        zIndex: "20",
        border: "1px solid #d1d1d1",
        backgroundColor: "white",
        padding: "20px 0 50px 0",
        maxHeight: "309px",
        overflow: "auto",
      }}
    >
      <h3 className="text-start ps-4 pb-3">Notification</h3>
      {noticeTag.length === 0 ? (
        <div>No notification</div>
      ) : (
        noticeTag.map((tag, index) => {
          return (
            <ListGroup.Item
              key={index}
              onClick={(e) => {
                handleClick(tag);
              }}
              className={
                tag.checkSeen ? "modal-notice" : "modal-notice  checkSeen"
              }
              style={{
                borderLeft: "0px !important",
                borderRight: "0px !important",
              }}
            >
              {RenderMessageTag({
                username: tag.username,
                namepost: tag.namepost,
                creAt: tag.creAt,
              })}
            </ListGroup.Item>
          );
        })
      )}
    </ListGroup>
  );
}
