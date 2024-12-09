import Rooms from '@/components/Hospital/Rooms '
import HospitalLayout from '@/components/Layouts/HospitalLayout '
import HospitalNav from '@/components/Navbars/HospitalNav '
import { useAuth } from '@/Hooks/hospitalAuth '
import React, { useEffect , useState } from 'react'
import styles from '../../styles/Hospital/Home.module.css'
import { motion } from 'framer-motion'
import AddRoom from '@/components/Hospital/AddRoom '
import RoomReservedForm from '@/components/Hospital/RoomReservedForm '
import DeleteRoom from '@/components/Hospital/DeleteRoom '
import Loading from '@/components/Loading '
import { useRouter } from 'next/router'

export default function Room() {
    const { user , rooms , doctors} = useAuth({'middleware' : 'auth'})
    const [show, setShow] = useState(false)
    const [roomss , setRooms] = useState()
    const [roomAdded , setRoomAdded] = useState(false)
    const [open, setOpen] = useState(false);
    const [openDeleteForm, setOpenDeleteForm] = useState(false);
    const [roomSelected, setRoomSelected] = useState([]);
    const [data , setData] = useState()
    const [x ,setX] = useState(1)
    const router = useRouter()

    useEffect(() => {
        rooms({setRooms  })
        doctors({setData})
    }, [x , roomAdded]);

    const variants ={
            hover:{scale:1.06  ,
                translation:{type:'spring' }
        }
    }


    if(!roomss?.rooms){
        return <Loading />
    }
    
  return (
    <HospitalLayout  container={
            <div className={styles.container}>
                <div style={{display:'flex' , justifyContent:'space-between' , alignItems:'center'}}>
                    <p>Rooms</p>
                    <motion.button className={styles.headButton} variants={variants} whileHover='hover' onClick={()=>setShow(true)}>Add Room</motion.button>
                </div>
                <div>
                    {show && (<>
                            <AddRoom setShow={setShow} setRoomAdded={setRoomAdded} />
                        </>)}
                    <Rooms rooms={roomss?.rooms} setOpen={setOpen} setOpenDeleteForm={setOpenDeleteForm} setRoomSelected={setRoomSelected} />
                    
                </div>
                <DeleteRoom roomSelected={roomSelected} open={openDeleteForm} setOpen={setOpenDeleteForm} x={x} setX={setX} />
                <RoomReservedForm roomSelected={roomSelected} open={open} setOpen={setOpen} doctors={data?.Doctors} />
            </div>
            
                
       
    } />
  )
}

