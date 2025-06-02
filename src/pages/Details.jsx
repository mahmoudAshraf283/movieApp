import React from "react";
import { useParams, useLocation } from "react-router-dom";
import Detailscard from "../components/Detailscard";
import Review from "../components/Review";
import Recommendations from "../components/Recommendations";

function Details() {
  const { id } = useParams();
  const location = useLocation();
  const type = location.state?.type || "movie"; // Get type from location state, default to movie

  return (
    <div className="container mt-5">
      <Detailscard id={id} type={type} />
      <hr />
      <Review id={id} />
      <hr />
      <Recommendations id={id} type={type} />
    </div>
  );
}

export default Details;