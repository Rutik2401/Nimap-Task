import React, { useEffect, useState } from 'react';
import "../Styles/TopRated.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader'; 

const Upcoming = ({ searchResults, movieName }) => {
  const [topUpcomingMovies, setUpcomingMovies] = useState([]);
  const [loading, setLoading] = useState(true); 
  let navigate = useNavigate();
  const getUpcomingMovies = () => {
    setLoading(true); 
    axios.get("https://api.themoviedb.org/3/movie/upcoming?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&page=1")
      .then((res) => {
        console.log(res.data);
        setUpcomingMovies(res.data.results);
        setLoading(false); 
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false); 
      });
  };

  useEffect(() => {
    getUpcomingMovies();
  }, []);


  const moviesToDisplay = movieName ? searchResults : topUpcomingMovies;
  const handleMovieClick = (movieId) => {
    navigate(`/details/${movieId}`); 
  };

  return (
    <div className='container-fluid top-wrapper'>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
          <ClipLoader color="#36d7b7" size={100} /> 
        </div>
      ) : (
        <div className="AllMovies d-flex gap-3 flex-wrap">
          {moviesToDisplay.map((movie) => (
            <div key={movie.id} className='Movie  d-flex flex-column gap-2' onClick={() => handleMovieClick(movie.id)}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <div className='d-flex flex-column'>
                <p>{movie.title}</p>
                <span>Rating: {movie.vote_average}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Upcoming;
