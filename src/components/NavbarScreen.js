import { signOut } from "@firebase/auth";
import { faBell, faChartLine } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@restart/ui/esm/Button";
import React, { useContext, useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useNavigate } from "react-router";
import { auth } from "../firebase/firebase";
import { AuthContext } from "./Context/AuthProvider";
import Notice from "./Notice";
export default function NavbarScreen() {
  const navigate = useNavigate();
  const [openModalNotice, SetopenModalNotice] = useState(false);
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };
  const handdleOpenNotice = (e) => SetopenModalNotice(!openModalNotice);
  const { displayName, email } = useContext(AuthContext);
  const [countSeen, setCountSeen] = useState(0);
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      className="position-fixed w-100 top-0"
      style={{ zIndex: "10", height: "80px" }}
    >
      <Container>
        <Navbar.Brand
          onClick={() => {
            navigate("/home");
          }}
        >
          Blog App
        </Navbar.Brand>

        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-end"
        >
          <Nav>
            <Navbar.Text
              style={{
                color: "white",
                fontWeight: "600",
                fontSize: "larger",
                cursor: "pointer",
              }}
              title={email}
              onClick={() => {
                navigate("/userpage", {
                  state: { emailauthor: email, author: displayName },
                });
              }}
            >
              Hello, {displayName}
            </Navbar.Text>
            <Button
              className="btn btn-info ms-5"
              onClick={() => {
                navigate("/statistic");
              }}
            >
              Statistics <FontAwesomeIcon icon={faChartLine} />
            </Button>
            <Button
              className={
                countSeen !== 0
                  ? "btn btn-light ms-5 checkSeen"
                  : "btn btn-light ms-5"
              }
              onClick={handdleOpenNotice}
              style={{ position: "relative" }}
              onBlur={(e) => {
                SetopenModalNotice(false);
              }}
            >
              Noti {countSeen}
              <FontAwesomeIcon icon={faBell} className="ms-2" />
              <Notice
                openModalNotice={openModalNotice}
                setCountSeen={setCountSeen}
              />
            </Button>

            <Button className="ms-3 btn btn-danger" onClick={handleLogout}>
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
