import Rooms from '@/components/Hospital/Rooms '
import HospitalLayout from '@/components/Layouts/HospitalLayout '
import HospitalNav from '@/components/Navbars/HospitalNav '
import { useAuth } from '@/Hooks/hospitalAuth '
import React, { useEffect , useState } from 'react'
import styles from '../../styles/Hospital/Home.module.css'
import { motion } from 'framer-motion'
import AddRoom from '@/components/Hospital/AddRoom '
import RoomReservedForm from '@/components/Hospital/RoomReservedForm '
import ClincalReservedForm from '@/components/Hospital/ClincalReservedForm '
import Clincal from '@/components/Hospital/Clincal '
import AddClincal from '@/components/Hospital/AddClincal '
import DeleteClincal from '@/components/Hospital/DeleteClincal '
import Loading from '@/components/Loading '
import { useRouter } from 'next/router'

export default function Clincals() {
    const { user , clincals } = useAuth({'middleware' : 'auth'})
    const [show, setShow] = useState(false)
    const [clincalss , setClincals] = useState()
    const [clincalAdded , setClincalAdded] = useState(false)
    const [open, setOpen] = useState(false);
    const [openDeleteForm, setOpenDeleteForm] = useState(false);
    const [clincalSelected, setClincalSelected] = useState([]);
    const [data , setData] = useState()
    const [x , setX] = useState(1)
    const router = useRouter()

    useEffect(() => {
        clincals({setClincals  })
    }, [x , clincalAdded]);

    const variants ={
            hover:{scale:1.06  ,
                translation:{type:'spring' }
        }
    }
    
    
    if(!clincalss?.clincals){
        return <Loading />
    }

  return (
    <HospitalLayout  container={
            <div className={styles.container}>
                <div style={{display:'flex' , justifyContent:'space-between' , alignItems:'center'}}>
                    <p>Clincals</p>
                    <motion.button className={styles.headButton} variants={variants} whileHover='hover' onClick={()=>setShow(true)}>Add Clincal</motion.button>
                </div>
                <div>
                    {show && (<>
                            <AddClincal setShow={setShow} setClincalAdded={setClincalAdded} />
                        </>)}
                    <Clincal clincals={clincalss?.clincals} setOpen={setOpen} setOpenDeleteForm={setOpenDeleteForm} setClincalSelected={setClincalSelected} />
                    
                </div>
                <DeleteClincal clincalSelected={clincalSelected} open={openDeleteForm} setOpen={setOpenDeleteForm} x={x} setX={setX} />
                <ClincalReservedForm clincalSelected={clincalSelected} open={open} setOpen={setOpen} x={x} setX={setX}  />
            </div>
            
                
       
    } />
  )
}

