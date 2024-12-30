import { useAuth } from '@/Hooks/hospitalAuth '
import {  useEffect, useState } from 'react'
import Main from '@/components/Hospital/Main '
import HospitalLayout from '@/components/Layouts/HospitalLayout '
import Loading from '../../components/Loading'
import { useRouter } from 'next/router'
import localStorage from 'redux-persist/lib/storage'
import Reservations from '@/components/Doctor/Reservations '


export default function Home() {
    const {user , reservations , emergencyCases} = useAuth({'middleware':"" , 'redirectIfAuthenticated': ''})
    const [data , setData] = useState()
    const [reservs , setReservs] = useState()
    const [cases , setCases] = useState()
    const [x , setX] = useState(1)
    const router = useRouter()
    const [tokens , setTokens] = useState()
    const [userData , setUserData] = useState()

    useEffect(() => {
        const getToken = localStorage.getItem(('hospitalAuthToken')).then((token) =>{
          user({token,setUserData})
          reservations({token,setReservs})
          emergencyCases({token,setCases})          
          setTokens(token)
        })
      }, []);

    useEffect(() => {
        const api = setInterval( ()=>{
            const getToken = localStorage.getItem(('hospitalAuthToken')).then((token) =>{
                reservations({token,setReservs})
                emergencyCases({token,setCases})                    
            })
            setX(x+1)
        }, 60000);
        return () => clearInterval(api)
        }, [x])

    useEffect(() => {
        if(userData?.status == false){
            router.push('/auth/login')
        }
    }, [reservs]);
        
    const ress = reservs?.Reservations
        if(!userData?.name){
            return(
                <Loading  />
            )
        }

    return (
        <>
        
        <HospitalLayout token={tokens} user={userData} title="Hospital"
        container={
            <Main token={tokens} reservs={ress} cases={cases?.Emergency_cases}  setReservs={setReservs} />
        }/>
    
    </>
    )
    


}


