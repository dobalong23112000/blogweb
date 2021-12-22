import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import ListMessages from "./ListMessages";
import { AuthContext } from "../Context/AuthProvider";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
export default function BoxChat({ space, infor, filterArrayBoxChat }) {
  const { username, emailchat } = infor;
  const [messages, setMessages] = useState([]);
  const handleEndtask = (emailendtask) => {
    filterArrayBoxChat(emailendtask);
  };
  const { email } = useContext(AuthContext);
  const [message, setMessage] = useState("");

  const handleSendMessage = async () => {
    var today = new Date();
    var date =
      today.getDate() +
      "/" +
      (today.getMonth() + 1) +
      "/" +
      today.getFullYear();

    var time = today.getHours() + ":" + today.getMinutes();
    var dateTime = date + " " + time;

    const querySnapshot = await getDocs(collection(db, "messagegroups"));
    querySnapshot.forEach(async (box) => {
      if (
        box.data().emails.includes(emailchat) &&
        box.data().emails.includes(email)
      ) {
        const washingtonRef = doc(db, "messagegroups", `${box.id}`);

        setMessage("");
        const MapMessages = box
          .data()
          .messages.map((informessage) =>
            informessage.email === emailchat && informessage.seen === false
              ? { ...informessage, seen: true }
              : informessage
          );
        await updateDoc(washingtonRef, {
          messages: MapMessages,
        });
        await updateDoc(washingtonRef, {
          messages: arrayUnion({
            email: email,
            creAt: dateTime,
            message: message,
            seen: false,
          }),
        });
      }
    });
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "messagegroups"), (res) => {
      res.docs.forEach(async (mess) => {
        if (
          mess.data().emails.includes(email) &&
          mess.data().emails.includes(emailchat)
        ) {
          setMessages(mess.data().messages);
        }
      });
    });
    async function FetchDataMessage() {
      const querySnapshot = await getDocs(collection(db, "messagegroups"));

      querySnapshot.docs.forEach(async (usermessage) => {
        if (
          usermessage.data().emails.includes(email) &&
          usermessage.data().emails.includes(emailchat)
        ) {
          if (usermessage.data().messages) {
            const mapUserMessage = usermessage
              .data()
              .messages.map((informessage) =>
                informessage.email !== email && informessage.seen === false
                  ? { ...informessage, seen: true }
                  : informessage
              );
            await updateDoc(doc(db, "messagegroups", `${usermessage.id}`), {
              messages: mapUserMessage,
            });
          }
        }
      });
    }
    FetchDataMessage();
    return () => {
      unsubscribe();
    };
  }, [email, emailchat, setMessages]);
  return (
    <div
      style={{
        backgroundColor: "white",
        position: "fixed",
        bottom: "5px",
        right: `${(space + 1) * 310 + 5}px`,
        width: "300px",

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
        <div
          style={{ fontSize: "larger", color: "white" }}
          title={`${emailchat}`}
        >
          {username}
        </div>
        <div
          style={{
            position: "absolute",
            right: "20px",
            cursor: "pointer",
          }}
        >
          <FontAwesomeIcon
            icon={faTimes}
            size="lg"
            onClick={() => {
              handleEndtask(emailchat);
            }}
          />
        </div>
      </div>
      <div
        style={{
          paddingTop: "10px",
          paddingBottom: "20px",
          height: "300px",
          overflowY: "auto",
          position: "relative",
        }}
      >
        <ListMessages infor={infor} messages={messages} />
        <div
          style={{
            position: "absolute",
            bottom: "5px",
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <input
            type={"text"}
            placeholder="Enter your message..."
            style={{
              width: "80%",
              marginRight: "10px",
              marginLeft: "10px",
              borderRadius: "20px",
              border: "1px solid",
              padding: "6px",
              paddingLeft: "15px",
            }}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <FontAwesomeIcon
            icon={faPaperPlane}
            size="lg"
            style={{ cursor: "pointer" }}
            onClick={handleSendMessage}
          />
        </div>
      </div>
    </div>
  );
}
