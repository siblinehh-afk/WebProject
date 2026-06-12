import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { getMyReservations, deleteReservation } from "../../services/api";

function MyReservations() {
    const [reservations, setReservations] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => { loadReservations(); }, []);

    const loadReservations = async () => {
        try { const result = await getMyReservations(); setReservations(result.data); }
        catch { setError("Failed to load reservations"); }
    };

    const handleCancel = async (id) => {
        if (!window.confirm("Cancel this reservation?")) return;
        await deleteReservation(id);
        loadReservations();
    };

    return (
        <div>
            <Navbar />
            <div className="page-header" style={{ background: "linear-gradient(135deg, #0f3460, #533483)" }}>
                <div className="container"><h2>My Reservations</h2></div>
            </div>
            <div className="container">
                {error && <div className="alert alert-danger">{error}</div>}
                {reservations.length === 0 ? (
                    <div className="alert alert-info">You have no reservations yet.</div>
                ) : (
                    <div className="row g-4">
                        {reservations.map((r) => (
                            <div className="col-md-4" key={r.id}>
                                <div className={`card reservation-card ${r.status === "Confirmed" ? "confirmed" : r.status === "Cancelled" ? "cancelled" : ""}`}>
                                    <h5 className="fw-bold">Table #{r.table?.tableNumber}</h5>
                                    <p className="mb-1">Date: {r.reservationDate?.split("T")[0]}</p>
                                    <p className="mb-1">Time: {r.timeSlot}</p>
                                    <p className="mb-1">Guests: {r.guestCount}</p>
                                    <span className={`badge ${r.status === "Confirmed" ? "bg-success" : r.status === "Cancelled" ? "bg-danger" : "bg-warning text-dark"} mb-3`} style={{ width: "fit-content" }}>{r.status}</span>
                                    {r.status === "Pending" && <button className="btn btn-danger btn-sm" onClick={() => handleCancel(r.id)}>Cancel Reservation</button>}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default MyReservations;