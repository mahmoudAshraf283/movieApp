import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  Container,
  Form,
  Navbar,
  Nav,
  NavDropdown,
} from "react-bootstrap";
import LangContext from "../context/lang";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../store/slicers/apiSlicer";
import { logout } from "../store/slicers/userSlice";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const { lang, setLang } = useContext(LangContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { movies, tvShows } = useSelector((state) => state.watchlist);
  const watchlistCount = movies.length + tvShows.length;

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

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 400); // 400ms debounce
    return () => clearTimeout(handler);
  }, [searchQuery]);

  useEffect(() => {
    const trimmedQuery = debouncedQuery.trim();
    if (trimmedQuery) {
      dispatch(fetchData({
        type: "movie",
        customParams: {
          query: trimmedQuery,
          language: lang
        }
      }));
    }
  }, [debouncedQuery, lang, dispatch]);

  return (
    <Navbar bg="light" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">Movie App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Form className="d-flex mx-auto" onSubmit={handleSearch}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchQuery}
              onChange={handleInputChange}
            />
            <Button variant="outline-success" type="submit">Search</Button>
          </Form>
          <Nav className="d-flex align-items-center">
            {isAuthenticated ? (
              <>
                <span className="mx-2">Welcome, {user?.username}</span>
                <Nav.Link as={Link} to="/watchlist" className="mx-2">
                  <div className="icon d-flex align-items-center">
                    <i className="bi bi-heart-fill mx-2"></i>
                    <span>Watchlist</span>
                    {watchlistCount > 0 && (
                      <span className="badge bg-danger ms-2">{watchlistCount}</span>
                    )}
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
