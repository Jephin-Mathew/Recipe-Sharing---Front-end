import '../css/header.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Implement your search logic here
    console.log('Search Query:', searchQuery);
  };

  return (
    <nav className="navbar navbar-light bg-light navbar-expand-md px-3 position-relative">
      <Link className="navbar-brand" to="">
        Recipes
      </Link>
      <div className="w-50">
        <form className="d-flex position-relative" role="search" onSubmit={handleSearchSubmit}>
          <input
            className="form-control me-2"
            type="search"
            aria-label="Search"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder="Search..."
          />
          <i className="fa-solid fa-magnifying-glass position translate-bottom mt-2 ms-2 ps-1 text-secondary"></i>
        </form>
      </div>
      <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#menu">
        <span className="navbar-toggler-icon span"></span>
      </button>
      <div className="navbar-collapse collapse" id="menu">
        <ul className="navbar-nav ms-auto" style={{ listStyle: 'none' }}>
          <li className="nav-item mx-3">
            <Link to="/feed" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item mx-3">
            <Link to="/createRecipe" className="nav-link">
              Create Recipes
            </Link>
          </li>
          <li className="nav-item mx-3">
            <Link to="/profile" className="nav-link">
              Profile
            </Link>
          </li>
          <li className="nav-item mx-3">
            <Link to="/users" className="nav-link">
              Users
            </Link>
          </li>
          <li className="nav-item mx-3">
            <Link to="/logout" className="nav-link">
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
