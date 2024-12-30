import { useAuth } from '@/Hooks/auth '
import Layout from '@/components/Layouts/Layout '
import Loading from '@/components/Loading '
import { Input, Label , Button } from '@/components/Tools/Tools '
import React from 'react'
import { useState , useEffect } from 'react'
import styles from '../styles/changePassword.module.css'
import { toast , ToastContainer } from 'react-toastify'
import { easeInOut, motion } from 'framer-motion'
import 'react-toastify/dist/ReactToastify.css';
import localStorage from 'redux-persist/lib/storage'
import { useRouter } from 'next/router'

export default function changePassword() {
    const {user , changePassword} = useAuth({'middleware':"auth"})
    const [currentPassword , setCurrentPassword] = useState()
    const [newPassword , setNewPassword] = useState()
    const [newPassword_confirmation , setnewPassword_confirmation] = useState()
    const [data , setData] = useState()
    const [userData , setUserData] = useState()
    const [tokens , setTokens] = useState()
    const router = useRouter()
    const submitForm = async event => {
        event.preventDefault()
        changePassword({'token':tokens ,currentPassword , newPassword , newPassword_confirmation, setData})    
    }

    useEffect(() => {
        const getToken = localStorage.getItem(('authToken')).then((token) =>{
          user({token,setUserData})
          setTokens(token)
        })
      }, []);
     

    useEffect(() => {
        if(data?.status == true){
            toast.success(data?.msg, {
                position: toast.POSITION.TOP_RIGHT
            });
        }else{
            toast.error(data?.msg, {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }, [data]);
    if(!userData){
        return <Loading />
    }
    return <Layout container={
        <div className={styles.container}>
            <form onSubmit={submitForm}>
            <header className={styles.header}>
                <h3>Change password</h3>
            </header>
            <div>
                <Label htmlFor="current">Current password</Label>
                <Input
                    id="current"
                    type="password"
                    value={currentPassword}
                    onChange={event => setCurrentPassword(event.target.value)}
                    required
                />
            </div>
            <div>
                <Label htmlFor="new" >New password</Label>
                <Input
                    id="new"
                    type="password"
                    value={newPassword}
                    onChange={event => setNewPassword(event.target.value)}
                    required
                />
            </div>
            <div>
                <Label htmlFor="confirm" >Confirm password</Label>
                <Input
                    id="confirm"
                    type="password"
                    value={newPassword_confirmation}
                    onChange={event => setnewPassword_confirmation(event.target.value)}
                    required
                />
            </div>
            <div className={styles.confirmLogin}>
                <Button style={{"backgroundColor":"rgba(21, 104, 21, 0.837)"}} >Confirm</Button>
            </div>
            </form>
            <ToastContainer />
        </div>
    } />
}
