import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navbar from './components/Navbar';
import PopularMovies from './components/PopularMovies';
import Upcoming from './components/Upcoming';
import TopRated from './components/TopRated';
import { useState } from 'react';
import DetailPage from './components/DetailPage';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [movieName, setmovieNmae] = useState("");

  const handleSearch = (results, movie_name) => {
    setSearchResults(results);
    setmovieNmae(movie_name);
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div className="d-flex flex-column">
          <Navbar onSearch={handleSearch} />
          <PopularMovies searchResults={searchResults} movieName={movieName} />
        </div>
      ),
    },
    {
      path: "/popular",
      element: (
        <div className="d-flex flex-column">
          <Navbar onSearch={handleSearch} />
          <PopularMovies searchResults={searchResults} movieName={movieName} />
        </div>
      ),
    },
    {
      path: "/toprated",
      element: (
        <div className="d-flex flex-column">
          <Navbar onSearch={handleSearch} />
          <TopRated searchResults={searchResults} movieName={movieName} />
        </div>
      ),
    },
    {
      path: "/upcoming",
      element: (
        <div className="d-flex flex-column">
          <Navbar onSearch={handleSearch} />
          <Upcoming searchResults={searchResults} movieName={movieName} />
        </div>
      ),
    },
    {
      path: "/details/:movieId", // Moved to root level
      element: <div className="d-flex flex-column">
      <Navbar onSearch={handleSearch} />
      <DetailPage></DetailPage>
    </div>
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
