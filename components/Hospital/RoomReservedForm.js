import React , { useEffect, useRef, useState } from 'react'
import { Button ,Input ,  Label } from '../Tools/Tools'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import styles from "../../styles/Hospital/Rooms.module.css"
import { useAuth } from '@/Hooks/hospitalAuth ';
import { toast , ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


export default function RoomReservedForm({open , setOpen , roomSelected , doctors}) {
    const style = {
        position: 'relative' ,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: [320,350,400],
        bgcolor: 'background.paper',
        border: '2px solid #000',
        borderRadius:5,
        boxShadow: 24,
        padding: 4,
       
    };
    const [ doctorss , setDoctorss] = useState(doctors)
    const [name , setName] = useState()
    const [phone ,setPhone] = useState()
    const [national_id , setNational_id] = useState()
    const room_number = roomSelected?.number
    const [date , setDate] = useState()
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
        reserve({  name, phone, national_id, room_number,date ,'doctor_name' : doctorSelected ,setData})
    }

    console.log('data' , data)
        useEffect(() => {
            if(data?.status == true){
                toast.success(data?.msg, {
                    position: toast.POSITION.TOP_RIGHT
                });
                setName(null)
                setPhone(null)
                setNational_id(null)
                setDoctorSelected(null)
                setDate(null)
            }else{
                toast.error(data?.msg, {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        }, [data]);
    
return (
<>
    {open && (
        <div className={styles.formReserved}>
            <Box sx={style}  ref={formRef}>
                <Typography id="modal-modal-title" variant="h6" component="h2" style={{textAlign:'center' , fontSize:'22px' , color:'blue' }}>
                    Reservation room <span style={{color:'blue'}}> ({roomSelected.number}) </span>
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <form onSubmit={submitForm} method="POST">
                        <div >
                            <Label htmlFor="name">Name</Label>

                            <Input
                                id="name"
                                type="text"
                                name="name"
                                value={name}
                                className="block mt-1 w-full"
                                onChange={event => setName(event.target.value)}
                                required
                                autoFocus
                                autoComplete="off"
                            />
                            
                        </div>

                        <div  >
                            <Label htmlFor="national_id">National-id</Label>
                            <Input
                                id="national_id"
                                type="number"
                                value={national_id}
                                className="block mt-1 w-full"
                                onChange={event => setNational_id(event.target.value)}
                                required
                            />
                            
                        </div>

                        <div>
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                                id="phone"
                                type="number"
                                value={phone}
                                className="block mt-1 w-full"
                                onChange={event => setPhone(event.target.value)}
                                required
                            />
                            
                        </div>

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

                        <div  >
                            <Label htmlFor="doctor">Doctor</Label>
                            <select  className={styles.Selecion}  onChange={(e)=> setDoctorSelected(e.target.value)} required>
                                <option selected disabled  >Choose...</option>
                                {doctorss?.map((doctor) =>(
                                    <option key={doctor.id}> {doctor?.name}</option>
                                ))}
                            </select>
                            
                        </div>
                        <div className={styles.Submit}>
                            <Button style={{backgroundColor:'darkred'}} onClick={()=> setOpen(false)}>Cancel</Button>
                            <Button >Send</Button>
                        </div>
                        
                    </form>
                </Typography>
                
            </Box>
            <ToastContainer />
        </div>
    )}
</>
)
}
