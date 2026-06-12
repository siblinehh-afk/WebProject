import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/api";

function Login() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: "x", email: "", passwordHash: "", role: "x" });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await login(form);
            localStorage.setItem("token", result.data.token);
            localStorage.setItem("role", result.data.role);
            localStorage.setItem("name", result.data.name);
            localStorage.setItem("userId", result.data.id);
            if (result.data.role === "Admin") {
                navigate("/admin/dashboard");
            } else {
                navigate("/customer/dashboard");
            }
        } catch {
            setError("Invalid email or password");
        }
    };

    return (
        <div className="auth-bg">
            <div className="auth-card">
                <h2 className="text-center">Restaurant Login</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Email</label>
                        <input type="email" name="email" className="form-control form-control-lg" placeholder="Enter your email" onChange={handleChange} required />
                    </div>
                    <div className="mb-4">
                        <label className="form-label fw-bold">Password</label>
                        <input type="password" name="passwordHash" className="form-control form-control-lg" placeholder="Enter your password" onChange={handleChange} required />
                    </div>
                    <button className="btn btn-primary btn-lg w-100 mb-3">Login</button>
                </form>
                <p className="text-center mb-0">Don't have an account? <Link to="/register">Register here</Link></p>
            </div>
        </div>
    );
}

export default Login;