const VITE_API_URL = import.meta.env.VITE_API_URL
import Admin from "./Admin";

export default function PDF({ pdf_id, name, path, thumbnail, onDelete, style}) {
    
    async function delete_pdf(){
        const token = localStorage.getItem('token');
        const response = await fetch(`${VITE_API_URL}/delete_pdf/${pdf_id}`,{
            method: 'DELETE',
            headers: {'Authorization' : `Bearer ${token}`}
        })

        console.log(response)
        onDelete();
    }

    return (
        <div className="pdf_card_wrapper" style={style} >
            <a href={`${VITE_API_URL}/${path}`} target="_blank" rel="noreferrer" className="pdf_card">
                <div className="pdf_icon">
                    <img className="pdf_icon" src={`data:image/png;base64,${thumbnail}`} alt="" />
                </div>
                <div className="pdf_info">
                    <p className="pdf_name">{name}</p>
                    <p className="pdf_open">Ouvrir le document →</p>
                </div>
            </a>
            <Admin><button className="pdf_delete_btn" onClick={delete_pdf} >✕</button></Admin>
        </div>
    )
}