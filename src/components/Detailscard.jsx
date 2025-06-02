import React, { useEffect, useState } from "react";

function Detailscard({ id, type }) {
  const [item, setItem] = useState(null);
  const API_KEY = import.meta.env.VITE_APP_API_KEY;

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/${type}/${id}?api_key=${API_KEY}&language=en-US`)
      .then((res) => res.json())
      .then((data) => setItem(data))
      .catch((err) => console.error(err));
  }, [id, type, API_KEY]);

  if (!item) return <div className="text-center mt-5">Loading...</div>;

  const starCount = Math.round(item.vote_average / 2);
  const ratingStars = Array.from({ length: 5 }, (_, i) => (
    <span key={i} style={{ color: i < starCount ? "#FFD700" : "#ccc" }}>★</span>
  ));

  return (
    <div className="row">
      {/* Poster */}
      <div className="col-md-3">
        <img
          src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
          alt={type === "movie" ? item.title : item.name}
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

      {/* Details */}
      <div className="col-md-8">
        <h2>{type === "movie" ? item.title : item.name}</h2>
        <p>{type === "movie" ? item.release_date : item.first_air_date}</p>
        <h2 className="mb-3">{ratingStars}</h2>
        <h4>{item.overview}</h4>

        {/* Genres */}
        <div className="mb-3">
          {item.genres?.map((genre) => (
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
          {item.production_companies?.map((company) =>
            company.logo_path ? (
              <img
                key={company.id}
                src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                alt={company.name}
                title={company.name}
                style={{
                  maxHeight: "100px",
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
        {item.imdb_id && (
          <div className="mb-3">
            <a
              href={`https://www.imdb.com/title/${item.imdb_id}`}
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