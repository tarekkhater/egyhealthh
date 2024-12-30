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


export default function ClincalReservation({token,setReserveType , setShow , clincals , id}) {
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
    const hospitalClincals = clincals?.filter(clincal => clincal?.hospital_id == id)
    const [date , setDate] = useState(currentDate)
    const [data , setData] = useState()
    const [clincal , setClincal] = useState()
    const { clincalReserve} = useAuth({'middleware' : 'auth'})
    


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



    const submitForm = async event => {
        event.preventDefault()
        clincalReserve({token , clincal,  date  , 'hospital_id':id ,setData})
    }

    console.log('data' , data)
        useEffect(() => {
            if(data?.status == true){
                toast.success(data?.msg, {
                    position: toast.POSITION.TOP_RIGHT
                });
                setClincal('')
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
    end={{x:-200 , opacity:0}}
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
                <Label htmlFor="clincal">Clincal</Label>
                <select id='clincal' className={styles.Selecion}  onChange={(e)=> setClincal(e.target.value)} required>
                    <option selected disabled  >Choose...</option>
                        {hospitalClincals?.map((clincal) =>(
                            <option key={clincal.id}> {clincal?.name}</option>
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
