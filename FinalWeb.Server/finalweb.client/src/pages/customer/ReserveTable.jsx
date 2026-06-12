import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { getTableById, createReservation } from "../../services/api";

function ReserveTable() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [table, setTable] = useState(null);
    const [form, setForm] = useState({ reservationDate: "", timeSlot: "", guestCount: "" });
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

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

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

    if (!table) return <div className="container mt-5">Loading...</div>;

    return (
        <div>
            <Navbar />
            <div className="container mt-4">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card shadow-lg p-4 mb-4" style={{ borderRadius: "15px" }}>
                            <h4 className="fw-bold">Table #{table.tableNumber}</h4>
                            <p>Capacity: {table.capacity} seats</p>
                            <p>Location: {table.location}</p>
                            {table.description && <p className="text-muted">{table.description}</p>}
                        </div>

                        <div className="card shadow-lg p-4" style={{ borderRadius: "15px" }}>
                            <h4 className="fw-bold mb-3">Make a Reservation</h4>
                            {error && <div className="alert alert-danger">{error}</div>}
                            {success && <div className="alert alert-success">{success}</div>}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Date</label>
                                    <input type="date" name="reservationDate" className="form-control" value={form.reservationDate} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Time Slot</label>
                                    <select name="timeSlot" className="form-select" value={form.timeSlot} onChange={handleChange} required>
                                        <option value="">Select time</option>
                                        <option value="12:00 PM - 2:00 PM">12:00 PM - 2:00 PM</option>
                                        <option value="2:00 PM - 4:00 PM">2:00 PM - 4:00 PM</option>
                                        <option value="5:00 PM - 7:00 PM">5:00 PM - 7:00 PM</option>
                                        <option value="7:00 PM - 9:00 PM">7:00 PM - 9:00 PM</option>
                                        <option value="9:00 PM - 11:00 PM">9:00 PM - 11:00 PM</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Number of Guests</label>
                                    <input type="number" name="guestCount" className="form-control" value={form.guestCount} onChange={handleChange} min="1" max={table.capacity} required />
                                </div>
                                <button className="btn btn-primary btn-lg w-100">Confirm Reservation</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReserveTable;