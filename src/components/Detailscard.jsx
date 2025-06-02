import React, { useEffect, useState } from "react";

function Detailscard({ id }) {
  const [movie, setMovie] = useState(null);
  const API_KEY = "5fba6bb2cc761bb44d74da68b2bc3e5f";

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`)
      .then((res) => res.json())
      .then((data) => setMovie(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!movie) return <div className="text-center mt-5">Loading...</div>;

  const starCount = Math.round(movie.vote_average / 2);
  const ratingStars = Array.from({ length: 5 }, (_, i) => (
    <span key={i} style={{ color: i < starCount ? "#FFD700" : "#ccc" }}>★</span>
  ));

  return (
    <div className="row">
      {/* Poster */}
      <div className="col-md-3">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="img-fluid"
          style={{
            maxWidth: "100%",
            height: "100%",
            border: "4px solid",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)"
          }}
        />
      </div>

      {/* Movie Details */}
      <div className="col-md-8">
        <h2>{movie.title}</h2>
        <p>{movie.release_date}</p>
        <h2 className="mb-3">{ratingStars}</h2>
        <h4>{movie.overview}</h4>

        {/* Genres */}
        <div className="mb-3">
          {movie.genres?.map((genre) => (
            <span
              key={genre.id}
              style={{
                backgroundColor: "#FFD700",
                color: "#000",
                padding: "4px 10px",
                borderRadius: "12px",
                border: "1px solid #FFD700",
                marginRight: "8px",
                display: "inline-block",
                fontSize: "0.85rem"
              }}
            >
              {genre.name}
            </span>
          ))}
        </div>

        {/* Production Companies */}
        <div className="mb-3 d-flex flex-wrap gap-3">
          {movie.production_companies?.map((company) =>
            company.logo_path ? (
              <img
                key={company.id}
                src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                alt={company.name}
                title={company.name}
                style={{
                  maxHeight: "100px", // Adjustable size
                  objectFit: "contain",
                  padding: "5px",
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.15)"
                }}
              />
            ) : null
          )}
        </div>

        {/* IMDb Link Button */}
        {movie.imdb_id && (
          <div className="mb-3">
            <a
              href={`https://www.imdb.com/title/${movie.imdb_id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn d-inline-flex align-items-center gap-2"
              style={{
                border: "2px solid #FFD700",
                color: "",
                borderRadius: "20px",
                fontWeight: "bold"
              }}
            >
              IMDb Page <i className="bi bi-link-45deg"></i>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default Detailscard;