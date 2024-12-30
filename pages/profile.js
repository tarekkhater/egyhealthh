import { useAuth } from '@/Hooks/auth '
import Layout from '@/components/Layouts/Layout '
import UserProfile from '@/components/Patient/UserProfile '
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import styles from '../styles/Profile.module.css'
import EnterDataForm from '@/components/Patient/EnterDataForm '
import UpdateForm from '@/components/Patient/UpdateForm '
import { Button } from '@/components/Tools/Tools '
import Loading from '@/components/Loading '
import { useRouter } from 'next/router'
import localStorage from 'redux-persist/lib/storage'

export default function Profile() {
    const {UserData} = useAuth({'middleware':'auth'})
    const [data , setData] = useState()
    const [open , setOpen] = useState(false)
    const [x , setX] =useState(1)
    const router = useRouter()
    const [tokens , setTokens] = useState()

    useEffect(() => {
      const getToken = localStorage.getItem(('authToken')).then((token) =>{
        setTokens(token)
        UserData({token , setData})
      });
    }, [x]);

    useEffect(() => {
      if(data?.status == false){
        router.push('/auth/login')
      }
    }, [data]);
    
    if(!data?.Data){
      return <Loading />
    }
  return (
    <Layout token={tokens} container={
        <>
          {data?.Data?.full_name ? (
            <div className={styles.container}>
            <div style={{display:'flex' , justifyContent:'space-between' , alignItems:'center'}}>
              <div className={styles.header}>
                  <h2>Your Data</h2>
              </div>
              <Button  id={styles.update} style={{backgroundColor:"darkred"}} onClick={()=>setOpen(true)} >Edit</Button >  
            </div>
            {open && (
                <UpdateForm setOpen={setOpen} setX={setX} x={x} info={data?.Data} />
              )}
              <UserProfile data={data?.Data} />
          </div>
          ): data?.Data?.length == 0 ?(
            <div className={styles.container}>
              <div className={styles.header}>
                <h2>Fill the form</h2>
              </div>
              <EnterDataForm token={tokens} x={x} setX={setX} />
            </div>
          ):(
            <p>Loading...</p>
          )}
        </>
    } />
  )
}
