import ensa from '../assets/ENSA_HERO.jpg';
import { useNavigate } from 'react-router-dom';

export default function Hero() {

    return (
        <>
            <div id='image_container'>
                <img id='ensa_picture' src={ensa} alt="" />
                <div id="hero_text">
                    <h1>ENSA Biblioteque Numérique</h1>
                    <br />
                    <p>Vos recourses academiques a votre disposition</p>
                    <br />
                    <div id='hero_button'><a>Savoir plus</a><a href='https://ensa-marrakech.uca.ma/en/' target='_blank'>Visitez nous</a></div>
                </div>
            </div>

            <div style={{display:"flex", justifyContent:"center", marginTop:"100px"}}>
                <h1>Fonctionnalités</h1>
            </div>

            <div id="cards_grid">
                <FeatureCard icon="✦" title="Cours" desc="Visiter les cours de tous vos modules de toutes les filères." path={'filiere'} />
                <FeatureCard icon="⚡" title="TDs" desc="Visitez vos travaux dirigés pour chaque module." path={'filiere'} />
                <FeatureCard icon="🛡" title="Examens" desc="Tester vos connaissances avec des examens des années précédentes." path={'filiere'} />
            </div>

            <div style={{display:"flex", justifyContent:"center", marginTop:"100px"}}>
                <h1>Usage</h1>
            </div>

            <div id="cards_grid">
                <FeatureCard icon="✦" title="Etudiant" desc="Inscription en tant qu'étudiant." path={'/login'} />
                <FeatureCard icon="⚡" title="Admin" desc="Inscription en tant qu'enseignant, pour un acces admin." path={'/login'} />
                <FeatureCard icon="🛡" title="Visiteur" desc="Accès ouvert au recourses." path={'/filiere'} />
            </div>

        </>
    )
}

function FeatureCard({ icon, title, desc, path }) {
    const navigate = useNavigate()


    return (
        <button className="feature_card" onClick={()=>{ navigate(path) }} >
            <div className="card_icon">{icon}</div>
            <h3>{title}</h3>
            <p>{desc}</p>
        </button>
    )
}