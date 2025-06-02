import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTowatchlist, removeFromwatchlist } from "../store/slicers/watchlistSlice";


import { useNavigate } from "react-router-dom";

function ListCard({ movies = [] }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get watchlist from Redux state as an object for quick lookup
  const watchlistArray = useSelector(state => state.watchList.data);
  const wishlist = {};
  watchlistArray.forEach(movie => {
    wishlist[movie.id] = true;
  });

  const [currentPage, setCurrentPage] = useState(1);

  const moviesPerPage = 10;
  const totalPages = Math.ceil(movies.length / moviesPerPage);
  const startIndex = (currentPage - 1) * moviesPerPage;
  const currentMovies = movies.slice(startIndex, startIndex + moviesPerPage);

  // toggle function: add or remove based on presence
  const toggleWishlist = (movie) => {
    if (wishlist[movie.id]) {
      dispatch(removeFromwatchlist(movie.id));
    } else {
      dispatch(addTowatchlist(movie));
    }
  };

  if (movies.length === 0) {
    return <p className="text-center mt-5">No movies available.</p>;
  }

  return (
    <>
      <div className="d-flex flex-wrap justify-content-start" style={{ gap: "1rem" }}>
        {currentMovies.map((movie) => (
          <div
            key={movie.id}
            className="card border-0"
            style={{
              width: "18%",
              minWidth: "150px",
              height: "320px",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                height: "280px",
                overflow: "hidden",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => navigate(`/movie/Details/${movie.id}`)}
            >
              <img
                className="card-img-top"
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "https://via.placeholder.com/220x320?text=No+Image"
                }
                alt={movie.title}
                style={{ maxHeight: "100%", width: "220px" }}
              />
            </div>

            <div className="card-body" style={{ flexGrow: 1, overflow: "hidden" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "0.5rem",
                }}
              >
                <h6
                  className="card-title"
                  style={{
                    fontSize: "1rem",
                    margin: 0,
                    flex: 1,
                    marginRight: "0.5rem",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}
                  title={movie.title}
                >
                  {movie.title}
                </h6>
                <span
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                  }}
                >
                  {movie.vote_average?.toFixed(1) || "N/A"} ⭐
                </span>
              </div>

              <div
                className="card-text"
                style={{
                  fontSize: "0.8rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>{movie.release_date || "N/A"}</span>
                <span
                  role="button"
                  onClick={() => toggleWishlist(movie)}
                  style={{
                    cursor: "pointer",
                    color: wishlist[movie.id] ? "red" : "black",
                    fontSize: "1.2rem",
                  }}
                  aria-label="Add to wishlist"
                >
                  {wishlist[movie.id] ? "❤️" : "♡"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-4">
        <nav>
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
              >
                Previous
              </button>
            </li>
            {[...Array(totalPages)].map((_, index) => (
              <li
                key={index}
                className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
              >
                <button className="page-link" onClick={() => setCurrentPage(index + 1)}>
                  {index + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default ListCard;
