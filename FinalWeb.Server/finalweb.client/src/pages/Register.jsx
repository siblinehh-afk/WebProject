import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../services/api";

function Register() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: "", email: "", passwordHash: "" });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.passwordHash.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }
        try {
            await register(form);
            setSuccess("Registered successfully! Redirecting...");
            setTimeout(() => navigate("/login"), 2000);
        } catch (err) {
            setError(err.response?.data || "Registration failed");
        }
    };

    return (
        <div className="auth-bg">
            <div className="auth-card">
                <h2 className="text-center">Create Account</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Full Name</label>
                        <input type="text" name="name" className="form-control form-control-lg" placeholder="Enter your name" onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Email</label>
                        <input type="email" name="email" className="form-control form-control-lg" placeholder="Enter your email" onChange={handleChange} required />
                    </div>
                    <div className="mb-4">
                        <label className="form-label fw-bold">Password</label>
                        <input type="password" name="passwordHash" className="form-control form-control-lg" placeholder="Create a password" onChange={handleChange} required />
                    </div>
                    <button className="btn btn-success btn-lg w-100 mb-3">Register</button>
                </form>
                <p className="text-center mb-0">Already have an account? <Link to="/login">Login here</Link></p>
            </div>
        </div>
    );
}

export default Register;