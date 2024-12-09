import React from 'react'
import styles from '../styles/Loading.module.css'
export default function Loading() {
  return (
    <div className={styles.container}>
        <div className={styles.ring}>
            
        </div>
        <p>Loading...</p>
    </div>
  )
}
