import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

function CustomerDashboard() {
    const navigate = useNavigate();
    const name = localStorage.getItem("name");

    return (
        <div>
            <Navbar />
            <div className="eb-container eb-section">
                <div className="eb-hero" style={{ marginBottom: 28 }}>
                    <div className="eb-eyebrow">Welcome back{name ? `, ${name.split(" ")[0]}` : ""}</div>
                    <h1>A seasonal table,<br />lit by fire.</h1>
                    <p>Find a table, manage your reservations and explore tonight's wood-fired menu.</p>
                    <button className="eb-btn eb-btn--primary" onClick={() => navigate("/customer/tables")}>Reserve a table</button>
                </div>

                <div className="eb-grid eb-grid--3">
                    <div className="eb-card eb-tile">
                        <h3>Reserve a Table</h3>
                        <p>Find the perfect table for your occasion.</p>
                        <button className="eb-btn eb-btn--primary eb-btn--block" style={{ marginTop: "auto" }} onClick={() => navigate("/customer/tables")}>Browse Tables</button>
                    </div>
                    <div className="eb-card eb-tile green">
                        <h3>My Reservations</h3>
                        <p>View and manage your bookings.</p>
                        <button className="eb-btn eb-btn--success eb-btn--block" style={{ marginTop: "auto" }} onClick={() => navigate("/customer/my-reservations")}>My Reservations</button>
                    </div>
                    <div className="eb-card eb-tile gold">
                        <h3>Our Menu</h3>
                        <p>Explore our seasonal dishes.</p>
                        <button className="eb-btn eb-btn--gold eb-btn--block" style={{ marginTop: "auto" }} onClick={() => navigate("/customer/menu")}>View Menu</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CustomerDashboard;
