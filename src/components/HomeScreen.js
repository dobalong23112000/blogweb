import { collection, onSnapshot } from "@firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Banner from "./Banner";

import FooterScreen from "./FooterScreen";
import NavbarScreen from "./NavbarScreen";
import Poststopic from "./Posts/Poststopic";
import { db } from "../firebase/firebase";
import { AuthContext } from "./Context/AuthProvider";
import ListUsers from "./BoxChat/ListUsers";
export default function HomeScreen() {
  const [posts, setPosts] = useState([]);
  const [blacklist, setBlacklist] = useState([]);
  const { email } = useContext(AuthContext);
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "posts"), (res) => {
      const arrayPost = [
        { nametopic: "Life Blog", posts: [] },
        { nametopic: "Sport Blog", posts: [] },
        { nametopic: "Health Blog", posts: [] },
      ];

      for (let i = 0; i < res.docs.length; i++) {
        arrayPost.forEach((element) => {
          if (element.nametopic === res.docs[i].data().topic) {
            if (
              !blacklist.some(
                (blackuser) => blackuser === res.docs[i].data().emailauthor
              )
            )
              element.posts.unshift({
                ...res.docs[i].data(),
                idpost: res.docs[i].id,
              });
          }
        });
      }

      setPosts(arrayPost);
    });

    return () => {
      unsubscribe();
    };
  }, [blacklist]);
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "users"), (res) => {
      res.forEach((doc) => {
        if (doc.data().email === email) {
          if (doc.data().blacklist) {
            doc
              .data()
              .blacklist.forEach((blackuser) =>
                setBlacklist((blacklist) => [...blacklist, blackuser])
              );
          }
        }
        if (doc.data().blacklist) {
          doc.data().blacklist.forEach((blackuser) => {
            if (blackuser === email) {
              setBlacklist((blacklist) => [...blacklist, doc.data().email]);
            }
          });
        }
      });
    });
    return () => {
      unsubscribe();
    };
  }, [email]);

  return (
    <div>
      <Banner />
      <NavbarScreen></NavbarScreen>
      <div
        style={{
          paddingBottom: "40px",
          fontFamily: "Libre Baskerville",
        }}
        id="content"
      >
        <Container>
          <div className="topics">
            {posts.map((topic, index) => (
              <Poststopic topic={topic} key={index} />
            ))}
          </div>
        </Container>
      </div>
      <ListUsers />
      <FooterScreen />
    </div>
  );
}
