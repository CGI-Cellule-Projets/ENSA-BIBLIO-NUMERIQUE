import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Module from "./Module";
import Admin from "./Admin";
const VITE_API_URL = import.meta.env.VITE_API_URL; 
import AddModuleForm from "./Module_form";



export default function Modules(){
    const {filiere_id, semester_num} = useParams();
    const [modules, setModules] = useState([])
    const [filiere, setFiliere] = useState("")

    async function fetchModules() {
        const response = await fetch(`${VITE_API_URL}/filiere/${filiere_id}/semester/${semester_num}`)
        const data = await response.json()
        setModules(data)
    }

    async function get_filiere_name(){
        const response = await fetch(`${VITE_API_URL}/get_filiere/${filiere_id}`)
        const data = await response.json()
        setFiliere(data)
    }

    useEffect(() => { fetchModules(); get_filiere_name() }, [])


    return(
        <>
            <div id="filiere_box">
                <h1> {filiere} </h1> <h1>S{semester_num}</h1>
                {modules.map((element) => <Module key={element.id} name={element.name} module_id={element.id} filiere_id={filiere_id} onDelete={fetchModules} /> )}
                <Admin><AddModuleForm semester_id={semester_num} filiere_id={filiere_id}  onAdd={fetchModules} /></Admin>
            </div>
        </>
    )
}