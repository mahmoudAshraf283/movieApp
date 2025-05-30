
import './App.css'
import {  useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "./store/slicers/apiSlicer";

function App() {



  const dispatch = useDispatch();
  const data = useSelector((state) => state.api.data);
  const loading = useSelector((state) => state.api.loading);
  const error = useSelector((state) => state.api.error);
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <>
    <div>
      <h1>Movie App</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <ul>
          {data.map((movie) => (
            <li key={movie.id}>
              <h2>{movie.title}</h2>
              <p><img src={import.meta.env.VITE_APP_POSTER_PATH + movie.poster_path} alt="" width={200}/></p>
            </li>
          ))}
        </ul>
      )}
    </div>
    </>
  )
}

export default App
