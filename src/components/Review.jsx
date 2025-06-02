import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Review({ id }) {
  const [reviews, setReviews] = useState([]);
  const API_KEY = "5fba6bb2cc761bb44d74da68b2bc3e5f";
  const navigate = useNavigate();

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${API_KEY}&language=en-US`
    )
      .then((res) => {
        if (!res.ok) {
          navigate("/not-found");
          throw new Error(`HTTP error: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setReviews(data.results);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        navigate("/not-found");
      });
  }, [id, navigate]);

  if (!reviews)
    return <div className="text-center mt-5">No reviews found.</div>;
  return (
    <section className="p-3 text-center text-lg-start">
      <div className="row d-flex justify-content-center">
        <div className="col-md-10">
          <h1>Review</h1>
          {reviews.map((review) => {
            const avatarPath = review.author_details.avatar_path;
            const isImage =
              avatarPath &&
              (avatarPath.endsWith(".jpg") ||
                avatarPath.endsWith(".jpeg") ||
                avatarPath.endsWith(".png") ||
                avatarPath.startsWith("/https") ||
                avatarPath.startsWith("/gravatar"));

            return (
              <div
                className="card mb-3 shadow-sm"
                key={review.id}
                style={{ padding: "10px", borderRadius: "12px" }}
              >
                <div className="card-body py-2 px-3">
                  <div className="row align-items-center">
                    <div className="col-lg-3 d-flex justify-content-center">
                      {isImage ? (
                        <img
                          src={
                            avatarPath.startsWith("/https")
                              ? avatarPath.slice(1)
                              : `https://image.tmdb.org/t/p/w200${avatarPath}`
                          }
                          alt={review.author}
                          style={{
                            width: "100px",
                            height: "100px",
                            borderRadius: "50%",
                            objectFit: "cover",
                            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            width: "100px",
                            height: "100px",
                            borderRadius: "50%",
                            backgroundColor: "#eee",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "0.75rem",
                            color: "#666",
                            textAlign: "center",
                            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                          }}
                        >
                          No image available
                        </div>
                      )}
                    </div>
                    <div className="col-lg-9 text-start">
                      <p
                        className="text-muted mb-2"
                        style={{ fontSize: "0.95rem" }}
                      >
                        {review.content.length > 300
                          ? review.content.slice(0, 300) + "..."
                          : review.content}
                      </p>
                      <p className="fw-bold mb-1">
                        <strong>{review.author}</strong>
                      </p>
                      <p
                        className="text-muted mb-0"
                        style={{ fontSize: "0.85rem" }}
                      >
                        Rating:{" "}
                        {review.author_details.rating
                          ? `${review.author_details.rating} / 10`
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Review;
