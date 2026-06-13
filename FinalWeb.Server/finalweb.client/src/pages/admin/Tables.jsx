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
            <div className="eb-container eb-section">
                <div className="eb-head">
                    <div className="eb-eyebrow">Staff · Floor plan</div>
                    <h1>Table management</h1>
                </div>

                {error && <div className="eb-alert eb-alert--error">{error}</div>}

                <div className="eb-card eb-card--pad" style={{ marginBottom: 26 }}>
                    <h3 style={{ fontSize: 20, marginBottom: 16 }}>{isEdit ? "Edit table" : "Add new table"}</h3>
                    <form onSubmit={handleSubmit}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                            <div className="eb-field" style={{ margin: 0 }}>
                                <label className="eb-label">Table number</label>
                                <input className="eb-input" type="number" name="tableNumber" placeholder="12" value={table.tableNumber} onChange={handleChange} />
                            </div>
                            <div className="eb-field" style={{ margin: 0 }}>
                                <label className="eb-label">Capacity</label>
                                <input className="eb-input" type="number" name="capacity" placeholder="4" value={table.capacity} onChange={handleChange} />
                            </div>
                            <div className="eb-field" style={{ margin: 0 }}>
                                <label className="eb-label">Location</label>
                                <select className="eb-select" name="location" value={table.location} onChange={handleChange}>
                                    <option value="Indoor">Indoor</option>
                                    <option value="Outdoor">Outdoor</option>
                                </select>
                            </div>
                            <div className="eb-field" style={{ margin: 0 }}>
                                <label className="eb-label">Description</label>
                                <input className="eb-input" type="text" name="description" placeholder="Cozy two-top by the window" value={table.description} onChange={handleChange} />
                            </div>
                        </div>

                        <div className="eb-row" style={{ justifyContent: "space-between", marginTop: 16, flexWrap: "wrap", gap: 12 }}>
                            <label className="eb-row" style={{ gap: 10, cursor: "pointer" }}>
                                <button type="button" className={`eb-toggle ${table.isAvailable ? "is-on" : ""}`} onClick={() => setTable({ ...table, isAvailable: !table.isAvailable })}>
                                    <span className="eb-toggle__knob" />
                                </button>
                                <span style={{ fontSize: 13.5, fontWeight: 500 }}>Available for booking</span>
                            </label>
                            <div className="eb-row" style={{ gap: 10 }}>
                                {isEdit && <button type="button" className="eb-btn eb-btn--ghost" onClick={clearForm}>Cancel</button>}
                                <button type="submit" className="eb-btn eb-btn--primary">{isEdit ? "Update table" : "Add table"}</button>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="eb-table-wrap">
                    <table className="eb-table">
                        <thead>
                            <tr><th>Table #</th><th>Capacity</th><th>Location</th><th>Status</th><th>Description</th><th style={{ textAlign: "right" }}>Actions</th></tr>
                        </thead>
                        <tbody>
                            {tables.map((t) => (
                                <tr key={t.id}>
                                    <td style={{ fontWeight: 600, color: "var(--ink)" }}>#{t.tableNumber}</td>
                                    <td>{t.capacity} seats</td>
                                    <td>{t.location}</td>
                                    <td><span className={`eb-badge ${t.isAvailable ? "is-available" : "is-cancelled"}`}>{t.isAvailable ? "Available" : "Unavailable"}</span></td>
                                    <td>{t.description}</td>
                                    <td>
                                        <div className="eb-row" style={{ gap: 8, justifyContent: "flex-end" }}>
                                            <button className="eb-btn eb-btn--ghost eb-btn--sm" onClick={() => handleEdit(t)}>Edit</button>
                                            <button className="eb-btn eb-btn--danger eb-btn--sm" onClick={() => handleDelete(t.id)}>Delete</button>
                                        </div>
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
