import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
const VITE_API_URL = import.meta.env.VITE_API_URL

export default function User(){
    const [username, setUsername] = useState("")

    async function onAdd(){
        const token = localStorage.getItem('token')
        const response = await fetch(`${VITE_API_URL}/username`,{
            headers: {'Authorization' : `Bearer ${token}`}
        })

        const data = await response.json()
        setUsername(data.username)


    }

    useEffect(()=>{ onAdd() }, [])


    return (
        <>
                <button className="user-btn" ><FaUserCircle size={30} />{username}</button>
        </>
    )
}