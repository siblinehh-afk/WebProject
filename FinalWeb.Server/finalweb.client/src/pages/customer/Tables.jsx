import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { getTables } from "../../services/api";

function BrowseTables() {
    const [tables, setTables] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        loadTables();
    }, []);

    const loadTables = async () => {
        try {
            const result = await getTables();
            setTables(result.data);
        } catch {
            setError("Failed to load tables");
        }
    };

    return (
        <div>
            <Navbar />
            <div className="eb-container eb-section">
                <div className="eb-head">
                    <div className="eb-eyebrow">Reservations</div>
                    <h1>Choose your table</h1>
                </div>

                {error && <div className="eb-alert eb-alert--error">{error}</div>}

                <div className="eb-grid eb-grid--auto">
                    {tables.map((t) => (
                        <div className="eb-card eb-card--pad" key={t.id} style={{ display: "flex", flexDirection: "column", opacity: t.isAvailable ? 1 : 0.6 }}>
                            <div className="eb-between" style={{ marginBottom: 10 }}>
                                <span style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 600, fontSize: 25 }}>Table #{t.tableNumber}</span>
                                <span className={`eb-badge ${t.isAvailable ? "is-available" : "is-cancelled"}`}>{t.isAvailable ? "Available" : "Booked"}</span>
                            </div>
                            <div style={{ display: "flex", gap: 14, fontSize: 13, color: "var(--muted2)", marginBottom: 7 }}>
                                <span>Seats {t.capacity}</span>
                                <span>· {t.location}</span>
                            </div>
                            {t.description && <p style={{ fontSize: 12.5, color: "var(--muted)", lineHeight: 1.5, margin: "0 0 16px", minHeight: 36 }}>{t.description}</p>}
                            {t.isAvailable && (
                                <button className="eb-btn eb-btn--primary eb-btn--block" style={{ marginTop: "auto" }} onClick={() => navigate(`/customer/reserve/${t.id}`)}>Reserve this table</button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default BrowseTables;
