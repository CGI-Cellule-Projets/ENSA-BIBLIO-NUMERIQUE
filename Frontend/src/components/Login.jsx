import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const VITE_API_URL = import.meta.env.VITE_API_URL
import '../style/style.css'

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState("");
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault();


        const response = await fetch(`${VITE_API_URL}/login`,{
            method: 'POST',
            headers:{"Content-Type": "application/x-www-form-urlencoded"},
            body: new URLSearchParams({
                username : username,
                password : password
            })
        })

        const data = await response.json()

        if(response.status == 400){setStatus("Invalid Credentials")}


        else{navigate('/')}

        localStorage.setItem('token', data.access_token);


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
                    <p id="login_register2">{status}</p>
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