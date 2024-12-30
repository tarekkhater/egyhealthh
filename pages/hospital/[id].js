import { useAuth } from '@/Hooks/auth '
import Layout from '@/components/Layouts/Layout ';
import { Button } from '@/components/Tools/Tools ';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import styles from '../../styles/HospitalSelected.module.css'
import ReservationForm from '@/components/Patient/ReservationForm ';
import Loading from '@/components/Loading ';
import localStorage from 'redux-persist/lib/storage'

export default function Hospital() {
    const { getHospitals , getClincals} = useAuth({'middleware':'auth'})
    const [hospitals , setHospitals] = useState()
    const [clincals , setClincals] = useState()
    const [show , setShow] = useState(false)
    const router = useRouter()
    const {query} = router
    const {id} = query
    const [tokens , setTokens] = useState()

    useEffect(() => {
      const getToken = localStorage.getItem(('authToken')).then((token) =>{
        getHospitals({token,setHospitals})
        getClincals({token,setClincals})
        setTokens(token)
      })
      
  },[id]);
    const hospital = hospitals?.hospitals?.find(hospital => hospital?.id == id)
    console.log(hospital)
    if(!hospitals?.hospitals){
      return <Loading />
    }
  return (
    <Layout token={tokens}  className='container' 
    container={
      <div className={styles.container}> 
        <h2 className={styles.name}>{hospital?.name}</h2>
        <div className={styles.hospital}>
          <div>
            <img src={hospital?.image? `http://egyhealtth.onlinewebshop.net/images/${hospital?.image}` : "https://previews.123rf.com/images/msvetlana/msvetlana1404/msvetlana140400005/27517091-hospital-building-on-a-city-street-with-trees-and-road.jpg"} className={styles.imageHospital} alt={hospital?.name} />
          </div>
          <div className={styles.hospitalInfo}>
            <p>Adress:&nbsp; <span>{hospital?.address}</span></p>
            <p>Emergency days:&nbsp; <span>{hospital?.emergency_days}</span></p>
            <p>Emergency :&nbsp; <span className={hospital.emergency == 'available' ? styles.available : styles.unavailable}>{hospital.emergency}</span></p>
            <div>
              <Button style={{backgroundColor:'darkred'}} disabled={hospital.emergency == 'unavailable'}>Request emergency</Button>
              <Button style={{backgroundColor:'green' , marginLeft:'1.5rem'}}  onClick={()=>setShow(true)}>reserve</Button>
            </div>
          </div>
        </div>
        <h2 className={styles.name} style={{marginTop:'2rem'}} >Doctors</h2>
        <div className={styles.doctors}>
          {hospital?.doctor?.map(doctor =>
            <div key={doctor?.id} className={styles.doctor}>
              <img src={doctor?.image? `https://localhost:8000/images/${doctor?.image}` : "https://post.healthline.com/wp-content/uploads/2020/08/Doctors_For_Men-732x549-thumbnail.jpg"} className={styles.imageDoctor} alt={doctor?.name} />
              <div className={styles.doctorInfo}>
                <h3>{doctor?.name}</h3>
                <p>Specialty:&nbsp; <span>{doctor?.specialty}</span></p>
                <p>Days:&nbsp; <span>{doctor?.presence_days}</span></p>
              </div>
            </div>
          )}
        </div>
        {show && (
          <div>
            <ReservationForm token={tokens} show={show} setShow={setShow} clincals={clincals?.clincals} doctors={hospital?.doctor} rooms={hospital?.room} id={id} />
          </div>
        )}
      </div>
    }/>
  )
}
