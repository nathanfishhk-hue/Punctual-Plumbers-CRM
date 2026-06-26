import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Login({ setUser }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('pp_users') || '[]');
    const user = users.find(u => u.email === formData.email && u.password === formData.password);
    if (user) {
      localStorage.setItem('pp_user', JSON.stringify(user));
      setUser(user);
      navigate('/');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#1a365d' }}>
      <div className="card" style={{ minWidth: '320px' }}>
        <h2>Punctual Plumbers CRM</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} required />
          </div>
          <button className="btn btn-primary" type="submit" style={{ width: '100%' }}>Login</button>
        </form>
        <p style={{ marginTop: '1rem', fontSize: '0.875rem' }}>Demo: admin@punctualplumbers.co.za / admin123 (admin) or employee@punctualplumbers.co.za / emp123 (employee)</p>
      </div>
    </div>
  );
}