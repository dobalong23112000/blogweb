import React, { useEffect, useState } from "react";
import { Modal, ListGroup, Button } from "react-bootstrap";
import {
  collection,
  doc,
  updateDoc,
  arrayRemove,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

export default function ListUserBlocked({ showUserBlocked }) {
  const { ChangeOpenBlock, useOpenBlock, email } = showUserBlocked;
  const [idUser, setidUser] = useState();
  const [blacklist, setBlacklist] = useState([]);
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "users"), (docs) => {
      docs.forEach((doc) => {
        if (doc.data().email === email) {
          setBlacklist(doc.data().blacklist);
          setidUser(doc.id);
        }
      });
    });
    return () => {
      unsubscribe();
    };
  }, [email, setBlacklist, setidUser]);
  const handleUnBlock = async (blackuser) => {
    const userRef = doc(db, "users", `${idUser}`);
    await updateDoc(userRef, {
      blacklist: arrayRemove(`${blackuser}`),
    });
  };
  const handleCloseModal = () => ChangeOpenBlock();

  return (
    <Modal
      show={useOpenBlock}
      centered={true}
      className="modalListUserBlocked"
      keyboard={false}
      onHide={handleCloseModal}
      backdrop="static"
    >
      <Modal.Header closeButton={true}>
        <Modal.Title>Users Blocked</Modal.Title>
      </Modal.Header>

      <Modal.Body className="p-0">
        <ListGroup style={{ height: "230px", overflowY: "auto" }}>
          {blacklist && blacklist.length === 0 ? (
            <div className="p-3">No one blocked</div>
          ) : (
            blacklist.map((blackuser) => (
              <ListGroup.Item
                key={blackuser}
                style={{ border: "none", borderBottom: "1px solid #d1d1d1" }}
                className="d-flex justify-content-between align-items-center p-3"
              >
                <div>{blackuser}</div>
                <Button
                  variant="danger"
                  onClick={() => {
                    handleUnBlock(blackuser);
                  }}
                >
                  Unblock
                </Button>
              </ListGroup.Item>
            ))
          )}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
