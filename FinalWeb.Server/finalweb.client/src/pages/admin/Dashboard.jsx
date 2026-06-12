import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

function AdminDashboard() {
    const navigate = useNavigate();

    return (
        <div>
            <Navbar />
            <div className="page-header">
                <div className="container">
                    <h2>Admin Dashboard</h2>
                    <p className="mb-0 opacity-75">Manage your restaurant</p>
                </div>
            </div>
            <div className="container">
                <div className="row g-4">
                    <div className="col-md-4">
                        <div className="card dash-card blue">
                            <h3>Tables</h3>
                            <p>Add, edit and manage restaurant tables</p>
                            <button className="btn btn-primary btn-lg mt-auto" onClick={() => navigate("/admin/tables")}>Manage Tables</button>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card dash-card green">
                            <h3>Reservations</h3>
                            <p>View and manage all customer reservations</p>
                            <button className="btn btn-success btn-lg mt-auto" onClick={() => navigate("/admin/reservations")}>All Reservations</button>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card dash-card orange">
                            <h3>Menu</h3>
                            <p>Create and update menu items</p>
                            <button className="btn btn-warning btn-lg mt-auto" onClick={() => navigate("/admin/menu")}>Manage Menu</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;