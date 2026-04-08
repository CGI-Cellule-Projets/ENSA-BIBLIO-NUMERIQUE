import Filiere from "./Filière"

export default function Filiere_page(){
    return (
        <>
            <div id="filiere_box">
                <h1>Choisissez votre filière</h1>
                <br />
                <Filiere nom="Genie Informatique" number={4}/>
                <Filiere nom="Genie RSSP" number={5} />
                <Filiere nom="Genie SECCS" number={5} />
                <Filiere nom="Genie GCDSE" number={5} />
            </div>
        </>
    )
}