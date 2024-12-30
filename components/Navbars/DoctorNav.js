/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
import Link from 'next/link'
import React, { useRef, useState , useEffect} from 'react'
import styles from '../../styles/Doctor/Navbar.module.css'
import { motion } from 'framer-motion'
import { Button } from '../Tools/Tools';
import { useAuth } from '@/Hooks/doctorAuth ';
export default function DoctorNav({token , user}) {
    const{logout} = useAuth({'middleware':"auth" , 'redirectIfAuthenticated': ''})

    const nav = useRef()
    const collapseRef = useRef()
    const [collapse , setCollapse] = useState(false);
    const variants ={
    hover:{scale:1.2 , originX:0 ,
        translation:{type:'spring' , stiffness:300}
    }
    }

    useEffect(() => {
        let handler = (e)=>{
            if(!nav?.current?.contains(e.target) && !collapseRef?.current?.contains(e.target)){
                setCollapse(false)
            }
        }
        window.addEventListener('mousedown',handler);
        return () => {
            window.removeEventListener('mousedown', handler);
        };
    });

    return (
    <div className={styles.container}  ref={nav}>
        <nav className={styles.nav}>
            <div className={styles.left}>
            <motion.div className={styles.brand} style={{marginRight:"50px"}} 
                initial={{y:-100 , opacity:0}}
                animate={{y:2 , opacity:1}}
                transition={{duration:0.4 , delay:0.3,type:"spring",stiffness:120,mass:0.4,damping:8}} >
                <div className={styles.logo} ></div>
                <div className={styles.brandName}>{user?.name}</div>
            </motion.div>
            
            
        </div>
        <div className={styles.right}>
        <motion.button className={styles.logout} whileHover={{scale:1.03 , color:'rgb(214, 18, 44, 0.800)'}} onClick={()=>logout({token})} >Logout</motion.button>
        <img src="https://www.shutterstock.com/image-vector/family-love-health-care-logo-260nw-1017398170.jpg"  alt="" className={styles.image}/>
            <motion.button className={styles.collapseButton} ref={collapseRef} onClick={()=>{setCollapse(!collapse)}}
            whileHover={{scale:1.1 , color:'darkgray'}} >
            <p>__</p>
            <p>__</p>
            <p>__</p>
            </motion.button>
        </div>
    </nav>
    {collapse &&(
        <motion.div className={styles.collapse}
            initial={{x:100 , y:-100 , opacity:0}}
            animate={{x:0 , y:0 , opacity:1}}
            transition={{type:'spring' , duration:1 , delay:0.3 , ease:'ease-in-out'}}>
            <ul> 
                <motion.li variants={variants} whileHover='hover'><a href="/doctor" >Home</a></motion.li>
                <li className={styles.search}>
                <motion.button className={styles.logout} variants={variants} whileHover='hover' onClick={()=>logout({token})} >Logout</motion.button>
                </li>
            </ul>
        </motion.div>
        )}
    </div>
    )
}

