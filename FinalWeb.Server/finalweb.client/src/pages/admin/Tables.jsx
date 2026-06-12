import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { getTables, createTable, updateTable, deleteTable } from "../../services/api";

function AdminTables() {
    const [tables, setTables] = useState([]);
    const [table, setTable] = useState({ id: 0, tableNumber: "", capacity: "", location: "Indoor", isAvailable: true, description: "" });
    const [isEdit, setIsEdit] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => { loadTables(); }, []);

    const loadTables = async () => {
        try { const result = await getTables(); setTables(result.data); }
        catch { setError("Failed to load tables"); }
    };

    const handleChange = (e) => {
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setTable({ ...table, [e.target.name]: value });
    };

    const clearForm = () => {
        setTable({ id: 0, tableNumber: "", capacity: "", location: "Indoor", isAvailable: true, description: "" });
        setIsEdit(false); setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!table.tableNumber || !table.capacity) { setError("Table number and capacity are required"); return; }
        try {
            const data = { ...table, tableNumber: parseInt(table.tableNumber), capacity: parseInt(table.capacity) };
            if (isEdit) { await updateTable(table.id, data); } else { await createTable(data); }
            clearForm(); loadTables();
        } catch { setError("Failed to save table"); }
    };

    const handleEdit = (t) => { setTable(t); setIsEdit(true); };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure?")) return;
        try { await deleteTable(id); loadTables(); } catch { setError("Delete failed"); }
    };

    return (
        <div>
            <Navbar />
            <div className="page-header">
                <div className="container"><h2>Manage Tables</h2></div>
            </div>
            <div className="container">
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="form-card">
                    <h5>{isEdit ? "Edit Table" : "Add New Table"}</h5>
                    <form onSubmit={handleSubmit}>
                        <div className="row g-3">
                            <div className="col-md-2">
                                <input type="number" name="tableNumber" placeholder="Table #" className="form-control" value={table.tableNumber} onChange={handleChange} />
                            </div>
                            <div className="col-md-2">
                                <input type="number" name="capacity" placeholder="Capacity" className="form-control" value={table.capacity} onChange={handleChange} />
                            </div>
                            <div className="col-md-2">
                                <select name="location" className="form-select" value={table.location} onChange={handleChange}>
                                    <option value="Indoor">Indoor</option>
                                    <option value="Outdoor">Outdoor</option>
                                </select>
                            </div>
                            <div className="col-md-3">
                                <input type="text" name="description" placeholder="Description" className="form-control" value={table.description} onChange={handleChange} />
                            </div>
                            <div className="col-md-1 d-flex align-items-center">
                                <div className="form-check">
                                    <input type="checkbox" name="isAvailable" className="form-check-input" checked={table.isAvailable} onChange={handleChange} />
                                    <label className="form-check-label">Available</label>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <button type="submit" className="btn btn-primary w-100">{isEdit ? "Update" : "Add"}</button>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="custom-table">
                    <table className="table table-hover mb-0">
                        <thead className="table-dark">
                            <tr><th>Table #</th><th>Capacity</th><th>Location</th><th>Status</th><th>Description</th><th>Actions</th></tr>
                        </thead>
                        <tbody>
                            {tables.map((t) => (
                                <tr key={t.id}>
                                    <td>{t.tableNumber}</td>
                                    <td>{t.capacity} seats</td>
                                    <td>{t.location}</td>
                                    <td><span className={`badge ${t.isAvailable ? "bg-success" : "bg-danger"}`}>{t.isAvailable ? "Available" : "Unavailable"}</span></td>
                                    <td>{t.description}</td>
                                    <td>
                                        <button onClick={() => handleEdit(t)} className="btn btn-warning btn-sm me-2">Edit</button>
                                        <button onClick={() => handleDelete(t.id)} className="btn btn-danger btn-sm">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AdminTables;