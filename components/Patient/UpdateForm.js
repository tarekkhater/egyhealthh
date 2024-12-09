import React , { useEffect, useRef, useState } from 'react'
import { Button ,Input ,  Label } from '../Tools/Tools'
import Typography from '@mui/material/Typography';
import styles from "../../styles/Hospital/Rooms.module.css"
import { useAuth } from '@/Hooks/auth ';
import { toast , ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { easeInOut, motion } from 'framer-motion';
import Box from '@mui/material/Box';


export default function UpdateForm({info , setOpen , x , setX }) {
    const style = {
        position: 'absolute' ,
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

    const [full_name , setFullName] = useState(info?.full_name)
    const [national_id , setNational_id] = useState(info?.national_id)
    const [phone , setPhone] = useState('0'+ info?.phone)
    const [chronic_disease , setChronic_disease] = useState(info?.chronic_disease)
    const [gentic_disease , setGentic_disease] = useState(info?.gentic_disease)
    const [blood_type , setBlood_type] = useState(info?.blood_type)
    const {updatePatientHistory} = useAuth({'middleware':'auth'})
    const [data , setData] = useState()

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
        updatePatientHistory({ full_name,  national_id ,phone , chronic_disease ,gentic_disease , blood_type , setData})
    }

        useEffect(() => {
            if(data?.status == true){
                toast.success(data?.msg, {
                    position: toast.POSITION.TOP_RIGHT
                });
                setX(x+1)
                setTimeout(() => {
                    setOpen(false)
                }, 4000);
            }else{
                toast.error(data?.msg, {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        }, [data]);

            
    
return (

    <div className={styles.formReserved}>
        <Box sx={style} ref={formRef}>
            <Typography id="modal-modal-title" variant="h6" component="h2" style={{textAlign:'center' , fontSize:'22px' , color:'darkred' }}>
                Data 
            </Typography>
    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        <form onSubmit={submitForm} method="POST">
                <div>
                    <Label htmlFor="fullname">Full name</Label>
                    <Input
                            id="fullname"
                            type="text"
                            value={full_name}
                            onChange={e => setFullName(e.target.value)}
                            required
                            placeHolder="Required"
                            autoFocus
                    />
                </div>
                <div>
                    <Label htmlFor="id">National ID</Label>
                    <Input
                        id="id"
                        type="number"
                        value={national_id}
                        onChange={e => setNational_id(e.target.value)}
                        required
                        placeHolder="Required"
                        autoFocus
                    />
                </div>
                <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                        id="phone"
                        type="number"
                        value={phone}
                        onChange={e => setPhone(parseInt(e.target.value))}
                        required
                        placeHolder="Required"
                        autoFocus
                    />
                </div>
                <div>
                    <Label htmlFor="blood">Blood Type</Label>
                    <Input
                        id="blood"
                        type="text"
                        value={blood_type}
                        onChange={e => setBlood_type(e.target.value)}
                        required
                        autoFocus
                        placeHolder="Required"
                    />
                </div>
                <div>
                    <Label htmlFor="chronic_disease">chronic_disease</Label>
                    <Input
                        id="chronic_disease"
                        type="text"
                        value={chronic_disease}
                        onChange={e => setChronic_disease(e.target.value)}
                        placeHolder="Optional"
                        autoFocus
                    />
                </div>
                <div>
                    <Label htmlFor="gentic_disease">gentic_disease</Label>
                    <Input
                        id="gentic_disease"
                        type="text"
                        value={gentic_disease}
                        onChange={e => setGentic_disease(e.target.value)}
                        placeHolder="Optional"
                        autoFocus
                    />
                </div>
            <div className={styles.Submit} style={{marginTop:'2rem' }}>
                <Button  onClick={()=> setOpen(false)}>Cancel</Button>
                <Button style={{backgroundColor:'darkred'}} type="submit">Update</Button>
            </div>
        </form>
    </Typography>
    </Box>
        <ToastContainer />
</div>
)
}
