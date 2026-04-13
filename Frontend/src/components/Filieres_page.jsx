import Filiere from "./Filière"
import AddFiliereForm from "./Form";
import { useState, useEffect } from 'react'
const VITE_API_URL = import.meta.env.VITE_API_URL; 

export default function Filiere_page(){
    const [filieres, setFilieres] = useState([])

    useEffect(()=>{
        async function get_filiere(){
            const response = await fetch(`${VITE_API_URL}/get_filiere`)
            const data = await response.json()
            console.log(response)
            setFilieres(data)
        }

        get_filiere();
    }, [])

    return (
        <>
            <div id="filiere_box">
                <h1>Choisissez votre filière</h1>
                <br />
                {filieres.map((element)=>( <Filiere key={element.id} name={element.name} number={element.duration} filiere_id={element.id} /> ))}
                <AddFiliereForm />
            </div>
        </>
    )
}