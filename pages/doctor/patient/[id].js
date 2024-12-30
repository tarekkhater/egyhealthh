import { useAuth } from '@/Hooks/doctorAuth '
import Reservations from '@/components/Doctor/Reservations '
import DoctorLayout from '@/components/Layouts/DoctorLayout '
import { useRouter } from 'next/router'
import React , { useEffect , useState } from 'react'
import styles from '../../../styles/Doctor/PatientInfo.module.css'
import localStorage from 'redux-persist/lib/storage'
import Loading from '@/components/Loading '


export default function Patient () {
  const {query} = useRouter()
  const {id} = query
  const [ reservs , setReservs] = useState()
  const {reservations , user} = useAuth({'middleware' : 'auth'})
  const router = useRouter()
  const [userData , setUserData] = useState()
  const [tokens , setTokens] = useState()

  useEffect(() => {
    const getToken = localStorage.getItem(('doctorAuthToken')).then((token) =>{
      user({token,setUserData})
      reservations({token , setReservs  })
      setTokens(token)
    })
  }, []);

  const data = reservs?.Reservations
  const reserve = data?.find(res => res?.user?.id == id)
  const patient = reserve?.user
  
  useEffect(() => {
    if(reservs?.status == false){
      router.push('/auth/login')
  }
  }, [reservs]);

  if(!patient){
    return(
      <Loading />
    )
  } 

  if(!patient?.patient_history){
    return <DoctorLayout token={tokens} user={userData}  container={
      <div style={{width:'100%' ,display:'flex' , justifyContent:'center' , 'alignItems':'center' }}> 
        <h3>Patient didn't pull data yet.</h3>
      </div>
    } />
  }

  return (
    <DoctorLayout token={tokens} user={userData} container={
      <div >
        <h2>Patient &gt; {patient?.name} </h2>
        <div className={styles.container}>
          <div>
            <img  src={patient?.image ? `http://localhost:8000/public/images/users/${patient?.image}` : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}   alt={patient?.name} className={styles.image} />
          </div>
          <div className={styles.info}>
            <p><span>Name: </span> {patient?.patient_history?.full_name}</p>
            <p><span>National id: </span> {patient?.patient_history?.national_id}</p>
            <p><span>Phone: </span> 0{patient?.patient_history?.phone}</p>
            <p><span>Chronic Disesase: </span> {patient?.patient_history?.chronic_disease ? patient?.patient_history?.chronic_disease : 'None' }</p>
            <p><span>Gentic Disease: </span> {patient?.patient_history?.gentic_disease ? patient?.patient_history?.gentic_disease : 'None' }</p>
            <p><span>Blood Type: </span> {patient?.patient_history?.blood_type}</p>
            <p><span>Surgey: </span> {patient?.patient_history?.surgey ? patient?.patient_history?.surgey : 'None'}</p>
          </div>
      </div>
      </div>
    } />
)
}
