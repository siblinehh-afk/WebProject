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
        <div className="eb-auth">
            <div className="eb-auth__brand">
                <div className="eb-brand">
                    <span className="eb-brand__mark" />
                    <span className="eb-brand__name">EMBER</span>
                </div>
                <div>
                    <h1>A seat at<br />the table.</h1>
                    <p>Create an account to reserve tables and explore our seasonal, wood-fired menu.</p>
                </div>
                <div style={{ fontSize: 12.5, color: "#9C8F7D" }}>Open Tue–Sun · 5:30–11 PM · 14 Cedar Lane, Downtown</div>
            </div>

            <div className="eb-auth__form">
                <div style={{ width: "100%", maxWidth: 360 }}>
                    <h2 style={{ fontSize: "2rem", marginBottom: 6 }}>Create account</h2>
                    <p style={{ color: "var(--muted2)", margin: "0 0 24px" }}>Join us in a moment.</p>

                    {error && <div className="eb-alert eb-alert--error">{error}</div>}
                    {success && <div className="eb-alert eb-alert--success">{success}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="eb-field">
                            <label className="eb-label">Full name</label>
                            <input className="eb-input" type="text" name="name" placeholder="Your name" onChange={handleChange} required />
                        </div>
                        <div className="eb-field">
                            <label className="eb-label">Email</label>
                            <input className="eb-input" type="email" name="email" placeholder="you@email.com" onChange={handleChange} required />
                        </div>
                        <div className="eb-field">
                            <label className="eb-label">Password</label>
                            <input className="eb-input" type="password" name="passwordHash" placeholder="At least 6 characters" onChange={handleChange} required />
                        </div>
                        <button className="eb-btn eb-btn--primary eb-btn--lg eb-btn--block" style={{ marginTop: 6 }}>Create account</button>
                    </form>

                    <p style={{ textAlign: "center", marginTop: 18, fontSize: 13.5, color: "var(--muted2)" }}>
                        Already have an account? <Link to="/login" style={{ color: "var(--ember)", fontWeight: 600 }}>Sign in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;
