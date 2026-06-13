import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { getMenuItems, createMenuItem, updateMenuItem, deleteMenuItem } from "../../services/api";

function AdminMenuItems() {
    const [items, setItems] = useState([]);
    const [item, setItem] = useState({ id: 0, name: "", category: "Main", price: 0, description: "", isAvailable: true, imagePath: "" });
    const [isEdit, setIsEdit] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => { loadItems(); }, []);

    const loadItems = async () => {
        try { const result = await getMenuItems(); setItems(result.data); }
        catch { setError("Failed to load menu items"); }
    };

    const handleChange = (e) => {
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setItem({ ...item, [e.target.name]: value });
    };

    const clearForm = () => {
        setItem({ id: 0, name: "", category: "Main", price: 0, description: "", isAvailable: true, imagePath: "" });
        setIsEdit(false); setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!item.name || !item.price) { setError("Name and price are required"); return; }
        try {
            const data = { ...item, price: parseFloat(item.price) };
            if (isEdit) { await updateMenuItem(item.id, data); } else { await createMenuItem(data); }
            clearForm(); loadItems();
        } catch { setError("Failed to save menu item"); }
    };

    const handleEdit = (i) => { setItem(i); setIsEdit(true); };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure?")) return;
        try { await deleteMenuItem(id); loadItems(); } catch { setError("Delete failed"); }
    };

    return (
        <div>
            <Navbar />
            <div className="eb-container eb-section">
                <div className="eb-head">
                    <div className="eb-eyebrow">Staff · Kitchen</div>
                    <h1>Menu management</h1>
                </div>

                {error && <div className="eb-alert eb-alert--error">{error}</div>}

                <div className="eb-card eb-card--pad" style={{ marginBottom: 26 }}>
                    <h3 style={{ fontSize: 20, marginBottom: 16 }}>{isEdit ? "Edit item" : "Add new item"}</h3>
                    <form onSubmit={handleSubmit}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                            <div className="eb-field" style={{ margin: 0 }}>
                                <label className="eb-label">Name</label>
                                <input className="eb-input" type="text" name="name" placeholder="Dish name" value={item.name} onChange={handleChange} />
                            </div>
                            <div className="eb-field" style={{ margin: 0 }}>
                                <label className="eb-label">Category</label>
                                <select className="eb-select" name="category" value={item.category} onChange={handleChange}>
                                    <option value="Appetizer">Appetizer</option>
                                    <option value="Main">Main</option>
                                    <option value="Dessert">Dessert</option>
                                    <option value="Drink">Drink</option>
                                </select>
                            </div>
                            <div className="eb-field" style={{ margin: 0 }}>
                                <label className="eb-label">Price ($)</label>
                                <input className="eb-input" type="number" name="price" placeholder="0.00" step="0.01" value={item.price} onChange={handleChange} />
                            </div>
                            <div className="eb-field" style={{ margin: 0 }}>
                                <label className="eb-label">Image URL</label>
                                <input className="eb-input" type="text" name="imagePath" placeholder="https://…/photo.jpg" value={item.imagePath} onChange={handleChange} />
                            </div>
                            <div className="eb-field" style={{ margin: 0, gridColumn: "1 / -1" }}>
                                <label className="eb-label">Description</label>
                                <textarea className="eb-textarea" name="description" rows="2" placeholder="Short description" value={item.description} onChange={handleChange} />
                            </div>
                        </div>

                        {item.imagePath && (
                            <div className="eb-upload" style={{ marginTop: 14, backgroundImage: `url("${item.imagePath}")` }} />
                        )}

                        <div className="eb-row" style={{ justifyContent: "space-between", marginTop: 16, flexWrap: "wrap", gap: 12 }}>
                            <label className="eb-row" style={{ gap: 10, cursor: "pointer" }}>
                                <button type="button" className={`eb-toggle ${item.isAvailable ? "is-on" : ""}`} onClick={() => setItem({ ...item, isAvailable: !item.isAvailable })}>
                                    <span className="eb-toggle__knob" />
                                </button>
                                <span style={{ fontSize: 13.5, fontWeight: 500 }}>Available</span>
                            </label>
                            <div className="eb-row" style={{ gap: 10 }}>
                                {isEdit && <button type="button" className="eb-btn eb-btn--ghost" onClick={clearForm}>Cancel</button>}
                                <button type="submit" className="eb-btn eb-btn--primary">{isEdit ? "Update item" : "Add item"}</button>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="eb-grid eb-grid--auto">
                    {items.map((i) => (
                        <div className="eb-card eb-card--pad" key={i.id} style={{ opacity: i.isAvailable ? 1 : 0.6 }}>
                            {i.imagePath
                                ? <div className="eb-photo" style={{ backgroundImage: `url("${i.imagePath}")`, marginBottom: 14 }} />
                                : <div className="eb-photo eb-photo--ph" style={{ marginBottom: 14 }}>No photo</div>}
                            <div className="eb-between" style={{ alignItems: "baseline" }}>
                                <span style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 600, fontSize: 22 }}>{i.name}</span>
                                <span className="eb-price">${i.price.toFixed(2)}</span>
                            </div>
                            <div className="eb-row" style={{ gap: 8, margin: "10px 0 12px", flexWrap: "wrap" }}>
                                <span className="eb-badge is-cat">{i.category}</span>
                                <span className={`eb-badge ${i.isAvailable ? "is-available" : "is-soldout"}`}>{i.isAvailable ? "Available" : "86'd"}</span>
                            </div>
                            {i.description && <p style={{ fontSize: 13, color: "var(--muted2)", margin: "0 0 14px" }}>{i.description}</p>}
                            <div className="eb-row" style={{ gap: 8 }}>
                                <button className="eb-btn eb-btn--ghost eb-btn--sm" onClick={() => handleEdit(i)}>Edit</button>
                                <button className="eb-btn eb-btn--danger eb-btn--sm" onClick={() => handleDelete(i.id)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AdminMenuItems;
