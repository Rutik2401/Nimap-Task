import '../Styles/Navbar.css';
import { NavLink } from "react-router-dom";
import axios from "axios";

const Navbar = ({ onSearch }) => {
  const handleSearch = (event) => {
    const movie_name = event.target.value;

    if (movie_name.trim()) { 
      axios.get(`https://api.themoviedb.org/3/search/movie?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&query=${movie_name}&page=1`)
        .then((res) => {
          console.log("Response is:", res);
          onSearch(res.data.results, movie_name.trim());
        })
        .catch((error) => {
          console.log("Error Is:", error);
        });
    } else {
     
      onSearch([], "");
    }
  };

  return (
    <div className="container-fluid Nav-wrapper">
      <nav className=" Navbar navbar navbar-expand-lg">
        <div className="container-fluid">
          <NavLink className="navbar-brand text-white" href="#">MovieDB</NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <form className="d-flex gap-3" role="search">
              <div className="nav text-white">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <NavLink to={"/popular"} className="nav-link active text-white" aria-current="page" href="#">Popular</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to={"/toprated"} className="nav-link text-white" href="#">Top Rated</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to={"/upcoming"} className="nav-link text-white" href="#">Upcoming</NavLink>
                  </li>
                </ul>
              </div>
              <div className="search d-flex gap-3">
                <input className="form-control me-2" type="search" onChange={handleSearch} placeholder="Movie Name" aria-label="Search" />
                <button className="btn btn-outline-success" type="submit">Search</button>
              </div>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
