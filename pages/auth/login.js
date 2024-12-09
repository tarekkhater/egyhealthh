import styles from '../../styles/Auth/Login.module.css';
import { useEffect, useState } from 'react'
import { easeInOut, motion } from 'framer-motion';
import Head from 'next/head';
import UserLogin from '@/components/Login/UserLogin ';
import DoctorLogin from '@/components/Login/DoctorLogin ';
import HospitalLogin from '@/components/Login/HospiatlLogin ';

function Login() {
    const [loginActor , setLoginActor] = useState()

    return (
    <>
    <Head>
        <title>EgyHealth — Login</title>
    </Head>
    

    <motion.div  id={styles.container}
    initial={{x:-400 , y:-400 ,  opacity:0 }}
    animate = {{x:0 , y: 0,  opacity:1}}
    end={{x:-400 , y:-400, opacity:0 }}
    transition={{type:"spring" , duration:2.2 , ease:easeInOut , stiffness:28 , mass:0.4 , damping:8}}>
        <div className={styles.logo}>
        </div>

        {!loginActor || loginActor =="user" ? (
        <>
            <div className={styles.loginActors}>
                <motion.p whileHover={{scale:1.08  , origin:0}} onClick={()=> setLoginActor('doctor')} >login as doctor</motion.p>
                <motion.p whileHover={{scale:1.08  , origin:0}} onClick={()=> setLoginActor('hospital')}>login as hospital</motion.p>
            </div>
            <UserLogin />
        </>) : loginActor == "doctor"? 
            (<>
                <div className={styles.loginActors}>
                    <motion.p whileHover={{scale:1.08 , origin:0}} onClick={()=> setLoginActor('user')}>login as user</motion.p>
                    <motion.p whileHover={{scale:1.08 ,  origin:0}} onClick={()=> setLoginActor('hospital')}>login as hospital</motion.p>
                </div>
                <DoctorLogin />
            </>) : 
            (<>
            <div className={styles.loginActors}>
                <motion.p whileHover={{scale:1.08 ,  origin:0}} onClick={()=> setLoginActor('user')}>login as user</motion.p>
                <motion.p whileHover={{scale:1.08 ,  origin:0}} onClick={()=> setLoginActor('doctor')}>login as doctor</motion.p>
            </div>
            <HospitalLogin />
            </>)
        }
        
    </motion.div>
    </>
)
}
export default Login

