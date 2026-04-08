import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = (e) => {
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
                    <div id="name_row">
                        <div className="input_group">
                            <label className="input_label">Prénom</label>
                            <input
                                className="name_input"
                                type="text"
                                placeholder="Yassine"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <div className="input_group">
                            <label className="input_label">Nom</label>
                            <input
                                className="name_input"
                                type="text"
                                placeholder="Alami"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                    </div>

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

                    <button id="login_btn" onClick={handleRegister}>
                        S'inscrire
                    </button>

                    <p id="login_register">
                        Déjà un compte ?{" "}
                        <Link to="/login" id="register_link">Se connecter</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}