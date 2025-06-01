import React from "react";
import {
  Button,
  Container,
  Form,
  Navbar,
  Nav,
  NavDropdown,
} from "react-bootstrap";
import LangContext from "../context/lang";
import { useContext } from "react";
export default function Header() {
  const { lang, setLang } = useContext(LangContext);

  const handleSelect = (langCode) => {
    console.log(lang);
    setLang(langCode);
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
          <NavDropdown title={lang} id="basic-nav-dropdown">
            <NavDropdown.Item onClick={() => handleSelect("en")}>
              English
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => handleSelect("ar")}>
              Arabic
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => handleSelect("fr")}>
              French
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => handleSelect("zh")}>
              Chinese
            </NavDropdown.Item>
          </NavDropdown>
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
