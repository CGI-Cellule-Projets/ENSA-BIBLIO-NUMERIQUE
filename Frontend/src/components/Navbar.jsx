import '../style/style.css';
import { Link } from 'react-router-dom';
import Links from './Links_top';
import Links_Top from './Links_top';

function Navbar(){
    return (
        <div id = "container">
                <h1 id = "logo" style={{color:"white"}}>LOGO</h1>

                <Links_Top />
        </div>
    )
}


export default Navbar;