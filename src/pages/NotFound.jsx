import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light text-center p-4">
      <h1 className="display-1 fw-bold text-primary">404</h1>
      <h2 className="mb-3">Page Not Found</h2>
      <p className="text-muted mb-4">
        Sorry, the page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link to="/" className="btn btn-primary px-4">
        Back to Home
      </Link>
    </div>
  );
}
