import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import Customers from './pages/Customers';
import Jobs from './pages/Jobs';
import JobCard from './pages/JobCard';
import Materials from './pages/Materials';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('pp_user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={!user ? <Login setUser={setUser} /> : <Navigate to="/" />} />
        <Route path="/" element={user ? (user.role === 'admin' ? <AdminDashboard /> : <EmployeeDashboard />) : <Navigate to="/login" />} />
        <Route path="/customers" element={user?.role === 'admin' ? <Customers /> : <Navigate to="/" />} />
        <Route path="/jobs" element={user ? <Jobs userRole={user.role} /> : <Navigate to="/login" />} />
        <Route path="/jobs/:id" element={user ? <JobCard userRole={user.role} /> : <Navigate to="/login" />} />
        <Route path="/materials" element={user?.role === 'admin' ? <Materials /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;