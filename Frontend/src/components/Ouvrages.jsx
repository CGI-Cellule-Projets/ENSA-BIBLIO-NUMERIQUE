import { useEffect, useState } from "react"
import AddOuvrageForm from "./Upload_ouvrage"
import PDF from "./PDF"
import Admin from "./Admin"

const VITE_API_URL = import.meta.env.VITE_API_URL

export default function Ouvrages(){
    const [ouvrages, setOuvrages] = useState([])
    
    async function ouvrage(){
        const response = await fetch(`${VITE_API_URL}/ouvrages`)
        const data = await response.json()
        console.log(response)
        setOuvrages(data)
    }

    useEffect(()=>{ ouvrage() }, [])



    return(
        <>
            <div id="pdf_page">
                <h1 style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#a35b39"
                }} >{"Ouvrages"}</h1>
                <div id="pdf_grid">
                    {ouvrages.map((
                        (element) => <PDF key={element.id} name={element.name} path={element.path} thumbnail={element.thumbnail} /> )
                    )}
                    
                </div>
                <Admin><AddOuvrageForm /></Admin>
            </div>
        </>
    )        
}