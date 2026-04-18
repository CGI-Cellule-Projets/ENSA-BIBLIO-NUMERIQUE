import { FaUserCircle, FaTrash, FaEdit } from "react-icons/fa";
const VITE_API_URL = import.meta.env.VITE_API_URL;
import { useState } from "react";


export default function User_in_list({firstname, email, admin, user_id}) {
    const [role, setRole] = useState(admin ? "1" : "0")

    async function delete_user(){
        const response = await fetch(`${VITE_API_URL}/delete_user/${user_id}`,{
            method: 'DELETE'
        })
        console.log(response);
    }

    async function update_role(){
        const response = await fetch(`${VITE_API_URL}/update_role/${user_id}`,{
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ admin: parseInt(role) })
        })
        console.log(response);
    }

    return (
        <div className="user_row">
            <FaUserCircle size={36} color="#a35b39" />
            <div className="user_info">
                <p className="user_name">{firstname}</p>
                <p className="user_email">{email}</p>
            </div>
            <select className="role_select" value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="0">Étudiant</option>
                <option value="1">Admin</option>
            </select>
            <button onClick={update_role} className="secondary_btn">Confirmer</button>
            <button onClick={delete_user} className="delete-btn">Supprimer</button>
        </div>
    )
}