import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { getMenuItems } from "../../services/api";

function Menu() {
    const [items, setItems] = useState([]);
    const [filter, setFilter] = useState("All");
    const [error, setError] = useState("");

    useEffect(() => { loadItems(); }, []);

    const loadItems = async () => {
        try { const result = await getMenuItems(); setItems(result.data); }
        catch { setError("Failed to load menu"); }
    };

    const filtered = filter === "All"
        ? items.filter(i => i.isAvailable)
        : items.filter(i => i.isAvailable && i.category === filter);

    return (
        <div>
            <Navbar />
            <div className="page-header" style={{ background: "linear-gradient(135deg, #0f3460, #533483)" }}>
                <div className="container"><h2>Our Menu</h2></div>
            </div>
            <div className="container">
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="filter-group mb-4">
                    {["All", "Appetizer", "Main", "Dessert", "Drink"].map(c => (
                        <button key={c} className={`btn ${filter === c ? "btn-primary" : "btn-outline-primary"}`} onClick={() => setFilter(c)}>{c}</button>
                    ))}
                </div>
                <div className="row g-4">
                    {filtered.map((i) => (
                        <div className="col-md-4" key={i.id}>
                            <div className="card browse-card">
                                {i.imagePath ? (
                                    <img src={i.imagePath} className="card-img-top" alt={i.name} />
                                ) : (
                                    <div className="no-image">No Image</div>
                                )}
                                <div className="card-body d-flex flex-column">
                                    <h5 className="fw-bold">{i.name}</h5>
                                    <span className="badge bg-secondary mb-2" style={{ width: "fit-content" }}>{i.category}</span>
                                    {i.description && <p className="text-muted">{i.description}</p>}
                                    <div className="price-tag mt-auto">${i.price.toFixed(2)}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {filtered.length === 0 && <div className="alert alert-info mt-3">No items found in this category.</div>}
            </div>
        </div>
    );
}

export default Menu;