import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

function CustomerDashboard() {
    const navigate = useNavigate();

    return (
        <div>
            <Navbar />
            <div className="page-header" style={{ background: "linear-gradient(135deg, #0f3460, #533483)" }}>
                <div className="container">
                    <h2>Welcome to Our Restaurant</h2>
                    <p className="mb-0 opacity-75">Find tables, make reservations, and explore our menu</p>
                </div>
            </div>
            <div className="container">
                <div className="row g-4">
                    <div className="col-md-4">
                        <div className="card dash-card blue">
                            <h3>Browse Tables</h3>
                            <p>Find the perfect table for your occasion</p>
                            <button className="btn btn-primary btn-lg mt-auto" onClick={() => navigate("/customer/tables")}>Browse Tables</button>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card dash-card green">
                            <h3>My Reservations</h3>
                            <p>View and manage your bookings</p>
                            <button className="btn btn-success btn-lg mt-auto" onClick={() => navigate("/customer/my-reservations")}>My Reservations</button>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card dash-card orange">
                            <h3>Our Menu</h3>
                            <p>Explore our delicious dishes</p>
                            <button className="btn btn-warning btn-lg mt-auto" onClick={() => navigate("/customer/menu")}>View Menu</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CustomerDashboard;