const VITE_API_URL = import.meta.env.VITE_API_URL

export default function PDF({ pdf_id, name, path, thumbnail }) {
    
    return (
        <div className="pdf_card_wrapper">
            <a href={`${VITE_API_URL}/${path}`} target="_blank" rel="noreferrer" className="pdf_card">
                <div className="pdf_icon">
                    <img className="pdf_icon" src={`data:image/png;base64,${thumbnail}`} alt="" />
                </div>
                <div className="pdf_info">
                    <p className="pdf_name">{name}</p>
                    <p className="pdf_open">Ouvrir le document →</p>
                </div>
            </a>
            <button className="pdf_delete_btn">✕</button>
        </div>
    )
}