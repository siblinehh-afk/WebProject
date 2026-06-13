import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

function AdminDashboard() {
    const navigate = useNavigate();

    return (
        <div>
            <Navbar />
            <div className="eb-container eb-section">
                <div className="eb-hero" style={{ marginBottom: 28 }}>
                    <div className="eb-eyebrow">Staff · Floor manager</div>
                    <h1>Admin Dashboard</h1>
                    <p>Manage tonight's service — tables, reservations and the menu.</p>
                </div>

                <div className="eb-grid eb-grid--3">
                    <div className="eb-card eb-tile">
                        <h3>Tables</h3>
                        <p>Add, edit and manage restaurant tables.</p>
                        <button className="eb-btn eb-btn--primary eb-btn--block" style={{ marginTop: "auto" }} onClick={() => navigate("/admin/tables")}>Manage Tables</button>
                    </div>
                    <div className="eb-card eb-tile green">
                        <h3>Reservations</h3>
                        <p>View and manage all customer reservations.</p>
                        <button className="eb-btn eb-btn--success eb-btn--block" style={{ marginTop: "auto" }} onClick={() => navigate("/admin/reservations")}>All Reservations</button>
                    </div>
                    <div className="eb-card eb-tile gold">
                        <h3>Menu</h3>
                        <p>Create and update menu items.</p>
                        <button className="eb-btn eb-btn--gold eb-btn--block" style={{ marginTop: "auto" }} onClick={() => navigate("/admin/menu")}>Manage Menu</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
