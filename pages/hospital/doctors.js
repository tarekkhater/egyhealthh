import Doctors from '@/components/Hospital/Doctors '
import HospitalNav from '@/components/Navbars/HospitalNav '
import { useAuth } from '@/Hooks/hospitalAuth '
import React, { useState , useEffect } from 'react'
import HospitalLayout from '@/components/Layouts/HospitalLayout '
import Link from 'next/link'
import styles from '../../styles/Hospital/Home.module.css'
import { motion } from 'framer-motion'
import AddDoctor from '@/components/Hospital/AddDoctor '
import DeleteDoctor from '@/components/Hospital/DeleteDoctor '
import Loading from '@/components/Loading '
import { useRouter } from 'next/router'
import localStorage from 'redux-persist/lib/storage'

export default function Reservs() {
    const {user , doctors , search } = useAuth({'middleware':"auth"})
    const [open , setOpen] = useState()
    const [data , setData] = useState()
    const [result , setResult] = useState()
    const [value , setValue] = useState()
    const [doctorSelected , setDoctorSelected] = useState()
    const [x , setX] = useState(1)
    const [openDeleteForm , setOpenDeleteForm] = useState(false)
    const router = useRouter()
    const [tokens , setTokens] = useState()
    const [userData , setUserData] = useState()

    useEffect(() => {
        const getToken = localStorage.getItem(('hospitalAuthToken')).then((token) =>{
            doctors({token , setData  })
            user({token , setUserData  })
            setTokens(token)
          })
    }, [x]);


    const variants ={
        hover:{scale:1.06  ,
            translation:{type:'spring' }
        }
    }

    useEffect(() => {
        search({'token' : tokens,value , setResult})
    }, [value]);

  
    
    if(!data?.Doctors){
        return <Loading />
    }

  return (
    <HospitalLayout token={tokens} user={userData} Navbar={<HospitalNav user={userData}  />}
        container={
        <div className={styles.container}>
            <div style={{display:'flex' , justifyContent:'space-between' , alignItems:'center'}}>
            <div style={{position:'relative'}}>
                <input type='search' placeholder='Search' value={value} className={styles.search} onChange={(e)=> setValue(e.target.value)} />
                {/* result?.Doctors?.length > 0 && (
                    <div className={styles.searchResults}>
                    {result?.Doctors?.map((doc) =>(
                        <div key={doc.id} className={styles.result}>
                            <a href={`#${doc.name}`}>{doc.name}</a>
                        </div>
                    )) 
                    </div>
                    )*/}
            </div>
            <motion.button className={styles.headButton} variants={variants} whileHover='hover' onClick={()=>setOpen(true)}>Add Doctor</motion.button>
            </div>
            
            
            <div style={{marginTop:'1rem'}}>
            <p>Doctors</p>
                <Doctors doctors={!value ? data?.Doctors  :result?.Doctors?.length  == 0 ? data?.Doctors : result?.Doctors}
                setDoctorSelected={setDoctorSelected} setOpenDeleteForm={setOpenDeleteForm} /> 
            </div>
            <AddDoctor token={tokens}  open={open} setOpen={setOpen}  x={x} setX={setX} />
            <DeleteDoctor token={tokens} doctorSelected={doctorSelected} open={openDeleteForm} setOpen={setOpenDeleteForm} x={x} setX={setX} />
        </div>
        
    }/>
  )
}

