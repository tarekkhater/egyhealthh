import React , { useEffect, useRef, useState } from 'react'
import { Button ,Input ,  Label } from '../Tools/Tools'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import styles from "../../styles/Hospital/Rooms.module.css"
import { motion } from 'framer-motion';
import { toast , ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import ClincalReservation from './ClincalReservation';
import RoomReservation from './RoomReservation';


export default function ReservationForm({token,show , setShow , clincals , doctors , rooms , id}) {
    const style = {
        position: 'relative' ,
        top: '50%',
        left: '45%',
        transform: 'translate(-50%, -50%)',
        width: [320,400,400],
        bgcolor: 'background.paper',
        border: '2px solid #000',
        borderRadius:5,
        boxShadow: 24,
        padding: 4,
    };
    const [reserveType , setReserveType] = useState('')
    const formRef = useRef()
    console.log('clincals' , clincals)

    
    useEffect(() => {
        let handler = (e)=>{
            if(!formRef?.current?.contains(e.target)){
                setShow(false)
            }
        }

        window.addEventListener('mousedown',handler);
        return () => {
        window.removeEventListener('mousedown', handler);
        };
    }, []);
    

    
return (
<>
    {show && (
        <div className={styles.formReserved}>
            <Box sx={style} ref={formRef}>
                <Typography id="modal-modal-title" variant="h6" component="h2" style={{textAlign:'center' , fontSize:'22px' , color:'darkred' }}>
                    Reservation 
                </Typography>
                {!reserveType ? (
                    <div style={{display:'flex' , justifyContent:'space-around' , alignItems:'center' , padding:'2rem 0rem'}}>
                        <Button style={{backgroundColor:'darkgreen'}} onClick={()=> setReserveType('clincal')}>Clincal</Button>
                        <Button style={{backgroundColor:'darkblue'}} onClick={()=> setReserveType('room')}>Room</Button>
                    </div>
                ):reserveType == 'room' ?(
                    <RoomReservation token={token} setShow={setShow}  setReserveType={setReserveType} doctors={doctors} rooms={rooms} id={id} />
                ):(
                    <ClincalReservation token={token} setShow={setShow}  setReserveType={setReserveType} clincals={clincals}  id={id} />
                )}
                
                
            </Box>
            <ToastContainer />
        </div>
    )}
</>
)
}
