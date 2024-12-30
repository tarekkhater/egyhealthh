import Reservations from '@/components/Hospital/Reservations '
import HospitalNav from '@/components/Navbars/HospitalNav '
import { useAuth } from '@/Hooks/hospitalAuth '
import React, { useState , useEffect } from 'react'
import HospitalLayout from '@/components/Layouts/HospitalLayout '
import Link from 'next/link'
import styles from '../../styles/Hospital/Home.module.css'
import { motion } from 'framer-motion';
import ClincalReservations from '../../components/Hospital/ClincalReservations'
import { Button } from '@/components/Tools/Tools '
import { useRouter } from 'next/router'
import Loading from '@/components/Loading '
import localStorage from 'redux-persist/lib/storage'

export default function Reservs() {
    const { user , reservations } = useAuth({'middleware':"auth"})
    const [reservs , setReservs] = useState()
    const [date , setDate] = useState()
    const [ShowManualReservations , setShowManualReservations] = useState(false)
    const [ress , setRess] = useState()
    const [x , setX] = useState(5)
    const [y , setY] = useState(5)
    const router = useRouter()
    const [tokens , setTokens] = useState()
    const [userData , setUserData] = useState()

    useEffect(() => {
        const getToken = localStorage.getItem(('hospitalAuthToken')).then((token) =>{
            reservations({token,setReservs})
            setTokens(token)
            user({token , setUserData  })
            setRess(reservs?.Reservations)
          })
    }, []);

    useEffect(() => {
        setRess(reservs?.Reservations);
    }, [reservs]);

    const clincalsReserves = ress?.filter(reserve => reserve?.clincal !== null)
    const roomsReserves = ress?.filter(reserve => reserve?.room !== null)
        
    if(!reservs?.Reservations){ 
        return <Loading />
    }
  return (
    <HospitalLayout 
    user={userData}
    token={tokens}
        container={
        <div className={styles.container}>
            <div >
                <div style={{display:'flex' , justifyContent:'space-between' , alignItems:'center'}}>
                <p>Clincals</p>
                        
                    <div className={styles.date}>
                        <label htmlFor='date' > Day reserved  </label>
                        <input  type='date' onChange={(e)=>{setDate(e.target.value);}} />
                    </div>
                </div>
                <ClincalReservations token={tokens} reservs={date? clincalsReserves?.filter(reserve=> reserve?.date == date) : clincalsReserves?.slice(0,x)} ShowManualReservations={ShowManualReservations}  />
                {x < clincalsReserves?.length && !ShowManualReservations &&(
                    <Button style={{float:'right' , backgroundColor:'purple' , marginTop:'0.6rem'}}
                    onClick={()=>setX(x+5)}>More..</Button>
                )}
                {x >5 && !ShowManualReservations &&(
                    <Button style={{float:'right' , backgroundColor:'darkyellow' , marginTop:'0.6rem', marginRight:'0.5rem'}}
                    onClick={()=>setX(x-5)}>Less..</Button>
                )}
            </div>
            
            <div style={{marginTop:'2rem'}}>
            <div style={{display:'flex' , justifyContent:'space-between' , alignItems:'center'}}>
            <p>Rooms</p>
                {ShowManualReservations? (
                    <motion.button whileHover={{scale:1.02}}  className={styles.manualReservs} style={{backgroundColor:"darkred"}} onClick={()=> setShowManualReservations(false)}>Online Reservations</motion.button >
                ):
                (
                    <motion.button whileHover={{scale:1.02}}  className={styles.manualReservs} style={{backgroundColor:"darkred"}} onClick={()=> setShowManualReservations(true)}>Manual Reservations</motion.button >

                )}
                    
            </div>
                
                <Reservations token={tokens} reservs={date? roomsReserves?.filter(reserve=> reserve?.date == date) : roomsReserves?.slice(0,y)} ShowManualReservations={ShowManualReservations}  />
                {y < roomsReserves?.length && !ShowManualReservations &&(
                    <Button style={{float:'right' , backgroundColor:'purple' , marginTop:'0.6rem'}}
                    onClick={()=>setY(y+5)}>More..</Button>
                )}
                {y >5 && !ShowManualReservations &&(
                    <Button style={{float:'right' , backgroundColor:'darkyellow' , marginTop:'0.6rem', marginRight:'0.5rem'}}
                    onClick={()=>setY(y-5)}>Less..</Button>
                )}
            </div>
        </div>
        
    }/>
  )
}

