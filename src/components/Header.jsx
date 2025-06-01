import React from "react";
import { Button, Container, Form, Navbar, Nav } from "react-bootstrap";
import LangContext from "../context/lang";
import { useContext } from "react";
export default function Header() {
  const { lang, setLang } = useContext(LangContext);
  const handleLangToggle = () => {
    setLang(lang === "EN" ? "AR" : "EN");
  };
  return (
    <Navbar expand="lg" className="bg-warning">
      <Container fluid className="mx-3">
        <Navbar.Brand to="/">Movie App</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Form className="d-flex mx-auto">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="dark">Search</Button>
          </Form>
          <Button onClick={handleLangToggle} variant="border-0 black">{lang}</Button>
          <Nav.Link>
            <div className="icon d-flex">
              <i className="bi bi-heart-fill mx-3 my-auto"></i>
              <p className="my-auto">Watchlist</p>
            </div>
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
