import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const name = localStorage.getItem("name");

    const logout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
            <div className="container">
                <Link className="navbar-brand" to={role === "Admin" ? "/admin/dashboard" : "/customer/dashboard"}>
                    Restaurant App
                </Link>
                <div>
                    {token && role === "Admin" && (
                        <>
                            <Link className="btn btn-outline-light me-2" to="/admin/dashboard">Dashboard</Link>
                            <Link className="btn btn-outline-light me-2" to="/admin/tables">Tables</Link>
                            <Link className="btn btn-outline-light me-2" to="/admin/reservations">Reservations</Link>
                            <Link className="btn btn-outline-light me-2" to="/admin/menu">Menu</Link>
                        </>
                    )}
                    {token && role === "Customer" && (
                        <>
                            <Link className="btn btn-outline-light me-2" to="/customer/dashboard">Home</Link>
                            <Link className="btn btn-outline-light me-2" to="/customer/tables">Tables</Link>
                            <Link className="btn btn-outline-light me-2" to="/customer/my-reservations">My Reservations</Link>
                            <Link className="btn btn-outline-light me-2" to="/customer/menu">Menu</Link>
                        </>
                    )}
                    {token ? (
                        <>
                            <span className="text-white me-3">Welcome, {name}</span>
                            <button className="btn btn-danger" onClick={logout}>Logout</button>
                        </>
                    ) : (
                        <Link className="btn btn-success" to="/login">Login</Link>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;