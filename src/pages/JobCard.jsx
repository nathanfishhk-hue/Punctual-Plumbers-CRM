import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { differenceInHours, parseISO } from 'date-fns';

export default function JobCard({ userRole }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [materialForm, setMaterialForm] = useState({ name: '', quantity: 1, price: 0 });

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem('pp_jobs') || '[]');
    const found = storedJobs.find(j => j.id.toString() === id);
    if (found) setJob(found);
  }, [id]);

  const saveJob = (updated) => {
    const storedJobs = JSON.parse(localStorage.getItem('pp_jobs') || '[]');
    localStorage.setItem('pp_jobs', JSON.stringify(storedJobs.map(j => j.id.toString() === id ? updated : j)));
    setJob(updated);
  };

  const calculateTotal = () => {
    const labourCost = job.labourHours * job.labourRate;
    const materialCost = (job.materials || []).reduce((sum, m) => sum + m.total, 0);
    const subtotal = labourCost + materialCost;
    const vat = subtotal * 0.15;
    const total = subtotal + vat;
    return { labourCost, materialCost, vat, total };
  };

  const handleTimeLog = (type) => {
    const now = new Date().toISOString();
    const updated = { ...job, [`time${type}`]: now };
    if (type === 'In') {
      updated.timeIn = now;
    } else {
      updated.timeOut = now;
      const hours = differenceInHours(parseISO(now), parseISO(job.timeIn || now));
      updated.labourHours = hours > 0 ? hours : 0;
    }
    saveJob(updated);
  };

  const addMaterial = (e) => {
    e.preventDefault();
    const mat = { ...materialForm, id: Date.now(), total: materialForm.quantity * materialForm.price };
    const newMaterials = [...(job.materials || []), mat];
    saveJob({ ...job, materials: newMaterials });
    setMaterialForm({ name: '', quantity: 1, price: 0 });
  };

  const submitJob = () => {
    saveJob({ ...job, status: 'Completed' });
    alert('Job submitted successfully');
  };

  if (!job) return <div className="container"><p>Loading...</p></div>;

  const { labourCost, materialCost, vat, total } = calculateTotal();

  return (
    <div className="container">
      <button className="btn btn-sm" onClick={() => navigate('/jobs')} style={{ marginBottom: '1rem' }}>← Back</button>
      
      <div className="card">
        <h2>Job Card #{job.id}</h2>
        <p><strong>Customer:</strong> {job.customerName}</p>
        <p><strong>Address:</strong> {job.address}</p>
        <p><strong>Phone:</strong> {job.phone}</p>
        <p><strong>Description:</strong> {job.description}</p>
        
        {userRole === 'admin' && (
          <div style={{ background: '#f7fafc', padding: '1rem', borderRadius: '4px', marginTop: '1rem' }}>
            <h3>Financial Details (Admin Only)</h3>
            <p>Labour: {job.labourHours} hours × R{job.labourRate}/hr = <strong>R{labourCost}</strong></p>
            <p>Materials: <strong>R{materialCost}</strong></p>
            <p>VAT (15%): <strong>R{vat.toFixed(2)}</strong></p>
            <hr />
            <p>Grand Total: <strong style={{ fontSize: '1.5rem' }}>R{total.toFixed(2)}</strong></p>
          </div>
        )}

        <div style={{ marginTop: '1rem' }}>
          <h3>Time Tracking</h3>
          <p>Time In: {job.timeIn ? new Date(job.timeIn).toLocaleString() : 'Not logged'}</p>
          <p>Time Out: {job.timeOut ? new Date(job.timeOut).toLocaleString() : 'Not logged'}</p>
          <p>Hours: {job.labourHours || 0}</p>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button className="btn btn-primary" onClick={() => handleTimeLog('In')} disabled={!!job.timeIn}>Log Time In</button>
            <button className="btn btn-success" onClick={() => handleTimeLog('Out')} disabled={!job.timeIn || !!job.timeOut}>Log Time Out</button>
            {userRole === 'admin' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input type="number" value={job.labourHours || 0} onChange={e => saveJob({...job, labourHours: +e.target.value})} min="0" placeholder="Hours" />
                <input type="number" value={job.labourRate || 350} onChange={e => saveJob({...job, labourRate: +e.target.value})} min="0" placeholder="Rate" />
              </div>
            )}
          </div>
        </div>

        <div style={{ marginTop: '1rem' }}>
          <h3>Materials Used</h3>
          <ul>
            {(job.materials || []).map(m => (
              <li key={m.id}>{m.name} × {m.quantity} @ R{m.price} = R{m.total}</li>
            ))}
          </ul>
          <form onSubmit={addMaterial} className="grid grid-3">
            <input placeholder="Material name" value={materialForm.name} onChange={e => setMaterialForm({...materialForm, name: e.target.value})} required />
            <input type="number" placeholder="Qty" value={materialForm.quantity} onChange={e => setMaterialForm({...materialForm, quantity: +e.target.value})} min="1" required />
            <input type="number" placeholder="Price" value={materialForm.price} onChange={e => setMaterialForm({...materialForm, price: +e.target.value})} min="0" step="0.01" required />
            <button className="btn btn-primary" type="submit">Add Material</button>
          </form>
        </div>

        {userRole === 'employee' && job.status !== 'Completed' && (
          <button className="btn btn-success" onClick={submitJob} style={{ marginTop: '1rem' }}>Submit Completed Job</button>
        )}

        {job.status === 'Invoiced' && (
          <div style={{ marginTop: '1rem', padding: '1rem', background: '#f0fff4', borderLeft: '4px solid #38a169' }}>
            <strong>Payment via EFT to bank account:</strong>
            <p>Bank: FNB<br />Account: 123456789<br />Branch: 250655<br />Reference: Job #{job.id}</p>
          </div>
        )}
      </div>
    </div>
  );
}