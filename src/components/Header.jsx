import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <span className="logo-text">Portfolio</span>
        </Link>

        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/projects" className="nav-link">Projects</Link>
          <Link to="/blog" className="nav-link">Blog</Link>
          <Link to="/contact" className="nav-link">Contact</Link>

          {isAuthenticated ? (
            <>
              <Link to="/admin" className="nav-link nav-link-admin">Dashboard</Link>
              <button onClick={handleLogout} className="nav-btn logout-btn">
                Logout ({user?.username})
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-btn register-btn">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
