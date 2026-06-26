import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('pp_user'));

  if (!user || location.pathname === '/login') return null;

  const handleLogout = () => {
    localStorage.removeItem('pp_user');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <h1 style={{ margin: 0, fontSize: '1.25rem' }}>Punctual Plumbers</h1>
        {user.role === 'admin' && (
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Link to="/" className="btn btn-sm">Dashboard</Link>
            <Link to="/jobs" className="btn btn-sm">Jobs</Link>
            <Link to="/customers" className="btn btn-sm">Customers</Link>
            <Link to="/materials" className="btn btn-sm">Materials</Link>
          </div>
        )}
        {user.role === 'employee' && (
          <Link to="/jobs" className="btn btn-sm">My Jobs</Link>
        )}
      </div>
      <div className="user-info">
        <span>{user.name}</span>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}