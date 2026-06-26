import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function EmployeeDashboard() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const user = JSON.parse(localStorage.getItem('pp_user'));

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem('pp_jobs') || '[]');
    setJobs(storedJobs.filter(j => j.assignedTo === user.email));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('pp_user');
    navigate('/login');
  };

  return (
    <div>
      <nav className="navbar">
        <h1>Punctual Plumbers (Employee)</h1>
        <div className="user-info">
          <span>{user.name}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <div className="container">
        <div className="card">
          <h2 style={{ marginBottom: '1rem' }}>My Jobs</h2>
          <Link to="/jobs" className="btn btn-primary">View Job Cards</Link>
        </div>

        <Outlet />
      </div>
    </div>
  );
}