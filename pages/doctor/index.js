import DoctorLayout from '@/components/Layouts/DoctorLayout '
import Reservations from '@/components/Doctor/Reservations ';
import { useAuth } from '@/Hooks/doctorAuth '
import React, { useState , useEffect } from 'react'
import styles from '../../styles/Doctor/HomePage.module.css'
import PrescriptionForm from '@/components/Doctor/PrescriptionForm ';
import Loading from '@/components/Loading ';
import { useRouter } from 'next/router';
import localStorage from 'redux-persist/lib/storage'


export default function Home() {
    const {user , reservations } = useAuth({'middleware':"auth"})
    const [reservs , setReservs] = useState()
    const [date , setDate] = useState()
    const [x , setX] = useState(1)
    const [open , setOpen] = useState(false)
    const [patientId , setPatientId] = useState()
    const router = useRouter()
    const [userData , setUserData] = useState()
    const [tokens , setTokens] = useState()

    useEffect(() => {
        const getToken = localStorage.getItem(('doctorAuthToken')).then((token) =>{
            user({token,setUserData})
            reservations({token , setReservs  })
            setTokens(token)
          })
    },[]);
    useEffect(() => {
        const api = setInterval( ()=>{
            reservations({'token':tokens ,  setReservs  })
            setX(x+1)
        }, 300000);
        return () => clearInterval(api)
        }, [x])

    const ress = reservs?.Reservations

    useEffect(() => {
        if(reservs?.status == false){
            router.push('/auth/login')
        }
    },[reservs]);
    if(!ress){
        return <Loading />
    }
  return (
    <DoctorLayout token={tokens} user={userData}
     container={
        <>
            <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <input className={styles.search} type='search' placeholder='Search' />
                </div>
                <div className={styles.date}>
                    <label htmlFor='date' > Day reserved  </label>
                    <input  type='date' onChange={(e)=>{setDate(e.target.value);}} />
                </div>
            </div>
            <div style={{marginTop:'0.2rem'}}>
                <p className={styles.headerName} >Reservations</p>
                <Reservations reservs={date? ress?.filter(reserve=> reserve?.date == date) : ress}  setOpen={setOpen} setPatientId={setPatientId}   />
            </div>
            <PrescriptionForm token={tokens} open={open} setOpen={setOpen} user_id={patientId} />
        </div>
        </>
    } />
  )
}

