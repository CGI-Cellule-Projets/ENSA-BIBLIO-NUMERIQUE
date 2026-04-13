import { useEffect, useState } from "react"
import Module from "./Module";
import { useNavigate } from "react-router-dom";
const VITE_API_URL = import.meta.env.VITE_API_URL; 

export default function Filiere({ name, number, filiere_id }) {
    const [visible, setVisible] = useState(false)
    const [modules, setModules] = useState([])
    const [selectedSemester, setSelectedSemester] = useState(null)
    const navigate = useNavigate()

    

    function semester_click(semester_num) {
        navigate(`/filiere/${filiere_id}/semester/${semester_num}/modules`)
    }

    let list = []
    for (let i = 0; i < number; i++) {
        list.push(i + 1);
    }

    return (
        <>
            <button id="filiere_card" onClick={() => setVisible(!visible)}>{name}</button>
            <div className={`semester_dropdown ${visible ? "visible" : ""}`}>
                {list.map((number) => (
                    <button key={number} className="filiere_button" onClick={() => semester_click(number)}>
                        <span>S{number}</span>
                    </button>
                ))}
            </div>
        </>
    )
}