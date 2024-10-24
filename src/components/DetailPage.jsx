import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import '../Styles/DetailPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const DetailPage = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [castDetails, setCastDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); 

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const res = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US`);
        setMovieDetails(res.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    const fetchCastDetails = async () => {
      try {
        const res = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US`);
        setCastDetails(res.data.cast);
      } catch (error) {
        console.error("Error fetching cast details:", error);
      }
    };

    fetchMovieDetails();
    fetchCastDetails();
  }, [movieId]);

  const indexOfLastCastMember = currentPage * itemsPerPage;
  const indexOfFirstCastMember = indexOfLastCastMember - itemsPerPage;
  const currentCastMembers = castDetails.slice(indexOfFirstCastMember, indexOfLastCastMember);
  const totalPages = Math.ceil(castDetails.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (!movieDetails) {
    return <div>Error loading movie details</div>;
  }

  return (
    <>
       
          <div className="row bg-dark p-5">
            <div className="col-md-2">
              {movieDetails.poster_path && (
                <img src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`} alt={movieDetails.title} className='img-fluid w-75'/>
              )}
            </div>
            <div className="col-md-4">
              <p className="text-white fs-1">{movieDetails.title}</p>
              <span className="rating">Rating: {movieDetails.vote_average}</span>
              <p className="text-white fs-5">
                {movieDetails.runtime} mins  
                {movieDetails.genres.map((genre, index) => (
                  <span key={genre.id} className='ps-3 fs-6 genres'>
                    {genre.name}{index < movieDetails.genres.length - 1 && ', '}
                  </span>
                ))}
              </p>
              <p className="text-white">
                Release Date: {new Date(movieDetails.release_date).toLocaleDateString('en-US', {
                  weekday: 'short',   
                  year: 'numeric',    
                  month: 'short',     
                  day: 'numeric'      
                })}
              </p>
            </div>
        
        <div className="col-md-6">
          {movieDetails.backdrop_path && (
            <img src={`https://image.tmdb.org/t/p/w500${movieDetails.backdrop_path}`} alt={movieDetails.title} className='w-100' />
          )}
        </div>
        </div>
        <div className='container-fluid bg-dark px-5'>
            <header className='fs-2 fw-medium text-white'>Overview</header>
            <p className='text-white'>{movieDetails.overview}</p>
          </div>
      
      
      <div className="AllCast d-flex flex-column">
        <h3 className="text-white">Cast</h3>
        <div className="cast-grid d-flex gap-4">
          {currentCastMembers.map((castMember) => (
            <div key={castMember.cast_id} className="cast-member d-flex flex-column ">
              {castMember.profile_path && (
                <img src={`https://image.tmdb.org/t/p/w200${castMember.profile_path}`} alt={castMember.name} />
              )}
              <p className="text-white pt-2">{castMember.name}</p>
              <p className="character text-white">Character: {castMember.character}</p>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <nav aria-label="Page navigation" className="mt-4">
          <ul className="pagination justify-content-center">
            {Array.from({ length: totalPages }, (_, index) => (
              <li className={`page-item ${currentPage === index + 1 ? 'active' : ''}`} key={index}>
                <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default DetailPage;
