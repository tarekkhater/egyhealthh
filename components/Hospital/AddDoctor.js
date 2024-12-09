import React , { useEffect, useRef, useState } from 'react'
import { Button ,Input ,  Label } from '../Tools/Tools'
import Box from '@mui/material/Box';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import styles from "../../styles/Hospital/Rooms.module.css"
import { useAuth } from '@/Hooks/hospitalAuth ';
import { toast , ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
        },
    },
    };

    const days = [
        
            'Saturday',
        ,
        
            'Sunday',
        ,
        
            'Monday',
        ,
        
            'Tuesday',
        ,
        
            'Wednesday',
        ,
        
            'Thursday',
        ,
        
            'Friday',
        ]

    function getStyles(day, presence_days, theme) {
        return {
            fontWeight:
            presence_days?.indexOf(day) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
            };
      }
    


export default function AddDoctor({open , setOpen ,x ,setX }) {
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

    const theme = useTheme();
  

    const handleChange = (event) => {
        const {
        target: { value },
        } = event;
        setPresence_days(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
        );
    };
    const st = {
        
    }

    const [name , setName] = useState()
    const [phone ,setPhone] = useState()
    const [password ,setPassword] = useState('')
    const [national_id , setNational_id] = useState()
    const [presence_days , setPresence_days] = useState([])
    const [password_confirmation, setPasswordConfirmation] = useState('')
    const [specialty , setSpecialty] = useState()
    const [data , setData] = useState()
    const { create } = useAuth({'middleware' : 'auth'})
    

    const formRef = useRef()
    const selectRef = useRef()


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
        create({  name, phone, national_id,specialty , password   , password_confirmation ,presence_days ,setData})
    }

        useEffect(() => {
            if(data?.status == true){
                toast.success(data?.msg, {
                    position: toast.POSITION.TOP_RIGHT
                });
                setX(x+1)
                setName('')
                setPhone('')
                setNational_id('')
                setPassword('')
                setPasswordConfirmation('')
                setSpecialty('')
                setPresence_days([''])
            }else{
                toast.error(data?.msg, {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        }, [data]);
    console.log(presence_days)
return (
<>
    {open && (
        <div className={styles.formReserved}>
            <Box sx={style}  ref={formRef}>
                <Typography id="modal-modal-title" variant="h6" component="h2" style={{textAlign:'center' , fontSize:'20px' , color:'blue' }}>
                    Add Doctor  
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <form style={st} onSubmit={submitForm} method="POST">
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
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                className="block mt-1 w-full"
                                onChange={event => setPassword(event.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="password_confirmation">Confirm Password</Label>
                            <Input
                                id="password_confirmation"
                                type="password"
                                value={password_confirmation}
                                className="block mt-1 w-full"
                                onChange={event => setPasswordConfirmation(event.target.value)}
                                required
                            />
                        </div>

                        <div  >
                            <Label htmlFor="speciality">Speciality</Label>
                            <Input
                                id="speciality"
                                type="text"
                                value={specialty}
                                className="block mt-1 w-full"
                                onChange={event => setSpecialty(event.target.value)}
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
                            <InputLabel id="demo-multiple-checkbox-label">presence_days</InputLabel>
                            <Select
                                
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                className={styles.SelecionDay}
                                multiple
                                value={presence_days}
                                onChange={handleChange}
                                required
                                input={<OutlinedInput label="day"  />}  
                                renderValue={(selected) => selected.join(', ')}
                                MenuProps={MenuProps}
                                placeholder="hello"
                                >
                                
                                {days?.map((day) => (
                                <MenuItem
                                    key={day}
                                    value={day}
                                >
                                    <Checkbox checked={presence_days.indexOf(day) > -1} />
                                    <ListItemText primary={day} />
                                </MenuItem>
                                ))}
                            </Select>
                            

                            
                        </div>


                        <div className={styles.Submit}>
                            <Button style={{backgroundColor:'darkred'}} onClick={()=> setOpen(false)}>Cancel</Button>
                            <Button >Send</Button>
                        </div>
                        
                        
                    </form>
                </Typography>
            </Box>
            
        </div>
    )}
</>
)
}
