import DoctorLayout from '@/components/Layouts/DoctorLayout '
import Reservations from '@/components/Doctor/Reservations ';
import { useAuth } from '@/Hooks/doctorAuth '
import React, { useState , useEffect } from 'react'
import styles from '../../styles/Doctor/Home.module.css'
import PrescriptionForm from '@/components/Doctor/PrescriptionForm ';
import Loading from '@/components/Loading ';
import { useRouter } from 'next/router';


export default function Home() {
    const {user , reservations } = useAuth({'middleware':"auth"})
    const [reservs , setReservs] = useState()
    const [date , setDate] = useState()
    const [x , setX] = useState(1)
    const [open , setOpen] = useState(false)
    const [patientId , setPatientId] = useState()
    const router = useRouter()

    useEffect(() => {
        reservations({setReservs  })
    },[]);
    useEffect(() => {
        const api = setInterval( ()=>{
            reservations({setReservs  })
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
    console.log('res' , reservs)
    if(!ress){
        return <Loading />
    }
  return (
    <DoctorLayout container={
        <>
            <div className={styles.container}>
            <div style={{display:'flex' , justifyContent:'space-between' , alignItems:'center'}}>
                <div>
                    <input className={styles.search} type='search' placeholder='Search' />
                </div>
                <div className={styles.date}>
                    <label htmlFor='date' > Day reserved  </label>
                    <input  type='date' onChange={(e)=>{setDate(e.target.value);}} />
                </div>
            </div>
            <div style={{marginTop:'2rem'}}>
                <p className={styles.headerName} >Reservations</p>
                <Reservations reservs={date? ress?.filter(reserve=> reserve?.date == date) : ress}  setOpen={setOpen} setPatientId={setPatientId}   />
            </div>
            <PrescriptionForm open={open} setOpen={setOpen} user_id={patientId} />
        </div>
        </>
    } />
  )
}

