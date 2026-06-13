import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { getTableById, createReservation } from "../../services/api";

const TIME_SLOTS = [
    "12:00 PM - 2:00 PM",
    "2:00 PM - 4:00 PM",
    "5:00 PM - 7:00 PM",
    "7:00 PM - 9:00 PM",
    "9:00 PM - 11:00 PM",
];

function ReserveTable() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [table, setTable] = useState(null);
    const [form, setForm] = useState({ reservationDate: "", timeSlot: "", guestCount: 2 });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        loadTable();
    }, []);

    const loadTable = async () => {
        try {
            const result = await getTableById(id);
            setTable(result.data);
        } catch {
            setError("Failed to load table");
        }
    };

    const setGuests = (n) => setForm({ ...form, guestCount: Math.max(1, Math.min(table ? table.capacity : 99, n)) });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!form.reservationDate || !form.timeSlot) {
            setError("Please pick a date and time.");
            return;
        }

        if (parseInt(form.guestCount) > table.capacity) {
            setError(`Guest count cannot exceed ${table.capacity}`);
            return;
        }

        try {
            await createReservation({
                tableId: parseInt(id),
                reservationDate: form.reservationDate,
                timeSlot: form.timeSlot,
                guestCount: parseInt(form.guestCount)
            });
            setSuccess("Reservation created! Redirecting...");
            setTimeout(() => navigate("/customer/my-reservations"), 2000);
        } catch (err) {
            setError(err.response?.data || "Failed to create reservation");
        }
    };

    if (!table) return (<div><Navbar /><div className="eb-container eb-section">Loading…</div></div>);

    return (
        <div>
            <Navbar />
            <div className="eb-container eb-narrow eb-section">
                <div className="eb-head">
                    <div className="eb-eyebrow">Reservations</div>
                    <h1>Book Table #{table.tableNumber}</h1>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 20 }}>
                    <div className="eb-card eb-card--pad">
                        <div className="eb-between" style={{ marginBottom: 6 }}>
                            <span style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 600, fontSize: 24 }}>Table #{table.tableNumber}</span>
                            <span className="eb-badge is-available">Seats {table.capacity}</span>
                        </div>
                        <div style={{ fontSize: 13.5, color: "var(--muted2)" }}>{table.location}</div>
                        {table.description && <p style={{ fontSize: 13, color: "var(--muted)", margin: "8px 0 0" }}>{table.description}</p>}
                    </div>

                    <div className="eb-card eb-card--pad">
                        <h3 style={{ fontSize: 22, marginBottom: 18 }}>Make a reservation</h3>
                        {error && <div className="eb-alert eb-alert--error">{error}</div>}
                        {success && <div className="eb-alert eb-alert--success">{success}</div>}

                        <form onSubmit={handleSubmit}>
                            <div className="eb-field">
                                <label className="eb-label">Date</label>
                                <input className="eb-input" type="date" value={form.reservationDate}
                                    onChange={(e) => setForm({ ...form, reservationDate: e.target.value })} required />
                            </div>

                            <div className="eb-field">
                                <label className="eb-label">Time slot</label>
                                <div className="eb-row" style={{ gap: 9, flexWrap: "wrap" }}>
                                    {TIME_SLOTS.map((s) => (
                                        <button type="button" key={s}
                                            className={`eb-chip ${form.timeSlot === s ? "is-active" : ""}`}
                                            onClick={() => setForm({ ...form, timeSlot: s })}>{s}</button>
                                    ))}
                                </div>
                            </div>

                            <div className="eb-field">
                                <label className="eb-label">Guests (max {table.capacity})</label>
                                <div className="eb-row" style={{ gap: 16 }}>
                                    <button type="button" className="eb-btn eb-btn--ghost" style={{ width: 42, padding: 0 }} onClick={() => setGuests(form.guestCount - 1)}>−</button>
                                    <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, fontWeight: 600, minWidth: 30, textAlign: "center" }}>{form.guestCount}</span>
                                    <button type="button" className="eb-btn eb-btn--ghost" style={{ width: 42, padding: 0 }} onClick={() => setGuests(form.guestCount + 1)}>+</button>
                                </div>
                            </div>

                            <button className="eb-btn eb-btn--primary eb-btn--lg eb-btn--block" style={{ marginTop: 8 }}>Confirm reservation</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReserveTable;
