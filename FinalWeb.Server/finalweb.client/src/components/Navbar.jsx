import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const name = localStorage.getItem("name");

    const logout = () => {
        localStorage.clear();
        navigate("/login");
    };

    const isActive = (path) => (location.pathname === path ? "active" : "");
    const home = role === "Admin" ? "/admin/dashboard" : "/customer/dashboard";
    const initials = name
        ? name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()
        : "EM";

    return (
        <header className="eb-topbar">
            <div className="eb-topbar__inner">
                <Link to={home} className="eb-brand">
                    <span className="eb-brand__mark" />
                    <span>
                        <span className="eb-brand__name">EMBER</span>
                        <span className="eb-brand__sub">KITCHEN &amp; BAR</span>
                    </span>
                </Link>

                <nav className="eb-nav">
                    {token && role === "Admin" && (
                        <>
                            <Link className={isActive("/admin/dashboard")} to="/admin/dashboard">Dashboard</Link>
                            <Link className={isActive("/admin/reservations")} to="/admin/reservations">Reservations</Link>
                            <Link className={isActive("/admin/menu")} to="/admin/menu">Menu</Link>
                            <Link className={isActive("/admin/tables")} to="/admin/tables">Tables</Link>
                        </>
                    )}
                    {token && role === "Customer" && (
                        <>
                            <Link className={isActive("/customer/dashboard")} to="/customer/dashboard">Home</Link>
                            <Link className={isActive("/customer/menu")} to="/customer/menu">Menu</Link>
                            <Link className={isActive("/customer/tables")} to="/customer/tables">Reserve</Link>
                            <Link className={isActive("/customer/my-reservations")} to="/customer/my-reservations">My Reservations</Link>
                        </>
                    )}
                </nav>

                <div className="eb-userbox">
                    {token ? (
                        <>
                            <span className="eb-welcome">Welcome, {name}</span>
                            <span className="eb-avatar">{initials}</span>
                            <button className="eb-btn eb-btn--ghost eb-btn--sm" onClick={logout}>Logout</button>
                        </>
                    ) : (
                        <Link className="eb-btn eb-btn--primary eb-btn--sm" to="/login">Login</Link>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Navbar;
