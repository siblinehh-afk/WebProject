import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { getMenuItems } from "../../services/api";

const CATEGORIES = ["All", "Appetizer", "Main", "Dessert", "Drink"];

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
            <div className="eb-container eb-section">
                <div className="eb-hero" style={{ marginBottom: 26 }}>
                    <div className="eb-eyebrow">Seasonal · Wood-fired</div>
                    <h1>Our Menu</h1>
                    <p>Small plates, open-flame mains and natural wine — sourced weekly from local growers and the coast.</p>
                </div>

                {error && <div className="eb-alert eb-alert--error">{error}</div>}

                <div className="eb-row" style={{ gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
                    {CATEGORIES.map((c) => (
                        <button key={c} className={`eb-chip ${filter === c ? "is-active" : ""}`} onClick={() => setFilter(c)}>{c}</button>
                    ))}
                </div>

                <div className="eb-grid eb-grid--auto">
                    {filtered.map((i) => (
                        <div className="eb-card eb-card--pad" key={i.id}>
                            {i.imagePath
                                ? <div className="eb-photo" style={{ backgroundImage: `url("${i.imagePath}")`, marginBottom: 14 }} />
                                : <div className="eb-photo eb-photo--ph" style={{ marginBottom: 14 }}>No photo</div>}
                            <div className="eb-between" style={{ alignItems: "baseline" }}>
                                <span style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 600, fontSize: 23, lineHeight: 1.1 }}>{i.name}</span>
                                <span className="eb-price">${i.price.toFixed(2)}</span>
                            </div>
                            {i.description && <p style={{ margin: "8px 0 14px", color: "var(--muted2)", fontSize: 13.5, lineHeight: 1.5 }}>{i.description}</p>}
                            <span className="eb-badge is-cat">{i.category}</span>
                        </div>
                    ))}
                </div>

                {filtered.length === 0 && <div className="eb-alert eb-alert--info" style={{ marginTop: 16 }}>No items found in this category.</div>}
            </div>
        </div>
    );
}

export default Menu;
