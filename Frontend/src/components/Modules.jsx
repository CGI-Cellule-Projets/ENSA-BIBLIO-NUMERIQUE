import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Module from "./Module";
const VITE_API_URL = import.meta.env.VITE_API_URL; 
import AddModuleForm from "./Module_form";



export default function Modules(){
    const {filiere_id, semester_num} = useParams();
    const [modules, setModules] = useState([])

    async function fetchModules() {
        const response = await fetch(`${VITE_API_URL}/filiere/${filiere_id}/semester/${semester_num}`)
        const data = await response.json()
        setModules(data)
    }

    useEffect(() => { fetchModules() }, [])

    /* useEffect(() => {

        async function get_modules() {
            const response = await fetch(`${VITE_API_URL}/filiere/${filiere_id}/semester/${semester_num}`);
            const data = await response.json()
            setModules(data)
        }
        get_modules();
    }, []) */


    return(
        <>
            <div id="filiere_box">
                {modules.map((element) => <Module key={element.id} name={element.name} /> )}
                <AddModuleForm semester_id={semester_num} onAdd={fetchModules} />
            </div>
        </>
    )
}