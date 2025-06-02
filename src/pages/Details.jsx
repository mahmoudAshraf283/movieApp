import React from "react";
import { useParams } from "react-router-dom";
import Detailscard from "../components/Detailscard";
import Review from "../components/Review";

function Details() {
  const { id } = useParams();

  return (
    <div className="container mt-5">
      <Detailscard id={id} />
      <hr></hr>
      <Review id={id} />
    </div>
  );
}

export default Details;