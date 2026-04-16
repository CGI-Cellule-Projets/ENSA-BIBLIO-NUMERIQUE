import { useState } from "react"
import AddPDFForm from "./PDF_form";
import Admin from "./Admin";
import { useNavigate } from "react-router-dom";


export default function Module({name, module_id, filiere_id}){
    const [visible, setVisible] = useState(false)
    const navigate = useNavigate();

    function semester_click(genre) {
        navigate(`/filiere/${filiere_id}/semester/${genre}/modules/${module_id}`)
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
            </div>
        </>
        
    )
}