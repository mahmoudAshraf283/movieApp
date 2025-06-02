import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWatchlist } from '../store/slicers/watchlistSlice';
import { useNavigate } from 'react-router-dom';

function WatchList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { movies, tvShows } = useSelector((state) => state.watchlist);
  const [activeTab, setActiveTab] = useState('movies');

  const handleRemove = (id, type) => {
    dispatch(removeFromWatchlist({ id, type }));
  };

  const handleItemClick = (id, type) => {
    navigate(`/movie/Details/${id}`, { state: { type } });
  };

  const renderItem = (item, type) => (
    <div
      key={item.id}
      className="card mb-3"
      style={{ cursor: 'pointer' }}
    >
      <div className="row g-0">
        <div className="col-md-2">
          <img
            src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
            alt={type === 'movie' ? item.title : item.name}
            className="img-fluid rounded-start"
            style={{ height: '100%', objectFit: 'cover' }}
            onClick={() => handleItemClick(item.id, type)}
          />
        </div>
        <div className="col-md-10">
          <div className="card-body d-flex justify-content-between align-items-center">
            <div>
              <h5 className="card-title" onClick={() => handleItemClick(item.id, type)}>
                {type === 'movie' ? item.title : item.name}
              </h5>
              <p className="card-text">
                <small className="text-muted">
                  {type === 'movie' ? item.release_date : item.first_air_date}
                </small>
              </p>
              <p className="card-text">{item.overview}</p>
            </div>
            <button
              className="btn btn-danger"
              onClick={() => handleRemove(item.id, type)}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">My Watchlist</h2>
      
      <div className="btn-group mb-4" role="group">
        <button
          className={`btn btn-${activeTab === 'movies' ? 'primary' : 'outline-primary'}`}
          onClick={() => setActiveTab('movies')}
        >
          Movies ({movies.length})
        </button>
        <button
          className={`btn btn-${activeTab === 'tv' ? 'primary' : 'outline-primary'}`}
          onClick={() => setActiveTab('tv')}
        >
          TV Shows ({tvShows.length})
        </button>
      </div>

      {activeTab === 'movies' ? (
        movies.length > 0 ? (
          movies.map(movie => renderItem(movie, 'movie'))
        ) : (
          <div className="text-center">
            <p>No movies in your watchlist</p>
          </div>
        )
      ) : (
        tvShows.length > 0 ? (
          tvShows.map(show => renderItem(show, 'tv'))
        ) : (
          <div className="text-center">
            <p>No TV shows in your watchlist</p>
          </div>
        )
      )}
    </div>
  );
}

export default WatchList;