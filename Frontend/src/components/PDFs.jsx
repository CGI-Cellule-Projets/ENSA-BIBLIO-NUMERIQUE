const VITE_API_URL = import.meta.env.VITE_API_URL
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import PDF from "./PDF"

export default function PDFs_cours(){
    const [pdfs, setPdfs] = useState([])
    const {filiere_id, genre, module_id} = useParams();

    async function get_cours(){
        const response = await fetch(`${VITE_API_URL}/filiere/${filiere_id}/semester/${genre}/modules/${module_id}`)
        const data = await response.json()
        console.log(response)
        setPdfs(data)
    }

    useEffect(() => { get_cours() }, [])

    return(
        <>
            <div id="pdf_page">
                <h1 style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#a35b39"
                }} >{genre}</h1>
                <div id="pdf_grid">
                    {pdfs.map((
                        (element) => <PDF key={element.id} name={element.name} path={element.path} thumbnail={element.thumbnail} /> )
                    )}
                </div>
            </div>
        </>
    )
}