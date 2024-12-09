import React from 'react'
import Link from 'next/link'
import { useState , useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import {Button , Input ,  Label } from '../../components/Tools/Tools'
import styles from "../../styles/Auth/register.module.css"
import { useAuth } from '../../Hooks/auth'
import { toast , ToastContainer } from 'react-toastify'

import { easeInOut, motion } from 'framer-motion'
import 'react-toastify/dist/ReactToastify.css';
export default function register() {
    const { register } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/',
    })

    

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password_confirmation, setPasswordConfirmation] = useState('')
    const [errors, setErrors] = useState([])
    const [data, setData] = useState()
    const router = useRouter();
    


    const submitForm = async event => {
        event.preventDefault()
        register({  name, email, password, password_confirmation, setData})
        if(data?.length > 0){
            toast.success('Success Register !', {
                position: toast.POSITION.TOP_RIGHT
            });
        }else{
            toast.error('Register failed!', {
                position: toast.POSITION.TOP_RIGHT
            });
        }
        
        
    }
    console.log ('data' , data)

    return (
    <>
    <Head>
        <title>EgyHealth — Register</title>
    </Head>

    <div className="container"  id={styles.container}>
    <motion.div className={styles.logo}
    initial={{x:-100 , y:-50 ,  opacity:0 }}
    animate = {{x:0 , y: 0,  opacity:1}}
    end={{x:-100 , y:-50, opacity:0 }}
    transition={{type:"spring" , duration:0.8 , ease:easeInOut}}>
        </motion.div>
        <motion.form onSubmit={submitForm} className={styles.form}  method="POST"
        initial={{x:-400 , y:-400 ,  opacity:0 }}
        animate = {{x:0 , y: 0,  opacity:1}}
        end={{x:-400 , y:-400, opacity:0 }}
        transition={{type:"spring" , duration:1.2 , ease:easeInOut , delay:1}}>
            
            <div className={styles.header}>
                <p>Register</p>
                {
                    data?.status == false &&(
                        <h4 style={{color:'red'}}>{data?.msg}</h4>
                    )
                }
            </div>
            <div>
                <Label htmlFor="email">Name</Label>

                <Input
                    id="name"
                    type="text"
                    name="name"
                    value={name}
                    className="block mt-1 w-full"
                    onChange={event => setName(event.target.value)}
                    required
                    autoFocus
                    autoComplete="off"
                />
                
            </div>

            <div className="mt-4">
                <Label htmlFor="email">Email</Label>

                <Input
                    id="email"
                    type="email"
                    value={email}
                    className="block mt-1 w-full"
                    onChange={event => setEmail(event.target.value)}
                    required
                />
                
            </div>

            <div className="mt-4">
                <Label htmlFor="password">Password</Label>

                <Input
                    id="password"
                    type="password"
                    value={password}
                    className="block mt-1 w-full"
                    onChange={event => setPassword(event.target.value)}
                    required
                />
                
            </div>

            <div className="mt-4">
                <Label htmlFor="password">Confirm Password</Label>

                <Input
                    id="password_confirmation"
                    type="password"
                    value={password_confirmation}
                    className="block mt-1 w-full"
                    onChange={event => setPasswordConfirmation(event.target.value)}
                    required
                />
                
            </div>

            <div className={styles.confirmLogin}>
                <Link href="/auth/login">
                    <p >
                        Already registered?
                    </p>
                </Link>

                <Button >Register</Button>
            </div>
            <ToastContainer />
        </motion.form>
    </div>
</>
    )
}
