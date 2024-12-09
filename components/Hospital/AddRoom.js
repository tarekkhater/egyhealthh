import React from 'react'
import Link from 'next/link'
import { useState , useEffect } from 'react'
import {Button , Input ,  Label } from '../Tools/Tools'
import styles from "../../styles/Hospital/Rooms.module.css"
import { toast , ToastContainer } from 'react-toastify'
import { easeInOut, motion } from 'framer-motion'
import { useAuth } from '@/Hooks/hospitalAuth '
import 'react-toastify/dist/ReactToastify.css';

export default function AddRoom({setShow , setRoomAdded }) {
    const [number, setNumber] = useState('')
    const [floor, setFloor] = useState('')
    const {addRoom} =  useAuth({'middleware':'auth'})
    const [data, setData] = useState()

    useEffect(() => {
        if(data?.status == true){
            toast.success(data?.msg, {
                position: toast.POSITION.TOP_RIGHT
            });
            setRoomAdded(true)
            setNumber('')
            setFloor('')
        }else{
            toast.error(data?.msg, {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }, [data]);
    const Add = async event => {
        event.preventDefault()
        addRoom({number , floor , setData})
    }
return (
    <div>
        <motion.form   className={styles.form}  method="POST"
        initial={{x:-400 , y:-400 ,  opacity:0 }}
        animate = {{x:0 , y: 0,  opacity:1}}
        end={{x:-400 , y:-400, opacity:0 }}
        transition={{type:"spring" , duration:0.5 , ease:easeInOut , delay:1}}>
            <div className={styles.row}>
                <Label htmlFor="number">Number</Label>

                <Input
                    id="number"
                    type="number"
                    name="number"
                    value={number}
                    className="block mt-1 w-full"
                    onChange={event => setNumber(event.target.value)}
                    required
                    autoFocus
                    autoComplete="off"
                />
                
            </div>

            <div  className={styles.row}>
                <Label htmlFor="floor">Floor</Label>
                <Input
                    id="floor"
                    type="number"
                    value={floor}
                    className="block mt-1 w-full"
                    onChange={event => setFloor(event.target.value)}
                    required
                />
                
            </div>

            <div className={styles.confirmLogin}>
            <Button style={{backgroundColor:"brown"}} onClick={()=>setShow(false)} >Cancel</Button>
            <Button className={styles.add} onClick={Add} >Add</Button>
            </div>
            <ToastContainer />
        </motion.form>
    </div>
  )
}
