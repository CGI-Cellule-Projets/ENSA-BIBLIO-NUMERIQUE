

import { useState } from "react";
const VITE_API_URL = import.meta.env.VITE_API_URL;

export default function AddModuleForm({ semester_id, onAdd }) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");

    async function handleSubmit() {
        await fetch(`${VITE_API_URL}/add_module`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, semester_id })
        });
        setOpen(false);
        setName("");
        onAdd();
    }

    return (
        <>
            <button id="add_filiere_btn" onClick={() => setOpen(true)}>+</button>

            {open && (
                <div id="modal_overlay" onClick={() => setOpen(false)}>
                    <div id="modal_card" onClick={(e) => e.stopPropagation()}>
                        <h2 id="modal_title">Ajouter un module</h2>

                        <div className="input_group">
                            <label className="input_label">Nom du module</label>
                            <input className="login_input" type="text" placeholder="Algorithmique"
                                value={name} onChange={(e) => setName(e.target.value)} />
                        </div>

                        <div id="modal_actions">
                            <button id="modal_cancel" onClick={() => setOpen(false)}>Annuler</button>
                            <button id="modal_submit" onClick={handleSubmit}>Ajouter</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}