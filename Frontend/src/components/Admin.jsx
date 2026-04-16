const VITE_API_URL = import.meta.env.VITE_API_URL
import { useState, useEffect } from "react"

export default function Admin({children}){
    const [admin, setAdmin] = useState(false)

    async function is_admin(){
        const token = localStorage.getItem('token')
        const response = await fetch(`${VITE_API_URL}/admin`,{
            headers: {'Authorization': `Bearer ${token}`}
        })

        console.log(response);

        const data = await response.json()

        setAdmin(data.is_admin)
    }

    useEffect(()=>{ is_admin() }, [])

    return admin ? children : null

}