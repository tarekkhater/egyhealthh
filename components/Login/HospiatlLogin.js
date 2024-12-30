import styles from '../../styles/Auth/Login.module.css';
import {AuthCard ,  Button , Input ,  Label } from '../Tools/Tools'
import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link';
import { easeInOut, motion } from 'framer-motion';
import {  useAuth  } from '@/Hooks/hospitalAuth ';
import localStorage from 'redux-persist/lib/storage';



function HospitalLogin() {

    const {user, login } = useAuth({'middleware':"guest" , 'redirectIfAuthenticated': '/hospital'});
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [shouldRemember, setShouldRemember] = useState(false)
    const router = useRouter()
    const [data, setData] = useState()
    const [userData, setUserData] = useState()

    const submitForm = async (e) => {
        e.preventDefault()
        login({name, password, shouldRemember, setData })
    }
    useEffect(() => {
        const getToken = localStorage.getItem(('hospitalAuthToken')).then((token) =>{
        user({token,setUserData})
        })
      }, [data]);
      useEffect(() => {
        if(userData?.name){
          router.push('/hospital')
        }
      }, [userData]);


    return (
    <>
    
        
        <motion.div  id={styles.login}
        initial={{x:-400 , y:-400 ,  opacity:0 }}
        animate = {{x:0 , y: 0,  opacity:1}}
        end={{x:-400 , y:-400, opacity:0 }}
        transition={{type:"spring" , duration:2.2 , ease:easeInOut , stiffness:28 , mass:0.4 , damping:8}}>
        <AuthCard>

            {/* Session Status */}
            <div className={styles.title}>
                        <p>Hospital Login </p>
                        {
                        data?.status == false &&(
                                <p style={{color:'red' , fontSize:'16px'}}>{data?.msg}</p>
                            )
                        }
                    </div>
            <form onSubmit={submitForm}  method="POST">
            {/* Email Address */}
            <div>
                <Label htmlFor="name">Name</Label>
                <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    autoFocus
                />
            </div>
            {/* Password */}
            <div className="mt-4">
                <Label htmlFor="password">Password</Label>

                <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    
                />

            </div>

            {/* Remember Me */}
            <div style={{display:"block" , marginTop:"1rem"}}>
                <label
                    htmlFor="remember_me">
                    <input
                        id="remember_me"
                        type="checkbox"
                        name="remember"
                        onChange={e => setShouldRemember(e.target.checked)}
                    />
                    <span style={{fontSize:"medium" , marginLeft:"0.5rem"}}>
                        Remember me
                    </span>
                </label>
            </div>

            <div className={styles.confirmLogin}>
                <Button type="submit" style={{marginRight:".75rem"}}>Login</Button>
            </div>
            </form>
            </AuthCard>

    </motion.div>
    </>
)
}
export default HospitalLogin

