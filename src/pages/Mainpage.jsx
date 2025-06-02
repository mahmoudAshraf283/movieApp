// pages/Mainpage.js
import React, { useState } from "react";
import { useSelector } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import ListCard from "../components/ListCards";

function Mainpage() {
  const movies = useSelector((state) => state.api.data);
  const [wishlist, setWishlist] = useState({});

  const toggleWishlist = (id) => {
    setWishlist((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="container mt-4">
      <div className="text-center mb-4">
        <h5>Best Movies</h5>
        <h1>World’s Best Movies</h1>
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
