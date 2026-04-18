import { Link } from "react-router-dom";
import User_Logged from "./Islogged";
import User from "./User";


export default function Links_Top(){
    return (
        <nav id = "header-container">
                    <Link to="/" className="headers" id="home-header">Home</Link>
                    <Link to="/filiere" className="headers" id="posts-header">Filiere</Link>
                    <Link to="/ouvrages" className="headers" id="personal-header">Ouvrages Utiles</Link>
                    <User_Logged> <User /> </User_Logged>
        </nav>
    )
}