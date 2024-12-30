import React, { useState } from 'react'
import styles from '../../styles/PatientDataForm.module.css'
import { useAuth } from '@/Hooks/auth '
import { Button, Input, Label } from '../Tools/Tools'
import { toast , ToastContainer } from 'react-toastify'

export default function EnterDataForm({token,x , setX }) {
    const [full_name , setFullName] = useState()
    const [national_id , setNational_id] = useState()
    const [phone , setPhone] = useState()
    const [chronic_disease , setChronic_disease] = useState()
    const [gentic_disease , setGentic_disease] = useState()
    const [blood_type , setBlood_type] = useState()
    const[data ,setData] = useState()
    const {enterPatientHistory} = useAuth({'middleware':'auth'})

    const submitForm = async event => {
        event.preventDefault()
        enterPatientHistory({token ,full_name,  national_id ,phone , chronic_disease ,gentic_disease , blood_type , setData})
    }

    useEffect(() => {
        if(data?.status == true){
            toast.success(data?.msg, {
                position: toast.POSITION.TOP_RIGHT
            });
            setX(x+1)
            setTimeout(() => {
                setOpen(false)
            }, 4000);
        }else{
            toast.error(data?.msg, {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }, [data]);
  return (
    <div className={styles.container}>
        <form method='POST' onSubmit={submitForm} >
            <div className={styles.grid}>
                <div>
                        <Label htmlFor="fullname">Full name</Label>
                        <Input
                            id="fullname"
                            type="text"
                            value={full_name}
                            onChange={e => setFullName(e.target.value)}
                            required
                            autoFocus
                        />
                </div>
                <div>
                    <Label htmlFor="id">National ID</Label>
                    <Input
                        id="id"
                        type="number"
                        value={national_id}
                        onChange={e => setNational_id(e.target.value)}
                        required
                        autoFocus
                    />
                </div>
                <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                        id="phone"
                        type="number"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        required
                        autoFocus
                    />
                </div>
                <div>
                    <Label htmlFor="blood">Blood Type</Label>
                    <Input
                        id="blood"
                        type="text"
                        value={blood_type}
                        onChange={e => setBlood_type(e.target.value)}
                        required
                        autoFocus
                    />
                </div>
                <div>
                    <Label htmlFor="chronic_disease">chronic_disease</Label>
                    <Input
                        id="chronic_disease"
                        type="text"
                        value={chronic_disease}
                        onChange={e => setChronic_disease(e.target.value)}
                        required
                        autoFocus
                    />
                </div>
                <div>
                    <Label htmlFor="gentic_disease">gentic_disease</Label>
                    <Input
                        id="gentic_disease"
                        type="text"
                        value={gentic_disease}
                        onChange={e => setGentic_disease(e.target.value)}
                        required
                        autoFocus
                    />
                </div>
            </div>

            <div className={styles.Submit} style={{marginTop:'2rem' }}>
                <Button type="submit" style={{backgroundColor:'darkgreen'}}>Confirm</Button>
            </div>
        </form>
        <ToastContainer />
    </div>
  )
}
