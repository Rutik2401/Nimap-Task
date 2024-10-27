import axios from 'axios';
import "../Styles/TopRated.css";
import React, { useEffect, useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader'; 
import { Outlet, useNavigate } from 'react-router-dom';
const PopularMovies = ({ searchResults, movieName }) => {
  let navigate = useNavigate();

  const [popularMovies, setPopularMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const getPopular = () => {
    setLoading(true);
    axios.get("https://api.themoviedb.org/3/movie/popular?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&page=1")
      .then((res) => {
        console.log(res.data);
        setPopularMovies(res.data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getPopular();
  }, []);

 
  const moviesToDisplay = movieName ? searchResults : popularMovies;

  const handleMovieClick = (movieId) => {
    navigate(`/details/${movieId}`); 
  };

  return (
    <div className="container-fluid top-wrapper">
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
          <ClipLoader color="#36d7b7" size={100} />
        </div>
      ) : (
        <div className="AllMovies d-flex gap-3 flex-wrap">
          {moviesToDisplay.map((movie) => (
            <div key={movie.id} className="Movie d-flex flex-column gap-2" onClick={() => handleMovieClick(movie.id)}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <div className="d-flex flex-column">
                <p>{movie.title}</p>
                <span>Rating: {movie.vote_average}</span>
              </div>
            </div>
          ))}
        </div>
      )}
      <Outlet /> 
    </div>
  );
};

export default PopularMovies;
