import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
const VITE_API_URL = import.meta.env.VITE_API_URL

export default function User_Logged({children}){
    const [logged, setLogged] = useState(false)

    async function is_logged(){
        const token = localStorage.getItem('token')
        const response = await fetch(`${VITE_API_URL}/islogged`,{
            headers: {'Authorization' : `Bearer ${token}`}
        })
        const data = await response.json()
        console.log(response)
        setLogged(data.logged)
    }

    useEffect(()=>{ is_logged() }, [])
    
    
    return (
        logged ? children : <Link to="/login" className="headers" id="login-header">Login</Link>
    )
}