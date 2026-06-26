import { useState, useEffect } from 'react';

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '' });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('pp_customers') || '[]');
    setCustomers(stored);
  }, []);

  const saveCustomers = (data) => {
    localStorage.setItem('pp_customers', JSON.stringify(data));
    setCustomers(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCustomer = { ...formData, id: Date.now(), enquiries: [], jobs: [] };
    saveCustomers([...customers, newCustomer]);
    setShowForm(false);
    setFormData({ name: '', email: '', phone: '', address: '' });
  };

  return (
    <div className="container">
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2>Customer Management</h2>
          <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>+ Add Customer</button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="card" style={{ background: '#f7fafc' }}>
            <div className="grid grid-2">
              <div className="form-group"><label>Name</label><input value={formData.name} onChange={e => setFormData({...formData, name: e.target})} required /></div>
              <div className="form-group"><label>Email</label><input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target})} required /></div>
              <div className="form-group"><label>Phone</label><input value={formData.phone} onChange={e => setFormData({...formData, phone: e.target})} /></div>
              <div className="form-group"><label>Address</label><input value={formData.address} onChange={e => setFormData({...formData, address: e.target})} /></div>
            </div>
            <button className="btn btn-success" type="submit">Save Customer</button>
          </form>
        )}

        <table className="table">
          <thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Address</th></tr></thead>
          <tbody>
            {customers.map(c => (
              <tr key={c.id}>
                <td>{c.name}</td><td>{c.email}</td><td>{c.phone}</td><td>{c.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}