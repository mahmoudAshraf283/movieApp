import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToWatchlist, removeFromWatchlist } from "../store/slicers/watchlistSlice";
import { useNavigate } from "react-router-dom";

function ListCard({ movies = [], type }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { movies: watchlistMovies, tvShows: watchlistTvShows } = useSelector((state) => state.watchlist);
  const { isAuthenticated } = useSelector((state) => state.user);

  const isInWatchlist = (id) => {
    if (type === 'movie') {
      return watchlistMovies.some(movie => movie.id === id);
    } else {
      return watchlistTvShows.some(show => show.id === id);
    }
  };

  const handleWatchlistToggle = (movie) => {
    if (isInWatchlist(movie.id)) {
      dispatch(removeFromWatchlist({ id: movie.id, type }));
    } else {
      dispatch(addToWatchlist({ item: movie, type }));
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 10;
  const totalPages = Math.ceil(movies.length / moviesPerPage);
  const startIndex = (currentPage - 1) * moviesPerPage;
  const currentMovies = movies.slice(startIndex, startIndex + moviesPerPage);

  if (!movies || movies.length === 0) {
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
              onClick={() => navigate(`/movie/Details/${movie.id}`, { state: { type } })}
            >
              <img
                className="card-img-top"
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "https://via.placeholder.com/220x320?text=No+Image"
                }
                alt={type === "movie" ? movie.title : movie.name}
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
                  title={type === "movie" ? movie.title : movie.name}
                >
                  {type === "movie" ? movie.title : movie.name}
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
                <span>{type === "movie" ? movie.release_date : movie.first_air_date}</span>
                {isAuthenticated && (
                  <button
                    className={`btn ${isInWatchlist(movie.id) ? 'btn-danger' : 'btn-outline-danger'}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleWatchlistToggle(movie);
                    }}
                  >
                    <i className={`bi bi-heart${isInWatchlist(movie.id) ? '-fill' : ''}`}></i>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
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
      )}
    </>
  );
}

export default ListCard;
