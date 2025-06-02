// pages/Mainpage.js
import React, { useState,useEffect, useContext } from "react";
import { useSelector , useDispatch } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import ListCard from "../components/ListCards";
import LangContext from "../context/lang";
import { fetchData } from "../store/slicers/apiSlicer";

function Mainpage() {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.api.data);
  const { lang } = useContext(LangContext);
  const [wishlist, setWishlist] = useState({});
  const [type, setType] = useState("movie");
    useEffect(() => {
    dispatch(fetchData({
      type,
      customParams: {
        language: lang,
      },
    }));
  }, [type,  lang, dispatch]);

  const toggleWishlist = (id) => {
    setWishlist((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="container mt-4">
      <div className="text-center mb-4">
        <h5>{type === "movie" ? "Best Movies" : "Best TV Shows"}</h5>
        <h1>World’s Best {type === "movie" ? "Movies" : "TV Shows"}</h1>

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

      <ListCard 
        movies={movies} 
        wishlist={wishlist} 
        toggleWishlist={toggleWishlist} 
      />
    </div>
  );
}

export default Mainpage;
