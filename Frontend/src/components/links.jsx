import { Link } from "react-router-dom";
import User_Logged from "./Islogged";
import User from "./User";


export default function Links(){
    return (
        <nav id = "header-container">
                    <Link to="/" className="headers" id="home-header">Home</Link>
                    <Link to="/filiere" className="headers" id="posts-header">Filiere</Link>
                    <Link className="headers" id="personal-header">Personal Posts</Link>
                    <Link to="/edit" className="headers" id="account-header">Account Management</Link>
                    <User_Logged> <User /> </User_Logged>
        </nav>
    )
}