import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Recommendations({ id, type }) {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const API_KEY = import.meta.env.VITE_APP_API_KEY;

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/${type}/${id}/recommendations?api_key=${API_KEY}&language=en-US`
        );
        const data = await response.json();
        setRecommendations(data.results || []);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [id, type, API_KEY]);

  if (loading) {
    return (
      <div className="text-center mt-4">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading recommendations...</span>
        </div>
      </div>
    );
  }

  if (recommendations.length === 0) {
    return (
      <div className="text-center mt-4">
        <h3>No recommendations available</h3>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <h3 className="mb-4">Recommended {type === "movie" ? "Movies" : "TV Shows"}</h3>
      <div className="d-flex flex-wrap gap-3">
        {recommendations.slice(0, 6).map((item) => (
          <div
            key={item.id}
            className="card"
            style={{
              width: "200px",
              cursor: "pointer",
              transition: "transform 0.2s",
            }}
            onClick={() => navigate(`/movie/Details/${item.id}`, { state: { type } })}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img
              src={
                item.poster_path
                  ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                  : "https://via.placeholder.com/200x300?text=No+Image"
              }
              className="card-img-top"
              alt={type === "movie" ? item.title : item.name}
              style={{ height: "300px", objectFit: "cover" }}
            />
            <div className="card-body">
              <h6 className="card-title text-truncate">
                {type === "movie" ? item.title : item.name}
              </h6>
              <div className="d-flex justify-content-between align-items-center">
                <small className="text-muted">
                  {type === "movie" ? item.release_date : item.first_air_date}
                </small>
                <small className="text-warning">⭐ {item.vote_average?.toFixed(1)}</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Recommendations;