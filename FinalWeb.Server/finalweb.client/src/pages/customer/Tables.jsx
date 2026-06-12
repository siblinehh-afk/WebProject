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
            <div className="container mt-4">
                <h2 className="mb-4 fw-bold">Available Tables</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="row g-4">
                    {tables.map((t) => (
                        <div className="col-md-4" key={t.id}>
                            <div className={`card shadow-lg p-4 h-100 ${!t.isAvailable ? "opacity-50" : ""}`} style={{ borderRadius: "15px" }}>
                                <h4 className="fw-bold">Table #{t.tableNumber}</h4>
                                <p className="mb-1">Capacity: {t.capacity} seats</p>
                                <p className="mb-1">Location: {t.location}</p>
                                {t.description && <p className="text-muted">{t.description}</p>}
                                <span className={`badge ${t.isAvailable ? "bg-success" : "bg-danger"} mb-3`} style={{ width: "fit-content" }}>{t.isAvailable ? "Available" : "Unavailable"}</span>
                                {t.isAvailable && <button className="btn btn-primary mt-auto" onClick={() => navigate(`/customer/reserve/${t.id}`)}>Reserve This Table</button>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default BrowseTables;