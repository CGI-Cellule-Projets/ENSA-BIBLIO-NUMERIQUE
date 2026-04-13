import '../style/style.css';
import { Link } from 'react-router-dom';
import Links from './links';

function Navbar(){
    return (
        <div id = "container">
                <h1 id = "logo" style={{color:"white"}}>LOGO</h1>

                <Links />
        </div>
    )
}


export default Navbar;