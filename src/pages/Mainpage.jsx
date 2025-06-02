// pages/Mainpage.js
import React, { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import ListCard from "../components/ListCards";
import LangContext from "../context/lang";
import { fetchData } from "../store/slicers/apiSlicer";

function Mainpage() {
  const dispatch = useDispatch();
  const { data: movies, loading, error } = useSelector((state) => state.api);
  const { lang } = useContext(LangContext);
  const [type, setType] = useState("movie");

  // Map language codes to TMDB language codes
  const getLanguageCode = (lang) => {
    const languageMap = {
      en: "en-US",
      ar: "ar-SA",
      fr: "fr-FR",
      zh: "zh-CN"
    };
    return languageMap[lang] || "en-US";
  };

  useEffect(() => {
    dispatch(fetchData({
      type: type,
      customParams: {
        language: getLanguageCode(lang)
      }
    }));
  }, [type, lang, dispatch]);

  if (loading) {
    return (
      <div className="container mt-4 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4 text-center">
        <div className="alert alert-danger" role="alert">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="text-center mb-4">
        <h5>{type === "movie" ? "Best Movies" : "Best TV Shows"}</h5>
        <h1>World's Best {type === "movie" ? "Movies" : "TV Shows"}</h1>

        <div className="btn-group mt-3" role="group">
          <button
            className={`btn btn-${type === "movie" ? "primary" : "outline-primary"}`}
            onClick={() => setType("movie")}
          >
            Movies
          </button>
          <button
            className={`btn btn-${type === "tv" ? "primary" : "outline-primary"}`}
            onClick={() => setType("tv")}
          >
            TV Shows
          </button>
        </div>
      </div>

      {movies && movies.length > 0 ? (
        <ListCard 
          movies={movies} 
          type={type}
        />
      ) : (
        <div className="text-center">
          <p>No movies found. Please try a different search or category.</p>
        </div>
      )}
    </div>
  );
}

export default Mainpage;
