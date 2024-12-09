import React from 'react'
import Link from 'next/link'
import { useState , useEffect } from 'react'
import {Button , Input ,  Label } from '../Tools/Tools'
import styles from "../../styles/Hospital/Rooms.module.css"
import { toast , ToastContainer } from 'react-toastify'
import { easeInOut, motion } from 'framer-motion'
import { useAuth } from '@/Hooks/hospitalAuth '
import 'react-toastify/dist/ReactToastify.css';

export default function AddClincal({setShow , setClincalAdded }) {
    const [name, setName] = useState('')
    const {addClincal} =  useAuth({'middleware':'auth'})
    const [data, setData] = useState()

    useEffect(() => {
        if(data?.status == true){
            toast.success(data?.msg, {
                position: toast.POSITION.TOP_RIGHT
            });
            setClincalAdded(true)
            setName('')
        }else{
            toast.error(data?.msg, {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }, [data]);
    const Add = async event => {
        event.preventDefault()
        addClincal({name  , setData})
    }
    console.log(data)
return (
    <div>
        <motion.form   className={styles.form}  method="POST"
        initial={{x:-400 , y:-400 ,  opacity:0 }}
        animate = {{x:0 , y: 0,  opacity:1}}
        end={{x:-400 , y:-400, opacity:0 }}
        transition={{type:"spring" , duration:.5 , ease:easeInOut , delay:1}}>
            <div className={styles.row}>
                <Label htmlFor="clincal">Clincal</Label>

                <Input
                    id="clincal"
                    type="text"
                    name="clincal"
                    value={name}
                    className="block mt-1 w-full"
                    onChange={event => setName(event.target.value)}
                    required
                    autoFocus
                    autoComplete="off"
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
