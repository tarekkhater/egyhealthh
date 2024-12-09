import styles from '../../styles/Auth/Login.module.css';
import {AuthCard ,  Button , Input ,  Label } from '../Tools/Tools'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link';
import { useAuth } from '../../Hooks/doctorAuth'
import { easeInOut, motion } from 'framer-motion';

function DoctorLogin() {

    const { login , user } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/doctor',
    })
    const [national_id, setNational_id] = useState('')
    const [password, setPassword] = useState('')
    const [shouldRemember, setShouldRemember] = useState(false)
    const [data, setData] = useState()

    console.log('data' , data)
    console.log('user' , user)
    const submitForm = async (e) => {
        e.preventDefault()
        login({national_id, password, shouldRemember, setData })
    }
    
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
                        <p>Doctor Login</p>
                        {
                        data?.status == false &&(
                                <p style={{color:'red' , fontSize:'16px'}}>{data?.msg}</p>
                            )
                        }
                    </div>
            <form onSubmit={submitForm}  method="POST">
            {/* Email Address */}
            <div>
                <Label htmlFor="national_id">National Id</Label>
                <Input
                    id="national_id"
                    type="number"
                    value={national_id}
                    onChange={e => setNational_id(e.target.value)}
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

            <div type="submit" className={styles.confirmLogin}>
                <Button style={{marginRight:".75rem"}}>Login</Button>
            </div>
            </form>
            </AuthCard>

    </motion.div>
    </>
)
}
export default DoctorLogin

