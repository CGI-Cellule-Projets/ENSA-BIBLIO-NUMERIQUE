import { useState } from "react"
import AddPDFForm from "./PDF_form";
import Admin from "./Admin";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
const VITE_API_URL = import.meta.env.VITE_API_URL


export default function Module({name, module_id, filiere_id, onDelete}){
    const [visible, setVisible] = useState(false)
    const navigate = useNavigate();

    function semester_click(genre) {
        navigate(`/filiere/${filiere_id}/semester/${genre}/modules/${module_id}`)
    }

    async function delete_module(){
        const token = localStorage.getItem('token')
        const response = await fetch(`${VITE_API_URL}/delete_module/${module_id}`,{
            method: 'DELETE',
            headers: {'AUthorization' : `Bearer ${token}`}
        })
        console.log(response)

        onDelete();
    }



    let list = ["Cours","Td","Exam"];

    return (
        <>
            <button id="filiere_card" onClick={() => setVisible(!visible)}>{name}</button>
            <div className={`semester_dropdown ${visible ? "visible" : ""}`}>
                {list.map((number) => (
                    <button key={number} className="filiere_button" onClick={() => semester_click(number)} >
                        <span>{number}</span>
                    </button>
                ))}
                <Admin><AddPDFForm  module_id={module_id}  /></Admin>
                <Admin><button className="delete-btn" onClick={delete_module}><MdDelete /></button></Admin>
            </div>
        </>
        
    )
}