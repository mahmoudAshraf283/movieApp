import React, { useState } from "react";
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
import { useDispatch } from "react-redux";
import { fetchData } from "../store/slicers/apiSlicer";

export default function Header() {
  const { lang, setLang } = useContext(LangContext);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();

  const handleSelect = (langCode) => {
    console.log(lang);
    setLang(langCode);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery) {
      dispatch(fetchData({ query: trimmedQuery }));
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
  };

  return (
    <Navbar expand="lg" className="bg-warning">
      <Container fluid className="mx-3">
        <Navbar.Brand href="/">Movie App</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Form className="d-flex mx-auto" onSubmit={handleSearch}>
            <Form.Control
              type="search"
              placeholder="Search for exact movie titles..."
              className="me-2"
              aria-label="Search"
              value={searchQuery}
              onChange={handleInputChange}
            />
            <Button variant="dark" type="submit">Search</Button>
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
          <Nav.Link href="/watchlist">
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
