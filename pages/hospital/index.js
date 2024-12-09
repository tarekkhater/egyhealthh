
import { useAuth } from '@/Hooks/hospitalAuth '
import {  useEffect, useState } from 'react'
import Main from '@/components/Hospital/Main '
import HospitalLayout from '@/components/Layouts/HospitalLayout '
import Loading from '../../components/Loading'
import { useRouter } from 'next/router'


export default function Home() {
    const {user , reservations , emergencyCases} = useAuth({'middleware':"auth" , 'redirectIfAuthenticated': ''})
    const hospital = user
    const [data , setData] = useState()
    const [reservs , setReservs] = useState()
    const [cases , setCases] = useState()
    const [x , setX] = useState(1)
    const router = useRouter()

    useEffect(() => {
        reservations({setReservs})
        emergencyCases({setCases})
    }, []);

    useEffect(() => {
        const api = setInterval( ()=>{
            reservations({setReservs  })
            emergencyCases({setCases  })
            setX(x+1)
        }, 60000);
        return () => clearInterval(api)

        }, [x])

    useEffect(() => {
        if(reservs?.Reservations == false){
            router.push('/auth/login')
        }
    }, [reservs]);
        
    const ress = reservs?.Reservations
    
        if(!reservs?.Reservations){
            return(
                <Loading  />
            )
        }

    return (
        <>
        
        <HospitalLayout title="Hospital"
        container={
            <Main reservs={ress} cases={cases?.Emergency_cases}  setReservs={setReservs} />
        }/>
    
    </>
    )
    


}


