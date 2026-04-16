import { useState } from "react";
const VITE_API_URL = import.meta.env.VITE_API_URL; 

export default function AddPDFForm({ module_id}) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [genre, setGenre] = useState("Cours");
    const [path, setPath] = useState("")
    const [file, setFile] = useState(null);

async function handleSubmit() {
    const formData = new FormData();
    formData.append("module_id", module_id);
    formData.append("file", file);

    // step 1 — upload the file
    const response = await fetch(`${VITE_API_URL}/upload`, {
        method: "POST",
        body: formData
    });
    const data = await response.json();
    console.log(data);

    const response2 = await fetch(`${VITE_API_URL}/add_pdf`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, path: data.path, genre, module_id })
    });

    console.log(response2);
    
    

    setOpen(false);
    setName(""); setGenre("cours"); setFile(null);
}

    return (
        <>
            <button id="add_filiere_btn" onClick={() => setOpen(true)}>+</button>

            {open && (
                <div id="modal_overlay" onClick={() => setOpen(false)}>
                    <div id="modal_card" onClick={(e) => e.stopPropagation()}>
                        <h2 id="modal_title">Ajouter un PDF</h2>

                        <div className="input_group">
                            <label className="input_label">Nom</label>
                            <input className="login_input" type="text" placeholder="Cours Algorithmique S1"
                                value={name} onChange={(e) => setName(e.target.value)} />
                        </div>

                        <div className="input_group">
                            <label className="input_label">Genre</label>
                            <select className="login_input" value={genre} onChange={(e) => setGenre(e.target.value)}>
                                <option value="Cours">Cours</option>
                                <option value="Td">Td</option>
                                <option value="Exam">Exam</option>
                            </select>
                        </div>

                        <div className="input_group">
                            <label className="input_label">Fichier PDF</label>
                            <label id="file_upload_label">
                                <input type="file" accept=".pdf"
                                    onChange={(e) => setFile(e.target.files[0])}
                                    id="file_input" />
                                <span id="file_upload_btn">
                                    {file ? file.name : "Choisir un fichier"}
                                </span>
                            </label>
                        </div>

                        <div id="modal_actions">
                            <button id="modal_cancel" onClick={() => setOpen(false)}>Annuler</button>
                            <button id="modal_submit" onClick={handleSubmit} disabled={!file || !name}>
                                Ajouter
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}