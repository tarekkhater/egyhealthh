import {  useState , useEffect } from 'react';
import styles from '../../styles/Hospital/Sidebar.module.css'
import { useRouter } from 'next/router';
import { links } from './Links';
function Sidebar() {
const pathname = useRouter().pathname;
    return (
        <div className={styles.container}>
            <div className={styles.brand}>
                Egy<span>Health</span>
            </div>
        <div >
            {
                links.map(link => (
                    <a key={link.name}
                     href={link.path} 
                     onClick={(e) => {pathname == link.path && e.preventDefault()}} 
                     className={pathname == link.path ? styles.active : styles.link}  
                     > <p> {link.name} </p></a>
                ))
            }
        </div>
        </div>
    )
}
export default Sidebar;
