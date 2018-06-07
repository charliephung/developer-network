import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div>
      <h1>Sorry page not found</h1>
      <br />
      <Link to="/forum" className="btn btn-sm btn-dark">
        Go back to forum
      </Link>
    </div>
  );
};

export default NotFoundPage;
