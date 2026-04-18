import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const VITE_API_URL = import.meta.env.VITE_API_URL

export default function Register() {
    const navigate = useNavigate()
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

            const response = await fetch(`${VITE_API_URL}/register`,{
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    firstname: firstName,
                    lastname: lastName,
                    username: username,
                    email: email,
                    hashed_password: password,
                    admin: false,
                })
            })

            console.log(response);
            setFirstName("");
            setLastName("");
            setUsername("");
            setPassword("");

            if(response.status == 201) {navigate('/login');}

            else {setStatus("Error in register, try again")}

        }


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
                                placeholder="Prénom"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <div className="input_group">
                            <label className="input_label">Nom</label>
                            <input
                                className="name_input"
                                type="text"
                                placeholder="Nom"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="input_group">
                        <label className="input_label">Email</label>
                        <input
                            className="login_input"
                            type="text"
                            placeholder="Email@example.dom"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
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
                    <p id="login_register2">{status}</p>
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