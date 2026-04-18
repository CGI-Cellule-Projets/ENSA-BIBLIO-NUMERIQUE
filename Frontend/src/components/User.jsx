import { useState, useEffect } from "react"
import { FaUserCircle } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import Admin from "./Admin"
const VITE_API_URL = import.meta.env.VITE_API_URL

export default function User() {
    const [username, setUsername] = useState("")
    const navigate = useNavigate()

    async function onAdd() {
        const token = localStorage.getItem('token')
        const response = await fetch(`${VITE_API_URL}/username`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        const data = await response.json()
        setUsername(data.username)
    }

    useEffect(() => { onAdd() }, [])

    function handleLogout() {
        localStorage.removeItem('token')
        window.location.href = '/login'
    }

    return (
        <div className="user-menu">
            <button className="user-btn">
                <FaUserCircle size={30} />
                {username}
            </button>
            <div className="user-dropdown">
                <div className="dropdown-header">
                    <span>{username}</span>
                </div>
                <button className="dropdown-item" onClick={() => navigate('/account_management')} >Mon Profile</button>
                <Admin><button className="dropdown-item" onClick={() => navigate('/users_management')}>Gestions d'utilisateurs</button></Admin>
                <hr className="dropdown-divider" />
                <button className="dropdown-item danger" onClick={handleLogout}>
                    Se Deconnecter
                </button>
            </div>
        </div>
    )
}