import { useState, useEffect } from 'react';

export default function Materials() {
  const [materials, setMaterials] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '', defaultPrice: 0 });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('pp_materials') || '[]');
    setMaterials(stored);
  }, []);

  const saveMaterials = (data) => {
    localStorage.setItem('pp_materials', JSON.stringify(data));
    setMaterials(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      saveMaterials(materials.map(m => m.id === editingId ? {...formData, id: editingId} : m));
      setEditingId(null);
    } else {
      const newMaterial = { ...formData, id: Date.now() };
      saveMaterials([...materials, newMaterial]);
    }
    setShowForm(false);
    setFormData({ name: '', description: '', defaultPrice: 0 });
  };

  const editMaterial = (m) => {
    setFormData({ name: m.name, description: m.description, defaultPrice: m.defaultPrice });
    setEditingId(m.id);
    setShowForm(true);
  };

  return (
    <div className="container">
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2>Materials Database</h2>
          <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>+ {editingId ? 'Editing' : 'Add'} Material</button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="card" style={{ background: '#f7fafc' }}>
            <div className="form-group">
              <label>Material Name</label>
              <input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Default Price</label>
              <input type="number" value={formData.defaultPrice} onChange={e => setFormData({...formData, defaultPrice: +e.target.value})} min="0" step="0.01" required />
            </div>
            <button className="btn btn-success" type="submit">{editingId ? 'Update' : 'Save'} Material</button>
            {editingId && <button className="btn btn-sm" onClick={() => { setEditingId(null); setShowForm(false); }} style={{ marginLeft: '0.5rem' }}>Cancel</button>}
          </form>
        )}

        <table className="table">
          <thead><tr><th>Name</th><th>Description</th><th>Price</th><th>Actions</th></tr></thead>
          <tbody>
            {materials.map(m => (
              <tr key={m.id}>
                <td>{m.name}</td>
                <td>{m.description}</td>
                <td>R{m.defaultPrice}</td>
                <td><button className="btn btn-sm btn-primary" onClick={() => editMaterial(m)}>Edit</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}