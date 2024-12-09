import React , { useEffect, useRef, useState } from 'react'
import { Button ,Input ,  Label } from '../Tools/Tools'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import styles from "../../styles/Hospital/Rooms.module.css"
import { useAuth } from '@/Hooks/auth ';
import { toast , ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { easeInOut, motion } from 'framer-motion';


export default function RoomReservation({setReserveType  , doctors , rooms , id}) {
    const style = {
        position: 'relative' ,
        top: '50%',
        left: '45%',
        transform: 'translate(-50%, -50%)',
        width: [320,450,500],
        bgcolor: 'background.paper',
        border: '2px solid #000',
        borderRadius:5,
        boxShadow: 24,
        padding: 4,
       
    };
    let currentDate = new Date().toJSON().slice(0, 10);
    const [ doctorss , setDoctorss] = useState(doctors)
    const roomsAvailable = rooms.filter(room => room.status == 1)
    const [room_number , setRoom_number] = useState()
    const [date , setDate] = useState(currentDate)
    const [doctorSelected , setDoctorSelected] = useState()
    const [data , setData] = useState()
    const { reserve} = useAuth({'middleware' : 'auth'})
    

    const formRef = useRef()

    /*
    useEffect(() => {
        let handler = (e)=>{
            if(!formRef?.current?.contains(e.target)){
                setOpen(false)
            }
        }

        window.addEventListener('mousedown',handler);
    });
    */

    useEffect(() => {
        if(date){
        const d = new Date(date);
        const format = d.toString().split(' ')[0]
        setDoctorss(doctors?.filter(doctor => doctor?.presence_days?.includes(format)))
        }else{
            setDoctorss(doctors)
        }
        
    }, [date]);

    const submitForm = async event => {
        event.preventDefault()
        reserve({ room_number,  date ,'doctor_name' : doctorSelected[0] , 'hospital_id':id ,setData})
    }

        useEffect(() => {
            if(data?.status == true){
                toast.success(data?.msg, {
                    position: toast.POSITION.TOP_RIGHT
                });
                setRoom_number('')
                setDoctorSelected('')
                setDate('')
            }else{
                toast.error(data?.msg, {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        }, [data]);
    
return (
<motion.div
    initial={{x:200 , opacity:0}}
    animate={{x:0 , opacity:1}}
    end={{x:200 , opacity:0}}
    transition={{type:'spring' , duration:0.4 , delay:0.3 , ease:easeInOut}}>
    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        <form onSubmit={submitForm} method="POST">
            <div>
                <Label htmlFor="date">Date</Label>
                <Input
                    id="date"
                    type="date"
                    value={date}
                    className="block mt-1 w-full"
                    onChange={event => setDate(event.target.value)}
                    required
                />                                
            </div>

            <div>
                <Label htmlFor="room">Room</Label>
                <select id='room' className={styles.Selecion}  onChange={(e)=> setRoom_number(e.target.value)} required>
                    <option selected disabled  >Choose...</option>
                        {roomsAvailable?.map((room) =>(
                            <option key={room.id}> {room?.number}</option>
                        ))}
                </select>
            </div>                               

            <div>
                <Label htmlFor="doctor">Doctor</Label>
                    <select  className={styles.Selecion} onChange={(e)=>setDoctorSelected(e.target.value.split(/[أ-ي]/g) )} required>
                        <option selected disabled onClick={()=>setDoctorSelected('')} >Choose...</option>
                        {doctorss?.map((doctor) =>(
                            <option key={doctor.id}>
                                <p >{doctor?.name} &nbsp;</p>
                                <p>{doctor?.specialty}</p>
                            </option>
                        ))}
                    </select>
            </div>           
            <div className={styles.Submit} style={{marginTop:'2rem' }}>
                <Button style={{backgroundColor:'darkred'}} onClick={()=> setReserveType('')}>Back</Button>
                <Button >Reserve</Button>
            </div>
        </form>
    </Typography>
</motion.div>
)
}
