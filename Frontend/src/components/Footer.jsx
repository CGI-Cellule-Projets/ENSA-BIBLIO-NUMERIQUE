import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";
import Links from "./links";
import '../style/style.css'




export default function Footer() {
    return (
        <>
            <div id="footer_container">
                <div id="socials">
                    <a href="https://www.facebook.com/ensademarrakech/?locale=fr_FR" target="_blank"><FaFacebook size={30} color="#a35b39" /></a>
                    <a href="https://www.instagram.com/ensa_marrakech_officielle/" target="_blank"><AiFillInstagram size={30} color="#a35b39" /></a>
                    <a href="https://ma.linkedin.com/school/ensa-school/" target="_blank"><FaLinkedinIn size={30} color="#a35b39" /></a>
                </div>
                <Links />
                <p>Copyright © 2026 Omar</p>
            </div>
        </>
    )
}