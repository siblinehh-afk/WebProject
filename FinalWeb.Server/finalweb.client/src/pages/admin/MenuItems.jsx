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
            <div className="page-header">
                <div className="container"><h2>Manage Menu</h2></div>
            </div>
            <div className="container">
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="form-card">
                    <h5>{isEdit ? "Edit Item" : "Add New Item"}</h5>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input type="text" name="name" placeholder="Item Name" className="form-control" value={item.name} onChange={handleChange} />
                        </div>
                        <div className="row g-3 mb-3">
                            <div className="col-md-4">
                                <select name="category" className="form-select" value={item.category} onChange={handleChange}>
                                    <option value="Appetizer">Appetizer</option>
                                    <option value="Main">Main</option>
                                    <option value="Dessert">Dessert</option>
                                    <option value="Drink">Drink</option>
                                </select>
                            </div>
                            <div className="col-md-4">
                                <input type="number" name="price" placeholder="Price" className="form-control" value={item.price} onChange={handleChange} step="0.01" />
                            </div>
                            <div className="col-md-4">
                                <input type="text" name="description" placeholder="Description" className="form-control" value={item.description} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="mb-3">
                            <input type="text" name="imagePath" placeholder="Image URL" className="form-control" value={item.imagePath} onChange={handleChange} />
                        </div>
                        <button type="submit" className="btn btn-primary">{isEdit ? "Update" : "Add Item"}</button>
                        {isEdit && <button type="button" className="btn btn-secondary ms-2" onClick={clearForm}>Cancel</button>}
                    </form>
                </div>

                <div className="row g-4">
                    {items.map((i) => (
                        <div className="col-md-4" key={i.id}>
                            <div className="card browse-card">
                                {i.imagePath ? (
                                    <img src={i.imagePath} className="card-img-top" alt={i.name} />
                                ) : (
                                    <div className="no-image">No Image</div>
                                )}
                                <div className="card-body">
                                    <h5 className="fw-bold">{i.name}</h5>
                                    <span className="badge bg-secondary me-2">{i.category}</span>
                                    <span className={`badge ${i.isAvailable ? "bg-success" : "bg-danger"}`}>{i.isAvailable ? "Available" : "Unavailable"}</span>
                                    {i.description && <p className="text-muted mt-2">{i.description}</p>}
                                    <div className="price-tag mb-3">${i.price.toFixed(2)}</div>
                                    <button onClick={() => handleEdit(i)} className="btn btn-warning btn-sm me-2">Edit</button>
                                    <button onClick={() => handleDelete(i.id)} className="btn btn-danger btn-sm">Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AdminMenuItems;