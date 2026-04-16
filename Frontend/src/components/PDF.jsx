import { useNavigate } from "react-router-dom";
const VITE_API_URL = import.meta.env.VITE_API_URL

export default function PDF({ name, path, thumbnail }) {
    return (
        <a href={`${VITE_API_URL}/${path}`} target="_blank" rel="noreferrer" className="pdf_card">
            <div className="pdf_icon">
                <img className="pdf_icon" src={`data:image/png;base64,${thumbnail}`} alt="" />
            </div>
            <div className="pdf_info">
                <p className="pdf_name">{name}</p>
                <p className="pdf_open">Ouvrir le document →</p>
            </div>
        </a>
    )
}