import { addDoc, collection, getDocs, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import { AuthContext } from "../Context/AuthProvider";
import BoxChat from "./BoxChat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
export default function ListUsers() {
  const [appear, Setappear] = useState(false);
  const { email } = useContext(AuthContext);
  const [blacklist, setBlacklist] = useState([]);
  const [arrayBoxChat, setArrayBoxChat] = useState([]);
  const [listusers, setListusers] = useState([]);
  const [existedNotic, setExistedNotic] = useState(false);
  const [MapUsers, setMapUsers] = useState([]);
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "users"), (res) => {
      let newlistusers = [];
      let newblacklist = [];
      res.docs.forEach((doc) => {
        newlistusers.push({
          email: doc.data().email,
          username: doc.data().displayName,
        });
        if (doc.data().email === email) {
          if (doc.data().blacklist) {
            doc.data().blacklist.forEach((blackuser) => {
              newblacklist.push(blackuser);
            });
          }
        }
        if (doc.data().blacklist && doc.data().blacklist.includes(email)) {
          newblacklist.push(doc.data().email);
        }
      });
      setBlacklist(newblacklist);
      setListusers(newlistusers);
    });

    return () => {
      unsubscribe();
    };
  }, [email, setListusers, setBlacklist]);
  const handleClick = async (emailchat, username) => {
    let isExist = false;
    if (arrayBoxChat) {
      arrayBoxChat.forEach((boxchat) => {
        if (boxchat.emailchat === emailchat) {
          isExist = true;
        }
      });
    }
    if (arrayBoxChat.length >= 4) {
      arrayBoxChat.shift();
      setArrayBoxChat(arrayBoxChat);
    }
    if (!isExist) {
      setArrayBoxChat([...arrayBoxChat, { emailchat, username }]);
    }

    let boxchatexsited = false;
    const querySnapshot = await getDocs(collection(db, "messagegroups"));
    querySnapshot.forEach((doc) => {
      if (
        doc.data().emails.includes(emailchat) &&
        doc.data().emails.includes(email)
      ) {
        boxchatexsited = true;
      }
    });
    if (!boxchatexsited) {
      await addDoc(collection(db, "messagegroups"), {
        emails: [emailchat, email],
        messages: [],
      });
    }
  };

  const filterArrayBoxChat = (emailendtask) => {
    const newArrayBoxChat = arrayBoxChat.filter(
      (boxchat) => boxchat.emailchat !== emailendtask
    );

    setArrayBoxChat(newArrayBoxChat);
  };
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "messagegroups"), (res) => {
      let mapUsers = [];
      let newMapUsers = listusers;
      let effectNotice = false;
      res.docs.forEach(async (mess) => {
        if (mess.data().emails.includes(email)) {
          let countSeen = 0;

          if (mess.data().messages) {
            mess.data().messages.forEach((message) => {
              if (message.email !== email) {
                if (message.seen === false) {
                  countSeen += 1;
                  effectNotice = true;
                }
              }
            });
          }
          const FilterEmail = mess
            .data()
            .emails.filter((emailuser) => emailuser !== email);
          const useremail = FilterEmail.toString();

          mapUsers = newMapUsers.map((user) =>
            user.email === useremail && countSeen > 0
              ? { ...user, countSeen }
              : user
          );
          newMapUsers = mapUsers;
        }
      });
      if (mapUsers.length === 0) {
        setMapUsers(listusers);
      } else {
        setMapUsers(mapUsers);
      }

      setExistedNotic(effectNotice);
    });

    return () => {
      unsubscribe();
    };
  }, [email, listusers]);

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
      className={existedNotic ? "effectNotice" : ""}
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
          cursor: "pointer",
        }}
        onClick={() => {
          Setappear(!appear);
          setExistedNotic(false);
        }}
      >
        <div style={{ fontSize: "larger", color: "white" }}>ChatBox</div>
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
        {MapUsers &&
          MapUsers.map((user, index) => {
            if (user.email !== email && !blacklist.includes(user.email)) {
              return (
                <div
                  key={index}
                  className="d-flex justify-content-between p-3 userinlist"
                  style={{
                    borderBottom: "1px solid #d1d1d1",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    handleClick(user.email, user.username);
                  }}
                >
                  <div
                    title={`${user.email}`}
                    className={user.countSeen && "haveNotic"}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <div>{user.username} </div>
                    {user.countSeen && (
                      <div>
                        <span className="me-3">{user.countSeen}</span>{" "}
                        <FontAwesomeIcon
                          icon={faCircle}
                          style={{ color: "blue" }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            }
          })}
      </div>
      <div>
        {arrayBoxChat.map((infor, index) => (
          <BoxChat
            space={index}
            infor={infor}
            key={infor.emailchat}
            filterArrayBoxChat={filterArrayBoxChat}
          />
        ))}
      </div>
    </div>
  );
}
