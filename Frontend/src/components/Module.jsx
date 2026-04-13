import { useState } from "react"
import AddModuleForm from "./Module_form";


export default function Module({name}){
    const [visible, setVisible] = useState(false)


    let list = ["Cours","TD","Exam"];

    return (
        <>
            <button id="filiere_card" onClick={() => setVisible(!visible)}>{name}</button>
            <div className={`semester_dropdown ${visible ? "visible" : ""}`}>
                {list.map((number) => (
                    <button key={number} className="filiere_button" >
                        {number}
                    </button>
                ))}
            </div>
        </>
        
    )
}