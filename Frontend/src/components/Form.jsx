
import { useState } from "react";

export default function AddFiliereForm({ onAdd }) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [duration, setDuration] = useState("");
    const VITE_API_URL = import.meta.env.VITE_API_URL;

    async function handleSubmit() {
        await fetch(`${VITE_API_URL}/post_filiere`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, duration: parseInt(duration) })
        });
        setOpen(false);
        setName(""); setDuration("");
        onAdd();
    }

    return (
        <>
            <button id="add_filiere_btn" onClick={() => setOpen(true)}>+</button>

            {open && (
                <div id="modal_overlay" onClick={() => setOpen(false)}>
                    <div id="modal_card" onClick={(e) => e.stopPropagation()}>
                        <h2 id="modal_title">Ajouter une filière</h2>

                        <div className="input_group">
                            <label className="input_label">Nom</label>
                            <input className="login_input" type="text" placeholder="Nom de la Filière"
                                value={name} onChange={(e) => setName(e.target.value)} />
                        </div>

                        <div className="input_group">
                            <label className="input_label">Nombre de semestres</label>
                            <input className="login_input" type="number" placeholder="2-6" min={2} max={6}
                                value={duration} onChange={(e) => setDuration(e.target.value)} />
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