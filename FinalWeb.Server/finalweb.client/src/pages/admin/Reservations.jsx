import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { getReservations, updateReservation, deleteReservation } from "../../services/api";

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

    return (
        <div>
            <Navbar />
            <div className="container mt-4">
                <h2 className="mb-4 fw-bold">All Reservations</h2>
                {error && <div className="alert alert-danger">{error}</div>}

                <div className="mb-3">
                    <div className="btn-group">
                        {["All", "Pending", "Confirmed", "Cancelled"].map(s => (
                            <button key={s} className={`btn ${filter === s ? "btn-primary" : "btn-outline-primary"}`} onClick={() => setFilter(s)}>{s}</button>
                        ))}
                    </div>
                </div>

                <table className="table table-bordered table-hover shadow">
                    <thead className="table-dark">
                        <tr>
                            <th>#</th><th>Customer</th><th>Table</th><th>Date</th><th>Time</th><th>Guests</th><th>Status</th><th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((r) => (
                            <tr key={r.id}>
                                <td>{r.id}</td>
                                <td>{r.user?.name}</td>
                                <td>Table #{r.table?.tableNumber}</td>
                                <td>{r.reservationDate?.split("T")[0]}</td>
                                <td>{r.timeSlot}</td>
                                <td>{r.guestCount}</td>
                                <td><span className={`badge ${r.status === "Confirmed" ? "bg-success" : r.status === "Cancelled" ? "bg-danger" : "bg-warning text-dark"}`}>{r.status}</span></td>
                                <td>
                                    {r.status === "Pending" && <button className="btn btn-success btn-sm me-2" onClick={() => handleStatus(r.id, "Confirmed")}>Confirm</button>}
                                    {r.status !== "Cancelled" && <button className="btn btn-danger btn-sm me-2" onClick={() => handleStatus(r.id, "Cancelled")}>Cancel</button>}
                                    <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(r.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminReservations;