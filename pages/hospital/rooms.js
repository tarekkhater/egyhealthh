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
import localStorage from 'redux-persist/lib/storage'

export default function Room() {
    const {user ,  rooms , doctors} = useAuth({'middleware' : 'auth'})
    const [show, setShow] = useState(false)
    const [roomss , setRooms] = useState()
    const [roomAdded , setRoomAdded] = useState(false)
    const [open, setOpen] = useState(false);
    const [openDeleteForm, setOpenDeleteForm] = useState(false);
    const [roomSelected, setRoomSelected] = useState([]);
    const [data , setData] = useState()
    const [x ,setX] = useState(1)
    const router = useRouter()
    const [userData , setUserData] = useState()
    const [tokens , setTokens] = useState()

    useEffect(() => {
        const getToken = localStorage.getItem(('hospitalAuthToken')).then((token) =>{
            rooms({token , setRooms  })
            doctors({token , setData})
            user({token , setUserData})
            setTokens(token)
          })
        
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
    <HospitalLayout token={tokens} user={userData}  container={
            <div className={styles.container}>
                <div style={{display:'flex' , justifyContent:'space-between' , alignItems:'center'}}>
                    <p>Rooms</p>
                    <motion.button className={styles.headButton} variants={variants} whileHover='hover' onClick={()=>setShow(true)}>Add Room</motion.button>
                </div>
                <div>
                    {show && (<>
                            <AddRoom token={tokens} setShow={setShow} setRoomAdded={setRoomAdded} />
                        </>)}
                    <Rooms rooms={roomss?.rooms} setOpen={setOpen} setOpenDeleteForm={setOpenDeleteForm} setRoomSelected={setRoomSelected} />
                    
                </div>
                <DeleteRoom token={tokens} roomSelected={roomSelected} open={openDeleteForm} setOpen={setOpenDeleteForm} x={x} setX={setX} />
                <RoomReservedForm token={tokens} roomSelected={roomSelected} open={open} setOpen={setOpen} doctors={data?.Doctors} />
            </div>
            
                
       
    } />
  )
}

