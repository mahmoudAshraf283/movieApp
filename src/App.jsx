// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import LangContext from "./context/lang";

import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "./store/slicers/apiSlicer";
import { useEffect, useState, lazy, Suspense } from "react";
import { loadUserWatchlist } from "./store/slicers/watchlistSlice";

const Mainpage = lazy(() => import("./pages/Mainpage"));
const WatchList = lazy(() => import("./pages/WatchList"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Details = lazy(() => import("./pages/Details"));
const NotFound = lazy(() => import("./pages/NotFound"));
function App() {
  const [lang, setLang] = useState("en");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  // Handle watchlist state when user changes
  useEffect(() => {
    if (user) {
      dispatch(loadUserWatchlist(user.email));
    }
  }, [user, dispatch]);

  useEffect(() => {
    dispatch(
      fetchData({
        type: "movie",
        customParams: {
          language: lang === "ar" ? "ar" : "en",
        },
      })
    );
  }, [dispatch, lang]);

  return (
    <div dir={lang === "ar" ? "rtl" : "ltr"}>
      <LangContext.Provider value={{ lang, setLang }}>
        <Header />
        <Suspense fallback={<div className="text-center mt-5">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Mainpage />} />
            <Route path="/watchlist" element={<WatchList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/movie/Details/:id" element={<Details />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </LangContext.Provider>
    </div>
  );
}

export default App;
