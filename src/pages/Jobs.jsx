import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Jobs({ userRole }) {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [customers, setCustomers] = useState([]);
  
  const [formData, setFormData] = useState({
    customerId: '', customerName: '', phone: '', address: '', description: '', status: 'Pending', assignedTo: ''
  });

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem('pp_jobs') || '[]');
    const storedEmps = JSON.parse(localStorage.getItem('pp_users') || '[]').filter(u => u.role === 'employee');
    const storedCustomers = JSON.parse(localStorage.getItem('pp_customers') || '[]');
    setJobs(storedJobs);
    setEmployees(storedEmps);
    setCustomers(storedCustomers);
  }, []);

  const saveJobs = (data) => {
    localStorage.setItem('pp_jobs', JSON.stringify(data));
    setJobs(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newJob = { 
      ...formData, 
      id: Date.now(), 
      labourHours: 0,
      materials: [],
      labourRate: 350,
      createdAt: new Date().toISOString()
    };
    saveJobs([newJob, ...jobs]);
    setShowForm(false);
    setFormData({ customerId: '', customerName: '', phone: '', address: '', description: '', status: 'Pending', assignedTo: '' });
  };

  const updateStatus = (id, status) => {
    saveJobs(jobs.map(j => j.id === id ? {...j, status} : j));
  };

  const sendToAccountant = async (job) => {
    const total = (job.labourHours * job.labourRate + job.materials.reduce((sum, m) => sum + m.total, 0)) * 1.15;
    alert(`Job #${job.id} sent to accountant. Total: R${total.toFixed(2)}`);
  };

  const visibleJobs = userRole === 'admin' ? jobs : jobs.filter(j => j.assignedTo === JSON.parse(localStorage.getItem('pp_user')).email);

  return (
    <div className="container">
      {userRole === 'admin' && (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2>Job Management</h2>
            <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>+ New Job Card</button>
          </div>

          {showForm && (
            <form onSubmit={handleSubmit} className="card" style={{ background: '#f7fafc' }}>
              <div className="grid grid-2">
                <div className="form-group">
                  <label>Customer</label>
                  <select value={formData.customerId} onChange={e => {
                    const cust = customers.find(c => c.id.toString() === e.target);
                    setFormData({...formData, customerId: e.target, customerName: cust?.name || '', phone: cust?.phone || '', address: cust?.address || ''});
                  }} required>
                    <option value="">Select Customer</option>
                    {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div className="form-group"><label>Phone</label><input value={formData.phone} onChange={e => setFormData({...formData, phone: e.target})} /></div>
                <div className="form-group"><label>Address</label><input value={formData.address} onChange={e => setFormData({...formData, address: e.target})} /></div>
                <div className="form-group"><label>Job Description</label><input value={formData.description} onChange={e => setFormData({...formData, description: e.target})} /></div>
                <div className="form-group">
                  <label>Assign To</label>
                  <select value={formData.assignedTo} onChange={e => setFormData({...formData, assignedTo: e.target})}>
                    <option value="">Unassigned</option>
                    {employees.map(e => <option key={e.email} value={e.email}>{e.name}</option>)}
                  </select>
                </div>
              </div>
              <button className="btn btn-success" type="submit">Create Job Card</button>
            </form>
          )}
        </div>
      )}

      <div className="card">
        <table className="table">
          <thead><tr><th>ID</th><th>Customer</th><th>Description</th><th>Status</th><th>Assigned To</th><th>Actions</th></tr></thead>
          <tbody>
            {visibleJobs.map(job => (
              <tr key={job.id}>
                <td>#{job.id}</td>
                <td>{job.customerName}</td>
                <td>{job.description}</td>
                <td><span className={`status-badge status-${job.status.toLowerCase().replace(' ', '-')}`}>{job.status}</span></td>
                <td>{job.assignedTo || 'Unassigned'}</td>
                <td>
                  <Link to={`/jobs/${job.id}`} className="btn btn-sm btn-primary">View</Link>
                  {userRole === 'admin' && job.status === 'Completed' && (
                    <button className="btn btn-sm btn-success" onClick={() => sendToAccountant(job)} style={{ marginLeft: '0.5rem' }}>Send to Accountant</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}