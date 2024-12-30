import React , { useEffect, useRef, useState } from 'react'
import { Button ,Input ,  Label } from '../Tools/Tools'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import styles from "../../styles/Hospital/Rooms.module.css"
import { toast , ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '@/Hooks/doctorAuth '

export default function PrescriptionForm({token ,open , setOpen , user_id }) {
    const style = {
        position: 'relative' ,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: [320,350,500],
        bgcolor: 'background.paper',
        border: '2px solid #000',
        borderRadius:5,
        boxShadow: 24,
        padding:'1rem 2rem',
    };

    
    const {prescription} = useAuth({'middleware' : 'auth'})
    const [problem , setProblem] = useState()
    const [medicine ,setMedicine] = useState()
    const [image , setImage] = useState()
    const [data , setData] = useState()

    

    const formRef = useRef()


    /*
    useEffect(() => {
        let handler = (e)=>{
            if(!formRef?.current?.contains(e.target) && !selectRef?.current?.contains(e.target) ){
                setOpen(false)
            }
        }

        window.addEventListener('mousedown',handler);
    });
    */

    


    const submitForm = async event => {
        event.preventDefault()
        prescription({  problem, medicine, image , user_id ,setData})
    }

        useEffect(() => {
            if(data?.status == true){
                toast.success(data?.msg, {
                    position: toast.POSITION.TOP_RIGHT
                });
                setProblem(null)
                setMedicine(null)
                setImage(null)
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
                <Typography id="modal-modal-title" variant="h6" component="h2" style={{textAlign:'center' , fontSize:'20px' , color:'blue' }}>
                    Prescription
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <form  onSubmit={submitForm} method="POST">
                        <div >
                            <Label htmlFor="problem">Problem</Label>

                            <Input
                                id="problem"
                                type="text"
                                name="problem"
                                value={problem}
                                className="block mt-1 w-full"
                                onChange={event => setProblem(event.target.value)}
                                required
                                autoFocus
                                autoComplete="off"
                            />
                            
                        </div>

                        <div  >
                            <Label htmlFor="medicine">Medicine</Label>
                            <Input
                                id="medicine"
                                type="text"
                                value={medicine}
                                className="block mt-1 w-full"
                                onChange={event => setMedicine(event.target.value)}
                                required
                            />
                            
                        </div>

                        <div>
                            <Label htmlFor="image">Image</Label>
                            <Input
                                id="image"
                                type="file"
                                className="block mt-1 w-full"
                                onChange={event => setImage(event.currentTarget.files[0])}
                                required
                            />
                            
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
