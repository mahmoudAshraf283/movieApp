// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import LangContext from "./context/lang";
import WatchList from "./pages/WatchList";
import Mainpage from "./pages/Mainpage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useDispatch } from "react-redux";
import { fetchData } from "./store/slicers/apiSlicer";
import { useEffect, useState } from "react";
import Details from "./pages/Details";

function App() {
  const [lang, setLang] = useState("en");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData({
      type: "movie",
      customParams: {
        language: lang === "ar" ? "ar-SA" : "en-US"
      }
    }));
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
          <Route path="/movie/Details/:id" element={<Details />} />
        </Routes>
      </LangContext.Provider>
    </div>
  );
}

export default App;
