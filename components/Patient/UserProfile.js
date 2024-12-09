import React from 'react'
import styles from '../../styles/Profile.module.css'

export default function UserProfile({data}) {
  return (
    <div>
        <div className={styles.data}>
            {data?.full_name &&(
                <div className={styles.info}>
                    <h4>Full Name: &nbsp;</h4>
                    <p>{data?.full_name}</p>
                </div>
            )}
            <div className={styles.info}>
                <h4>National ID: &nbsp;</h4>
                <p>{data?.national_id}</p>
            </div>
            <div className={styles.info}>
                <h4>Phone: &nbsp;</h4>
                <p>{'0' + data?.phone}</p>
            </div>
            <div className={styles.info}>
                <h4>Blood type: &nbsp;</h4>
                <p>{data?.blood_type}</p>
            </div>
            
            <div className={styles.info}>
                <h4>Chronic disease: &nbsp;</h4>
                <p>{data?.chronic_disease ? data?.chronic_disease : 'None'}</p>
            </div>
        </div>

        {data?.prescriptions?.length > 0 &&(
            <div>
                <div className={styles.headerPresecription}>
                    <h3>Prescriptions</h3>
                </div>
                <div className={styles.prescriptions}>
                    {data?.prescriptions?.map(prescription => (
                        <div key ={prescription?.id} className={styles.card}>
                            {prescription?.image && (
                                <div>
                                    <img src={`http://localhost:8000/images/prescriptions/${prescription?.image}`} alt="prescription image" className={styles.image} />
                                </div>
                            )}
                            <div className={styles.prescInfo}>
                                <p>Hospital:&nbsp; <span>{prescription?.doctor?.hospital?.name}</span></p>
                                <p>Doctor:&nbsp; <span>{prescription?.doctor?.name}</span></p>
                                {prescription?.problem && (<p>Problem:&nbsp; <span>{prescription?.problem}</span></p>)}
                                {prescription?.medicine && (<p>Medicine:&nbsp; <span>{prescription?.medicine}</span></p>)}
                                <p>Date:&nbsp; <span>{prescription?.created_at?.slice(0,10)}</span></p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}
    </div>
  )
}
