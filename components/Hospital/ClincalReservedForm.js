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


export default function ClincalReservedForm({open , setOpen , clincalSelected }) {
    const style = {
        position: 'relative' ,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: [320,500,600],
        bgcolor: 'background.paper',
        border: '2px solid #000',
        borderRadius:5,
        boxShadow: 24,
        padding: 4,
       
    };
    
    let currentDate = new Date().toJSON().slice(0, 10);
    const [date , setDate] = useState(currentDate)
    const [data , setData] = useState()
    const { clincalReserve} = useAuth({'middleware' : 'auth'})
    

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


    const submitForm = async event => {
        event.preventDefault()
        clincalReserve({'clincal': clincalSelected.name , date ,setData})
    }

    console.log('data' , data)
        useEffect(() => {
            if(data?.status == true){
                toast.success(data?.msg, {
                    position: toast.POSITION.TOP_RIGHT
                });
                setDate(currentDate)
                setOpen(false)
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
                <Typography id="modal-modal-title" variant="h6" component="h2" style={{textAlign:'center' , fontSize:'22px' , color:'black' , fontFamily:'Arial, Helvetica, sans-serif' }}>
                    Do you want to reserve clincal <span style={{color:'blue'}}> ({clincalSelected?.name}) </span> at  <Input
                                id="date"
                                type="date"
                                value={date}
                                className="block mt-1 w-full"
                                onChange={event => setDate(event.target.value)}
                                required
                            />
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <form onSubmit={submitForm} method="POST">
                        <div className={styles.Submit}>
                            <Button style={{backgroundColor:'darkred'}} onClick={()=> setOpen(false)}>Cancel</Button>
                            <Button >Confirm</Button>
                        </div>
                        
                    </form>
                </Typography>
                
            </Box>
            
        </div>
    )}
    <ToastContainer />
</>
)
}
