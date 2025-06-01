import "./App.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "./store/slicers/apiSlicer";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Header from "./components/Header";
import { useState } from "react";
import LangContext from "./context/lang";
import WatchList from "./pages/WatchList";

function App() {
  const dispatch = useDispatch();
  const [lang, setLang] = useState("en");
  const data = useSelector((state) => state.api.data);
  const loading = useSelector((state) => state.api.loading);
  const error = useSelector((state) => state.api.error);

  useEffect(() => {
    dispatch(fetchData({ language: lang }));
  }, [dispatch, lang]);
  return (
    <div dir={lang === "ar" ? "rtl" : "ltr"}>
      <LangContext.Provider value={{ lang, setLang }}>
        <Header />
      </LangContext.Provider>
    </div>
  );
}

export default App;
