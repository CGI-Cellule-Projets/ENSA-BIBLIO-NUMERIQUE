import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import Links from "./Links_top";
import '../style/style.css'
import Links_Bot from "./Links_bot";




export default function Footer() {
    return (
        <>
            <div id="footer_container">
                <div id="socials">
                    <a href="https://www.facebook.com/ensademarrakech/?locale=fr_FR" target="_blank"><FaFacebook size={30} color="#a35b39" /></a>
                    <a href="https://www.instagram.com/ensa_marrakech_officielle/" target="_blank"><AiFillInstagram size={30} color="#a35b39" /></a>
                    <a href="https://ma.linkedin.com/school/ensa-school/" target="_blank"><FaLinkedinIn size={30} color="#a35b39" /></a>
                </div>
                <Links_Bot />
                <p>Copyright © 2026 P-B-N-E</p>
            </div>
        </>
    )
}