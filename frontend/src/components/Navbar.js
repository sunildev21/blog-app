import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
    <div className="container">
      <Link className="navbar-brand font-weight-bold" to="/">
        <i className="fas fa-blog"></i> BlogApp
      </Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/">
              <i className="fas fa-home"></i> Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/create">
              <i className="fas fa-edit"></i> Create Blog
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Navbar;
