import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import Customers from './pages/Customers';
import Jobs from './pages/Jobs';
import JobCard from './pages/JobCard';
import Materials from './pages/Materials';
import './App.css';

const seedData = () => {
  if (!localStorage.getItem('pp_seeded')) {
    localStorage.setItem('pp_users', JSON.stringify([
      { id: 1, email: "admin@punctualplumbers.co.za", password: "admin123", name: "Admin User", role: "admin" },
      { id: 2, email: "employee@punctualplumbers.co.za", password: "emp123", name: "John Technician", role: "employee" }
    ]));
    localStorage.setItem('pp_customers', JSON.stringify([
      { id: 1, name: "Jane Smith", email: "jane@example.com", phone: "0821234567", address: "123 Main St, Cape Town" },
      { id: 2, name: "Bob Johnson", email: "bob@example.com", phone: "0719876543", address: "456 Oak Ave, Johannesburg" }
    ]));
    localStorage.setItem('pp_materials', JSON.stringify([
      { id: 1, name: "PVC Pipe 50mm", description: "Standard PVC pipe", defaultPrice: 45.50 },
      { id: 2, name: "Washers Pack", description: "Pack of 10 washers", defaultPrice: 25.00 }
    ]));
    localStorage.setItem('pp_jobs', JSON.stringify([]));
    localStorage.setItem('pp_seeded', 'true');
  }
};

function App() {
  useEffect(() => {
    seedData();
  }, []);

  const user = JSON.parse(localStorage.getItem('pp_user'));

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
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