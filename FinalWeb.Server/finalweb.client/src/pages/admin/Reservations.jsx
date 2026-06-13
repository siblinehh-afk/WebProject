import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { getReservations, updateReservation, deleteReservation } from "../../services/api";

const FILTERS = ["All", "Pending", "Confirmed", "Cancelled"];

function AdminReservations() {
    const [reservations, setReservations] = useState([]);
    const [filter, setFilter] = useState("All");
    const [error, setError] = useState("");

    useEffect(() => {
        loadReservations();
    }, []);

    const loadReservations = async () => {
        try {
            const result = await getReservations();
            setReservations(result.data);
        } catch {
            setError("Failed to load reservations");
        }
    };

    const handleStatus = async (id, status) => {
        try {
            const reservation = reservations.find(r => r.id === id);
            await updateReservation(id, { ...reservation, status });
            loadReservations();
        } catch {
            setError("Failed to update status");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure?")) return;
        try {
            await deleteReservation(id);
            loadReservations();
        } catch {
            setError("Delete failed");
        }
    };

    const filtered = filter === "All" ? reservations : reservations.filter(r => r.status === filter);
    const badgeClass = (s) => s === "Confirmed" ? "is-confirmed" : s === "Cancelled" ? "is-cancelled" : "is-pending";

    return (
        <div>
            <Navbar />
            <div className="eb-container eb-section">
                <div className="eb-head">
                    <div className="eb-eyebrow">Staff · Floor manager</div>
                    <h1>All reservations</h1>
                </div>

                {error && <div className="eb-alert eb-alert--error">{error}</div>}

                <div className="eb-row" style={{ gap: 8, flexWrap: "wrap", marginBottom: 18 }}>
                    {FILTERS.map((s) => (
                        <button key={s} className={`eb-chip ${filter === s ? "is-active" : ""}`} onClick={() => setFilter(s)}>{s}</button>
                    ))}
                </div>

                <div className="eb-table-wrap">
                    <table className="eb-table">
                        <thead>
                            <tr><th>#</th><th>Customer</th><th>Table</th><th>Date</th><th>Time</th><th>Guests</th><th>Status</th><th style={{ textAlign: "right" }}>Actions</th></tr>
                        </thead>
                        <tbody>
                            {filtered.map((r) => (
                                <tr key={r.id}>
                                    <td>{r.id}</td>
                                    <td style={{ fontWeight: 500, color: "var(--ink)" }}>{r.user?.name}</td>
                                    <td>Table #{r.table?.tableNumber}</td>
                                    <td>{r.reservationDate?.split("T")[0]}</td>
                                    <td>{r.timeSlot}</td>
                                    <td>{r.guestCount}</td>
                                    <td><span className={`eb-badge ${badgeClass(r.status)}`}>{r.status}</span></td>
                                    <td>
                                        <div className="eb-row" style={{ gap: 8, justifyContent: "flex-end" }}>
                                            {r.status === "Pending" && <button className="eb-btn eb-btn--success eb-btn--sm" onClick={() => handleStatus(r.id, "Confirmed")}>Confirm</button>}
                                            {r.status !== "Cancelled" && <button className="eb-btn eb-btn--danger eb-btn--sm" onClick={() => handleStatus(r.id, "Cancelled")}>Cancel</button>}
                                            <button className="eb-btn eb-btn--ghost eb-btn--sm" onClick={() => handleDelete(r.id)}>Delete</button>
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

export default AdminReservations;
