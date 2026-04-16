import { useEffect, useState } from "react"
import Admin from "./Admin";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
const VITE_API_URL = import.meta.env.VITE_API_URL; 

export default function Filiere({ name, number, filiere_id, onDelete }) {
    const [visible, setVisible] = useState(false)
    const navigate = useNavigate()

    

    function semester_click(semester_num) {
        navigate(`/filiere/${filiere_id}/semester/${semester_num}/modules`)
    }

    async function delete_filiere(){
        const response = await fetch(`${VITE_API_URL}/delete_filiere/${filiere_id}`,{
            method: 'DELETE',
        })
        onDelete();
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
            <Admin><button className="delete-btn" onClick={delete_filiere}><MdDelete /></button></Admin>
            </div>
        </>
    )
}