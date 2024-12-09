import React from 'react'
import styles from '../../styles/NearestHospitals.module.css'
export default function Hospitals({hospitals}) {
  return (
    <>
      {hospitals?.length >0 &&(
        <>
          {hospitals?.map(hospital =>(
          <a key={hospital.id} href={`/hospital/${hospital.id}`} >
            <div className={styles.card}>
            <img src={hospital.image? `https://localhost:8000/images/${hospital.image}` : "https://previews.123rf.com/images/msvetlana/msvetlana1404/msvetlana140400005/27517091-hospital-building-on-a-city-street-with-trees-and-road.jpg"} className={styles.image} alt={hospital.name} />
            <h4>{hospital.name }</h4>
            <p>{hospital.address.slice(0,1).toUpperCase() +hospital.address?.slice(1,111)}</p>
            
            <div>
              <p>Emergency: </p> &nbsp; &nbsp;
              <p className={hospital.emergency == 'available' ? styles.available : styles.unavailable}>{hospital.emergency}</p>
            </div>
          </div>
          </a>
          ))}
        </>
      )}
      
    </>
  )
}
