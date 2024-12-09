/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
import Link from 'next/link'
import React, { useState , useEffect, useRef} from 'react'
import styles from '../../styles/Navbar.module.css'
import { motion } from 'framer-motion'
import {useAuth} from '../../Hooks/auth'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';

export default function UserNav() {

    const [collapse , setCollapse] = useState(false);
    const {searchByName , logout}  = useAuth({'middleware':'auth'})
    const [value , setValue] = useState()
    const [show , setShow] = useState(false)
    const [showForMobile , setShowForMobile] = useState(false)
    const [data , setData] = useState()
    const variants ={
    hover:{scale:1.2 , originX:0 ,
        translation:{type:'spring' , stiffness:300}
    }
    }

    const [dropdown, setDropdown] = useState(null);
    const [open , setOpen] = useState(false)

    const handleClick = () => {
        setOpen(!open)
    };
    const handleClose = () => {
        setDropdown(null)
    };

    const nav = useRef()
    const collapseRef = useRef()
    const searchRef = useRef()
    const searchRefMobile = useRef()
    useEffect(() => {
        if(!value){
            setValue(null)
            setData(null)
        }
        searchByName({value , setData})
    }, [value]);

    useEffect(() => {
        let handler = (e)=>{
            if(!nav?.current?.contains(e.target) && !collapseRef?.current?.contains(e.target)){
                setCollapse(false)
            }
        }

        window.addEventListener('mousedown',handler);
    });

    useEffect(() => {
    let handler = (e)=>{
        if(!searchRef?.current?.contains(e.target)){
            setShow(false)
        }
    }
    window.addEventListener('mousedown',handler);
    });

    useEffect(() => {
        let handler = (e)=>{
            if(!searchRefMobile?.current?.contains(e.target)){
                setShowForMobile(false)
            }
        }
        window.addEventListener('mousedown',handler);
        });


    return (
    <div className={styles.container}  ref={nav}>
        <nav className={styles.nav}>
            <div className={styles.left}>
            <div style={{marginRight:"50px"}} >
                <motion.div className={styles.logo}
                initial={{y:-100 , opacity:0}}
                animate={{y:2 , opacity:1}}
                transition={{duration:0.4 , delay:0.3,type:"spring",stiffness:120,mass:0.4,damping:8}} ></motion.div>
            </div>
            <div className={styles.links}>
            <a href="/" className={styles.brand}>Home</a>
            <a href="/bookings" className={styles.brand}>Bookings</a>
            <a href="/nearest-hospitals" className={styles.brand}>Nearest hospitals</a>
            </div>
            
        </div>
        <div className={styles.right}>
        
        <div className={styles.SearchDiv} >
            <motion.input type="search" placeholder='Search' id="text" whileHover={{scale:1.06 , marginRight:"2px"}}
            whileFocus={{scale:1.06 , marginRight:"2px"}} value={value} onFocus={()=>setShow(true)}
            onChange={(e)=>{setValue(e.target.value); setShow(true)}} autoComplete='off' />
            {show && (
                <>
                    {data?.hospitals?.length > 0 && (
                        <div className={styles.searchResults} ref={searchRef} >
                    {data?.hospitals?.map((hospital) =>(
                        <div  key={hospital?.id} className={styles.result}>
                            <a href={`/hospital/${hospital?.id}`}>{hospital?.name}</a>
                        </div>
                    ))} 
                    </div>
                    )}
                </>
            )}
        </div>
        
            <div>
                <Button
                sx={{left:0 , right:0 ,pt:0 , pl:0}}
                id="fade-button"
                aria-controls={open ? 'fade-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}>
                    <img src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bWFsZSUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80"  alt="" className={styles.image}/>
                </Button>
                {open && (
                    <div
                    className={styles.menu}
                    id="fade-menu"
                    MenuListProps={{
                    'aria-labelledby': 'fade-button',
                    }}
                    anchorEl={dropdown}
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Fade}>
                    <a href="/profile" className={styles.brand}>
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                    </a>
                    <a href="/change-password" className={styles.brand}>
                        <MenuItem onClick={handleClose}>Change Password</MenuItem>
                    </a>
                    <MenuItem onClick={logout}>Logout</MenuItem>
                </div>
                )}
            </div>

            <motion.button onClick={()=>{setCollapse(!collapse)}} ref={collapseRef}
            className={styles.collapseButton}
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
            transition={{type:'spring' , duration:1 , delay:0.3 , ease:'ease-in-out'}}
            >
            <ul> 
                <motion.li variants={variants} whileHover='hover'><a href="/" className={styles.brand}>Home</a></motion.li>
                <motion.li variants={variants} whileHover='hover'><a href="/bookings" className={styles.brand}>Bookings</a></motion.li>
                <motion.li variants={variants} whileHover='hover'><a href="/nearest-hospitals" className={styles.brand}>Nearest hospitals</a></motion.li>
                <motion.li variants={variants} whileHover='hover'><a href="/profile" className={styles.brand}>Profile</a></motion.li>
                <motion.li variants={variants} whileHover='hover'><a href="/change-password" className={styles.brand}>Change password</a></motion.li>
                <li className={styles.search}>
                    <div style={{position:'relative'}}>
                        <motion.input type="search" placeholder='Search' id="text" whileHover={{scale:1.06 , marginRight:"2px"}}
                        whileFocus={{scale:1.06 , marginRight:"2px"}} onFocus={()=>setShowForMobile(true)}
                        onChange={(e)=>{setValue(e.target.value); setShowForMobile(true)}} autoComplete='off'/>
                        {showForMobile && (
                        <>
                            {data?.hospitals?.length > 0 && (
                                <div className={styles.searchResults} ref={searchRefMobile} >
                            {data?.hospitals?.map((hospital) =>(
                                <div  key={hospital?.id} className={styles.result}>
                                    <a href={`/hospital/${hospital?.id}`}>{hospital?.name}</a>
                                </div>
                            ))} 
                            </div>
                            )}
                        </>
                        )}
                </div>
                <img src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bWFsZSUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80"  alt="" className={styles.image}/>
                </li>
                <motion.li variants={variants} whileHover='hover' className={styles.logout} onClick={logout}>Logout</motion.li>
            </ul>
        </motion.div>
        )}
    </div>
    )
}
