import React from 'react'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import styles from '../../styles/Hospital/Home.module.css'
import { useAuth } from '@/Hooks/hospitalAuth ';
import { motion } from 'framer-motion';
export default function Doctors({doctors ,setDoctorSelected , setOpenDeleteForm }) {

    const variants ={
        hover:{scale:1.06  ,
            translation:{type:'spring' }
        }
        }
    return (
    <>
        {doctors?.length == 0? (<div style={{textAlign:"center" , marginTop:"120px"}}>
            <h6>No Reservations to view.</h6>
        </div>):
        
        (
            <TableContainer component={Paper} className={styles.table}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead >
                <TableRow>
                <TableCell >Doctor</TableCell>
                <TableCell >National_id</TableCell>
                <TableCell >Phone</TableCell>
                <TableCell >Specialty</TableCell>
                <TableCell >Days</TableCell>
                <TableCell ></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {doctors?.map((doctor) => (
                <TableRow id={doctor.name} key={doctor.id}>
                    <TableCell >
                    <div className={styles.cellWrapper}>
                    <img src={doctor?.image ?`http://domaiiiinonline.onlinewebshop.net/images/Users/${doctor?.image}` : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'} alt={doctor?.name} className={styles.image}/>
                        {doctor?.name}
                    </div>
                    </TableCell>
                    <TableCell >{doctor?.national_id}</TableCell>
                    <TableCell style={{paddingLeft:"20px"}} >{'0'+doctor?.phone}</TableCell>
                    <TableCell style={{paddingLeft:"20px"}}>{doctor?.specialty}</TableCell>
                    <TableCell style={{paddingLeft:"20px"}}>{doctor?.presence_days}</TableCell>
                    <TableCell>
                            <motion.button className={styles.AddDoctor} style={{backgroundColor:'rgba(152, 22, 22, 0.866)'}} variants={variants} whileHover='hover' onClick={()=>{setOpenDeleteForm(true); setDoctorSelected(doctor)}}>Delete</motion.button>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
        )}
        </>
  )
}
