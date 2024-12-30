import EmergencyCases from '@/components/Hospital/Cases '
import HospitalNav from '@/components/Navbars/HospitalNav '
import { useAuth } from '@/Hooks/hospitalAuth '
import React, { useState , useEffect } from 'react'
import HospitalLayout from '@/components/Layouts/HospitalLayout '
import Link from 'next/link'
import styles from '../../styles/Hospital/Home.module.css'
import Loading from '@/components/Loading '
import { useRouter } from 'next/router'
import localStorage from 'redux-persist/lib/storage'

export default function Emergency_Cases() {
    const {user , emergencyCases } = useAuth({'middleware':"auth" , 'redirectIfAuthenticated':''})
    const [date , setDate] = useState()
    const [cases , setCases] = useState()
    const router = useRouter()
    const [tokens , setTokens] = useState()
    const [userData , setUserData] = useState()

    useEffect(() => {
        const getToken = localStorage.getItem(('hospitalAuthToken')).then((token) =>{
            emergencyCases({token , setCases  })
            user({token , setUserData  })
            setTokens(token)
          })
    }, []);
    
    if(!cases?.Emergency_cases){
        return <Loading />
    }

    return (
    <HospitalLayout 
    token={tokens}
    user={userData}
        container={
        <div className={styles.container}>
            <div style={{display:'flex' , justifyContent:'space-between' , alignItems:'center'}}>
            <p>Emergency Cases</p>
                <div>
                    <label htmlFor='date' > Day  </label>
                    <input type='date' onChange={(e)=>{setDate(e.target.value);}} />
                </div>
            </div>
            <div>
                <EmergencyCases cases={date? cases?.Emergency_cases?.filter(Case=> Case?.created_at.slice(0,10) == date) :cases?.Emergency_cases}  />
            </div>
        </div>
        
    }/>
  )
}

