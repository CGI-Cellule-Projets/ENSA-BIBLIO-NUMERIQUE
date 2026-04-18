import { useEffect, useState } from "react";
import { FaUserCircle, FaTrash, FaEdit } from "react-icons/fa";
import Admin from "./Admin";
import User_in_list from "./user_to_delete";
const VITE_API_URL = import.meta.env.VITE_API_URL;

export default function AccountManagement({firstpage}) {
    const [activeTab, setActiveTab] = useState(firstpage);

    return (
        <div id="account_page">
            <div id="account_sidebar">
                <button className={`sidebar_btn ${activeTab === "profile" ? "active" : ""}`}
                    onClick={() => setActiveTab("profile")}>
                    Mon profil
                </button>
                <Admin>
                    <button className={`sidebar_btn ${activeTab === "users" ? "active" : ""}`}
                        onClick={() => setActiveTab("users")}>
                        Utilisateurs
                    </button>
                </Admin>
            </div>

            <div id="account_content">
                {activeTab === "profile" && <ProfileTab />}
                {activeTab === "users" && <UsersTab />}
            </div>
        </div>
    );
}

function ProfileTab() {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("");


    async function get_user(){
        const token = localStorage.getItem('token')
        const response = await fetch(`${VITE_API_URL}/get_current`,{
            headers: {'Authorization': `Bearer ${token}`}
        })
        const data = await response.json()
        console.log(response);

        setFirstname(data.firstname)
        setLastname(data.lastname)
        setEmail(data.email)
    }

    async function updateUser(){
        const token = localStorage.getItem("token");
        const response = await fetch(`${VITE_API_URL}/update_user`,{
            method: 'PUT',
            headers: {'Authorization' : `Bearer ${token}`,'Content-type' : 'application/json'},
            body: JSON.stringify({
                firstname: firstname,
                lastname: lastname,
                email: email
            })
        });

        console.log(response);
        const data = await response.json()
        setStatus(data.message);
    }

    useEffect(()=> { get_user() }, [])

    return (
        <div className="account_section">
            <h2 className="section_title">Mon profil</h2>

            <div id="avatar_row">
                <FaUserCircle size={72} color="#a35b39" />
                <h3> {status} </h3>
            </div>

            <div className="input_group">
                <label className="input_label">Prenom</label>
                <input className="login_input" value={firstname}
                    onChange={(e) => setFirstname(e.target.value)} />
            </div>

            <div className="input_group">
                <label className="input_label">Nom</label>
                <input className="login_input" value={lastname}
                    onChange={(e) => setLastname(e.target.value)} />
            </div>

            <div className="input_group">
                <label className="input_label">Email</label>
                <input className="login_input" type="email" value={email}
                    onChange={(e) => setEmail(e.target.value)} />
            </div>

            <button id="save_btn" onClick={updateUser} >Enregistrer</button>
        </div>
    );
}

function UsersTab() {
    const [users, setUsers] = useState([])
    const [search, setSearch] = useState("")
    const filtered = users.filter(u => 
        u.firstname.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    )

    async function get_users(){
        const response = await fetch(`${VITE_API_URL}/get_users`)
        const data = await response.json()
        console.log(response);
        
        setUsers(data)
        console.log(data)
    }


    useEffect(()=> { get_users() }, [])

    return (
        <div className="account_section">
            <h2 className="section_title">Gestion des utilisateurs</h2>
            <input className="login_input" placeholder="Rechercher un utilisateur..."
                value={search} onChange={(e) => setSearch(e.target.value)} 
                style={{marginBottom: "16px"}} />
            <div id="users_list">
                {filtered.map((user) => ( <User_in_list key={user.id} firstname={user.firstname} email={user.email} admin={user.admin} user_id={user.id}  /> ))}
            </div>
        </div>
    );
}
