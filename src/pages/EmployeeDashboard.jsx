import { Link } from 'react-router-dom';

export default function EmployeeDashboard() {
  return (
    <div className="container">
      <div className="card">
        <h2 style={{ marginBottom: '1rem' }}>My Jobs</h2>
        <Link to="/jobs" className="btn btn-primary">View Job Cards</Link>
      </div>
    </div>
  );
}