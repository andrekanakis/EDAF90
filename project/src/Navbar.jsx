import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <NavLink className="nav-link" to="/">
          Home
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/search-city">
          Search
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/favorite-cities">
          Favorities
        </NavLink>
      </li>
    </ul>
  );
}
