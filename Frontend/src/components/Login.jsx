import { useState } from "react";
import { Link } from "react-router-dom";
import '../style/style.css'

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
    };

    return (
        <div id="login_page">
            <div id="login_card">
                <div id="login_header">
                    <h1 id="login_logo">ENSA</h1>
                    <p id="login_subtitle">Bibliothèque Numérique</p>
                </div>

                <div id="login_form">
                    <div className="input_group">
                        <label className="input_label">Nom d'utilisateur</label>
                        <input
                            className="login_input"
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="input_group">
                        <label className="input_label">Mot de passe</label>
                        <input
                            className="login_input"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button id="login_btn" onClick={handleLogin}>
                        Se connecter
                    </button>

                    <p id="login_register">
                        Pas encore de compte ?{" "}
                        <Link to="/register" id="register_link">S'inscrire</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}