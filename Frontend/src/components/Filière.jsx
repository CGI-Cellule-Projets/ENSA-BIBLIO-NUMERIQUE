import { useState } from "react"


export default function Filiere({nom, number}){
    const [visible, setVisible] = useState(false)
        let list = []
        for(let i=0; i<number; i++){
            list.push(i+1);
        }
        return(
        <>
            <button id="filiere_card" onClick={() => setVisible(!visible)}>{nom}</button>
            <div className={`semester_dropdown ${visible ? "visible" : ""}`}>{list.map((number)=>(<button className="filiere_button">S{number}</button>))}</div>
        </>
        )
}


    /*return (
        <>
            <button id="filiere_card" onClick={() => setVisible(!visible)}>{nom}</button>
            <div className={`semester_dropdown ${visible ? "visible" : ""}`}><button className="filiere_button">S1</button> <button className="filiere_button">S2</button></div>
        </>
    )
}*/