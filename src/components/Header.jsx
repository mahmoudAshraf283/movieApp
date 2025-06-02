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
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../store/slicers/apiSlicer";
import { logout } from "../store/slicers/userSlice";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const { lang, setLang } = useContext(LangContext);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const handleSelect = (langCode) => {
    console.log(lang);
    setLang(langCode);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery) {
      dispatch(fetchData({
        type: "movie",
        customParams: {
          query: trimmedQuery,
          language: lang
        }
      }));
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <Navbar expand="lg" className="bg-warning">
      <Container fluid className="mx-3">
        <Navbar.Brand href="/" className="me-4">Movie App</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="justify-content-between">
          <div className="d-flex justify-content-center" style={{ flex: 1 }}>
            <Form className="d-flex" style={{ width: '30%' }} onSubmit={handleSearch}>
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
          </div>
          <Nav className="d-flex align-items-center">
            {isAuthenticated ? (
              <>
                <span className="mx-2">Welcome, {user?.username}</span>
                <Nav.Link href="/watchlist" className="mx-2">
                  <div className="icon d-flex">
                    <i className="bi bi-heart-fill mx-2"></i>
                    <span>Watchlist</span>
                  </div>
                </Nav.Link>
                <Button variant="outline-dark" onClick={handleLogout} className="mx-2">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="mx-2">Login</Nav.Link>
                <Nav.Link as={Link} to="/register" className="mx-2">Register</Nav.Link>
              </>
            )}
            <NavDropdown title={lang} id="basic-nav-dropdown" className="mx-2">
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
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
