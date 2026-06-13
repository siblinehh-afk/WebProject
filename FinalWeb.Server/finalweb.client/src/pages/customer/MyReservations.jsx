import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { getMyReservations, deleteReservation } from "../../services/api";

function fmtDate(iso) {
    if (!iso) return { dow: "", day: "--", mon: "" };
    const d = new Date(iso);
    if (isNaN(d)) return { dow: "", day: iso, mon: "" };
    return {
        dow: d.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase(),
        day: String(d.getDate()).padStart(2, "0"),
        mon: d.toLocaleDateString("en-US", { month: "short" }),
    };
}

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
            <div className="eb-container eb-narrow eb-section">
                <div className="eb-head">
                    <div className="eb-eyebrow">Your visits</div>
                    <h1>My reservations</h1>
                </div>

                {error && <div className="eb-alert eb-alert--error">{error}</div>}

                {reservations.length === 0 ? (
                    <div className="eb-alert eb-alert--info">You have no reservations yet.</div>
                ) : (
                    <div className="eb-grid" style={{ gap: 13 }}>
                        {reservations.map((r) => {
                            const d = fmtDate(r.reservationDate);
                            const statusClass = r.status === "Confirmed" ? "is-confirmed" : r.status === "Cancelled" ? "is-cancelled" : "";
                            const badgeClass = r.status === "Confirmed" ? "is-confirmed" : r.status === "Cancelled" ? "is-cancelled" : "is-pending";
                            return (
                                <div className={`eb-card eb-res ${statusClass}`} key={r.id}>
                                    <div className="eb-res__date">
                                        <span style={{ fontSize: 11, letterSpacing: ".08em", color: "var(--muted)", fontWeight: 600 }}>{d.dow}</span>
                                        <span className="eb-res__day">{d.day}</span>
                                        <span style={{ fontSize: 11, color: "var(--muted)" }}>{d.mon}</span>
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 5 }}>Table #{r.table?.tableNumber}</div>
                                        <div style={{ display: "flex", gap: 16, fontSize: 13, color: "var(--muted2)", flexWrap: "wrap" }}>
                                            <span>{r.timeSlot}</span>
                                            <span>{r.guestCount} guests</span>
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 11 }}>
                                        <span className={`eb-badge ${badgeClass}`}>{r.status}</span>
                                        {r.status === "Pending" && (
                                            <button className="eb-btn eb-btn--danger eb-btn--sm" onClick={() => handleCancel(r.id)}>Cancel</button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

export default MyReservations;
