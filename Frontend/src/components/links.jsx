import { Link } from "react-router-dom";

export default function Links(){
    return (
        <nav id = "header-container">
                    <Link to="/home" className="headers" id="home-header">Home</Link>
                    <Link to="/filiere" className="headers" id="posts-header">Filiere</Link>
                    <Link className="headers" id="personal-header">Personal Posts</Link>
                    <Link to="/edit" className="headers" id="account-header">Account Management</Link>
                    <Link to="/login" className="headers" id="login-header">Login</Link>
        </nav>
    )
}