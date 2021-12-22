import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  onSnapshot,
  updateDoc,
} from "@firebase/firestore";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@restart/ui/esm/Button";
import React, { useState, useEffect, useContext, useCallback } from "react";
import { ListGroup } from "react-bootstrap";
import { db } from "../../firebase/firebase";
import { AuthContext } from "../Context/AuthProvider";
import { MentionsInput, Mention } from "react-mentions";
import { useNavigate } from "react-router";
import { nanoid } from "nanoid";

export default function CommentScreen({ info }) {
  const { idpost, namepost, views } = info;
  const { displayName, email } = useContext(AuthContext);
  const [comment, setComment] = useState("");
  const [iduserstagged, SetIduserstagged] = useState();
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([]);
  const [upComment, setupComment] = useState("");
  const [blacklists, setBlacklists] = useState([]);
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "posts"), (res) => {
      let commentsUser = [];
      for (let i = 0; i < res.docs.length; i++) {
        if (res.docs[i].id === idpost) {
          if (res.docs[i].data().comments) {
            res.docs[i].data().comments.forEach((commentuser) => {
              if (
                !blacklists.some((blackuser) => blackuser === commentuser.email)
              ) {
                commentsUser.push(commentuser);
              }
            });
            setComments(commentsUser);
          }
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, [idpost, blacklists]);
  const handleOnClick = async () => {
    var currentdate = new Date();
    var datetime =
      currentdate.getHours() +
      ":" +
      currentdate.getMinutes() +
      " " +
      currentdate.getDate() +
      "/" +
      (currentdate.getMonth() + 1) +
      "/" +
      currentdate.getFullYear();
    if (comment) {
      try {
        setComment("");
        await updateDoc(doc(db, "posts", idpost), {
          comments: arrayUnion({
            email: email,
            comment: upComment,
            username: displayName,
            iduserstagged: iduserstagged,
            creAt: datetime,
          }),
        });
        if (iduserstagged) {
          iduserstagged.forEach(async (emailtagged) => {
            const querySnapshot = await getDocs(collection(db, "users"));
            querySnapshot.forEach(async (user) => {
              if (user.data().email === emailtagged) {
                const washingtonRef = doc(db, "users", `${user.id}`);
                await updateDoc(washingtonRef, {
                  tagged: arrayUnion({
                    username: displayName,
                    creAt: datetime,
                    checkSeen: false,
                    idpost: idpost,
                    namepost,
                    views,
                    id: nanoid(),
                  }),
                });
              }
            });
          });
        }
      } catch (e) {
        console.log(e.messeger);
      }
    }
  };

  useEffect(() => {
    async function FetchData() {
      let arrayUsers = [];
      let blacklist = [];

      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
        if (doc.data().email === email) {
          if (doc.data().blacklist) {
            doc
              .data()
              .blacklist.forEach((blackuser) => blacklist.push(blackuser));
          }
        }
        if (doc.data().blacklist) {
          doc.data().blacklist.forEach((blackuser) => {
            if (blackuser === email) {
              blacklist.push(doc.data().email);
            }
          });
        }
      });

      querySnapshot.forEach((doc) => {
        if (
          doc.data().email !== email &&
          !blacklist.some((blackuser) => doc.data().email === blackuser)
        ) {
          arrayUsers.push({
            display: doc.data().displayName,
            id: doc.data().email,
          });
        }
      });

      setBlacklists(blacklist);
      setUsers(arrayUsers);
    }
    FetchData();
  }, [email]);

  const renderUserSugestion = useCallback(
    (user) => (
      <ListGroup.Item className="suggestion-user">
        {`${user.display} (${user.id})`}
      </ListGroup.Item>
    ),
    []
  );

  const loadComment = (comment) => {
    return <div>{comment}</div>;
  };
  const navigate = useNavigate();
  return (
    <div>
      <h3 className="my-5">Comments</h3>
      {comments.length === 0 ? (
        <div>Chua co binh luan nao</div>
      ) : (
        <ListGroup
          variant="flush"
          style={{ maxHeight: "328px", overflow: "auto" }}
        >
          <ListGroup>
            {comments.map((comment, index) => (
              <ListGroup.Item
                key={index}
                className="d-flex justify-content-between align-items-start mb-3 border border-1 rounded-pill w-50"
              >
                <div className="ms-2 me-auto">
                  <div
                    className="fw-bold"
                    title={comment.email}
                    onClick={() => {
                      navigate("/userpage", {
                        state: {
                          emailauthor: comment.email,
                          author: comment.username,
                        },
                      });
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    {comment.username}
                  </div>
                  {loadComment(comment.comment)}
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </ListGroup>
      )}
      <div className="mt-3 w-50">
        <MentionsInput
          value={comment}
          onChange={(e, newValue, newPlainTextValue, mentions) => {
            let newMentions = [];
            mentions.forEach((mention) => {
              newMentions.push(mention.id);
            });
            SetIduserstagged(newMentions);
            setupComment(newPlainTextValue);
            setComment(newValue);
          }}
          style={{ height: "100px" }}
          placeholder="Comments"
          className="commenttextarea"
        >
          <Mention
            markup="@(__id__)<%=__display___ %> "
            trigger="@"
            data={users}
            renderSuggestion={renderUserSugestion}
            appendSpaceOnAdd={true}
            style={{ backgroundColor: "#b0d0e9" }}
            displayTransform={(id, display) => `@${display}`}
          />
        </MentionsInput>
        <Button
          type="submit"
          className="btn btn-primary float-end mt-2 mb-5"
          onClick={() => {
            handleOnClick();
          }}
        >
          Send <FontAwesomeIcon icon={faPaperPlane} className="ms-2" />
        </Button>
      </div>
    </div>
  );
}
