import styles from '../../styles/Auth/Login.module.css';
import {AuthCard ,  Button , Input , InputError , Label } from '../Tools/Tools'
import {  useEffect, useState } from 'react'
import Link from 'next/link';
import { useAuth } from '../../Hooks/auth'
import { easeInOut, motion } from 'framer-motion';
import localStorage from 'redux-persist/lib/storage';
import { useRouter } from 'next/router';
function UserLogin() {

    const { login , user  } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/',
    })
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [shouldRemember, setShouldRemember] = useState(false)
    const [data, setData] = useState()
    const [userData, setUserData] = useState()
    const [token, setToken] = useState()
    const router = useRouter()


    const submitForm = async (e) => {
        e.preventDefault()
        login({email, password, shouldRemember, setData })
    }
    useEffect(() => {
        const getToken = localStorage.getItem(('authToken')).then((token) =>{
        user({token,setUserData})
        })
      }, [data]);

      useEffect(() => {
        if(userData?.email){
          router.push('/')
        }
      }, [userData]);
console.log(userData)
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
                        <p>User Login</p>
                        {
                        data?.status == false &&(
                                <p style={{color:'red' , fontSize:'16px'}}>{data?.msg}</p>
                            )
                        }
                    </div>
            <form onSubmit={submitForm}  method="POST" >
            {/* Email Address */}
            <div>
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
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
            <Link href="/auth/forgot-password" target='_blank'>
                    <p>
                        Forget password?
                    </p>
                </Link>
            {/* Remember Me */}
            <div style={{display:"flex" , marginTop:"1rem" }}>
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
                <Link href="/auth/register" >
                    <p>
                        Don`t have account?
                    </p>
                </Link>

                <Button type="submit" style={{marginRight:".75rem"}}>Login</Button>
            </div>
            </form>
            </AuthCard>

    </motion.div>
    </>
)
}
export default UserLogin

