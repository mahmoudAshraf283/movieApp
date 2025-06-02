import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import ListCard from "../components/ListCards";
import { fetchData } from "../store/slicers/apiSlicer";

function Mainpage() {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.api.data);
  const loading = useSelector((state) => state.api.loading);
  const error = useSelector((state) => state.api.error);
  const [wishlist, setWishlist] = useState({});

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

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

      {loading && <p>Loading movies...</p>}
      {error && <p>Error: {error}</p>}

      {!loading && !error && (
        <ListCard 
          movies={movies} 
          wishlist={wishlist} 
          toggleWishlist={toggleWishlist} 
        />
      )}
    </div>
  );
}

export default Mainpage;
