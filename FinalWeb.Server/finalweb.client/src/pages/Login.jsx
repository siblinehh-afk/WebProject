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
        <div className="eb-auth">
            <div className="eb-auth__brand">
                <div className="eb-brand">
                    <span className="eb-brand__mark" />
                    <span className="eb-brand__name">EMBER</span>
                </div>
                <div>
                    <h1>Reserved for<br />good evenings.</h1>
                    <p>Sign in to book your table, browse tonight's menu and manage your visits.</p>
                </div>
                <div style={{ fontSize: 12.5, color: "#9C8F7D" }}>Open Tue–Sun · 5:30–11 PM · 14 Cedar Lane, Downtown</div>
            </div>

            <div className="eb-auth__form">
                <div style={{ width: "100%", maxWidth: 360 }}>
                    <h2 style={{ fontSize: "2rem", marginBottom: 6 }}>Welcome back</h2>
                    <p style={{ color: "var(--muted2)", margin: "0 0 24px" }}>Sign in to your account.</p>

                    {error && <div className="eb-alert eb-alert--error">{error}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="eb-field">
                            <label className="eb-label">Email</label>
                            <input className="eb-input" type="email" name="email" placeholder="you@email.com" onChange={handleChange} required />
                        </div>
                        <div className="eb-field">
                            <label className="eb-label">Password</label>
                            <input className="eb-input" type="password" name="passwordHash" placeholder="••••••••" onChange={handleChange} required />
                        </div>
                        <button className="eb-btn eb-btn--primary eb-btn--lg eb-btn--block" style={{ marginTop: 6 }}>Sign in</button>
                    </form>

                    <p style={{ textAlign: "center", marginTop: 18, fontSize: 13.5, color: "var(--muted2)" }}>
                        Don't have an account? <Link to="/register" style={{ color: "var(--ember)", fontWeight: 600 }}>Register</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
