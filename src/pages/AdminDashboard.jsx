import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem('pp_jobs') || '[]');
    setJobs(storedJobs);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('pp_user');
    navigate('/login');
  };

  const stats = {
    pending: jobs.filter(j => j.status === 'Pending').length,
    assigned: jobs.filter(j => j.status === 'Assigned').length,
    inProgress: jobs.filter(j => j.status === 'In Progress').length,
    completed: jobs.filter(j => j.status === 'Completed').length,
    invoiced: jobs.filter(j => j.status === 'Invoiced').length,
  };

  return (
    <div>
      <nav className="navbar">
        <h1>Punctual Plumbers CRM (Admin)</h1>
        <div className="user-info">
          <span>Welcome, Admin</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </nav>
      
      <div className="container">
        <div className="grid grid-3" style={{ marginBottom: '2rem' }}>
          <div className="card"><h3>{stats.pending}</h3><p>Pending Jobs</p></div>
          <div className="card"><h3>{stats.assigned}</h3><p>Assigned Jobs</p></div>
          <div className="card"><h3>{stats.inProgress}</h3><p>In Progress</p></div>
          <div className="card"><h3>{stats.completed}</h3><p>Completed Jobs</p></div>
          <div className="card"><h3>{stats.invoiced}</h3><p>Invoiced Jobs</p></div>
        </div>

        <div className="card">
          <h2 style={{ marginBottom: '1rem' }}>Quick Actions</h2>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/jobs" className="btn btn-primary">Manage Jobs</Link>
            <Link to="/customers" className="btn btn-primary">Customers</Link>
            <Link to="/materials" className="btn btn-primary">Materials</Link>
          </div>
        </div>

        <Outlet />
      </div>
    </div>
  );
}