import { useAuth } from '@/Hooks/auth '
import Layout from '@/components/Layouts/Layout '
import ClincalsBookings from '@/components/Patient/ClincalsBookings '
import RoomsBookings from '@/components/Patient/RoomsBookings '
import React, { useState , useEffect} from 'react'
import { motion } from 'framer-motion'
import styles from '../styles/Bookings.module.css'
import Loading from '@/components/Loading '
import { useRouter } from 'next/router'
export default function bookings() {
  const {bookings , cancelReservation} = useAuth({middleware:'guest'})
  const [reservs ,setReservs] = useState()
  const [reservsType ,setReservsType] = useState('clincals')
  const [x , setX] = useState(1)
  const router = useRouter()

  useEffect(() => {
    bookings({setReservs})
  },[x]);

  useEffect(() => {
    if(reservs?.status == false){
      router.push('/auth/login')
    }
  },[reservs]);

  if(!reservs?.Reservations){
    return <Loading />
  }
  return (
    <Layout container={
    <div className={styles.container}>
      {reservsType == 'clincals'?(
        <>
          <div style={{display:'flex' , justifyContent:'space-between' , alignItems:'center'}}>
            <p>Clincals</p>
            <motion.button whileHover={{scale:1.02}} className={styles.reservsType} style={{backgroundColor:"darkred"}} onClick={()=> setReservsType('rooms')}>Rooms</motion.button >  
          </div>
          <ClincalsBookings reservs={reservs?.Reservations} setX={setX} />
        </>
      ):(
        <>
          <div style={{display:'flex' , justifyContent:'space-between' , alignItems:'center'}}>
            <p>Rooms</p>
            <motion.button whileHover={{scale:1.02}} className={styles.reservsType} style={{backgroundColor:"darkred"}} onClick={()=> setReservsType('clincals')}>Clincals</motion.button >
          </div>
          <RoomsBookings reservs={reservs?.Reservations} setX={setX} />
        </>
      )}
        
        
    </div>} />
  )
}
