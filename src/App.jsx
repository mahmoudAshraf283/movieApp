// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import LangContext from "./context/lang";
import WatchList from "./pages/WatchList";
import Mainpage from "./pages/Mainpage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "./store/slicers/apiSlicer";
import { useEffect, useState } from "react";

function App() {
  const [lang, setLang] = useState("en");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData({ language: lang }));
  }, [dispatch, lang]);

  return (
    <div dir={lang === "ar" ? "rtl" : "ltr"}>
      <LangContext.Provider value={{ lang, setLang }}>
        <Header />
        <Routes>
          <Route path="/" element={<Mainpage />} />
          <Route path="/watchlist" element={<WatchList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </LangContext.Provider>
    </div>
  );
}

export default App;
