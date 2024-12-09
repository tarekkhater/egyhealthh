import React from 'react'
import { useState , useEffect } from 'react'
import Head from 'next/head'
import {Button , Input ,InputError,  InputSuccess,  Label } from '../../components/Tools/Tools'
import styles from "../../styles/Auth/ForgetPassword.module.css"
import { useAuth } from '../../Hooks/auth'
import { easeInOut, motion } from 'framer-motion'


export default function ForgotPassword() {
    const { forgetPassword } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/',
    })

    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState()
    const [status, setStatus] = useState(null)


    const submitForm = async event => {
        event.preventDefault()
        forgetPassword({ email, setStatus, setErrors})
    }
    console.log('data' , status)
    return (
    <>
    <Head>
        <title>EgyHealth — ForgotPassword</title>
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
                <p>ResetPassword</p>
            </div>
            <div className={styles.text} >
                    Forgot your password? No problem. Just let us know your
                    email address and we will email you a password reset link
                    that will allow you to choose a new one.
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

            <InputError messages={errors?.email} className="mt-2" />
            {
                status != null && (
                    <InputSuccess success='Your email has recieved link to reset password.' style={{marginTop:2 }} />
                )
            }
            <div className={styles.confirmLogin}>
                <Button >Email Password Reset Link</Button>
            </div>
        </motion.form>
    </div>
</>
    )
}
