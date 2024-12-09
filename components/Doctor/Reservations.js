import React, { useState } from 'react'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import styles from '../../styles/Hospital/Home.module.css'
import Link from 'next/link';
import { getTimestamp } from 'swr/_internal';
import { useAuth } from '@/Hooks/doctorAuth ';
import { motion } from 'framer-motion';
export default function Reservations({reservs , setOpen ,setPatientId }) {

    const variants ={
        hover:{scale:1.06  ,
            translation:{type:'spring' }
        }
        }


    console.log(reservs)
    return (
    <>
    
        {reservs?.length == 0? (<div style={{textAlign:"center" , marginTop:"120px"}}>
            <h4>No Reservations to view.</h4>
        </div>):
        (<>
        <TableContainer component={Paper} className={styles.table}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead >
                <TableRow>
                <TableCell >User</TableCell>
                <TableCell >Email</TableCell>
                <TableCell >Room</TableCell>
                <TableCell >Date</TableCell>
                <TableCell >Time</TableCell>
                <TableCell >Created_at</TableCell>
                <TableCell ></TableCell>
                <TableCell ></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {reservs?.map((reserve) => (
                <TableRow key={reserve.id}>
                    <TableCell >
                    <div className={styles.cellWrapper}>
                    <img src={reserve?.user?.image ?`http://domaiiiinonline.onlinewebshop.net/images/Users/${reserve?.user?.image}` : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'} alt={reserve.product?.name} className={styles.image}/>
                        {reserve.user? reserve.user.name : reserve?.name}
                    </div>
                    </TableCell>
                    <TableCell >{reserve.user? reserve.user.email : reserve?.name}</TableCell>
                    <TableCell style={{paddingLeft:"20px"}}>{reserve.room?.number}</TableCell>
                    <TableCell >{ reserve?.date}</TableCell>
                    <TableCell >{reserve?.time}</TableCell>
                    <TableCell >{reserve?.created_at}</TableCell>
                    
                    
                    {reserve?.status == 'accepted' ? (
                    <>
                        <TableCell>
                            <motion.button className={styles.done} variants={variants} whileHover='hover' onClick={()=>{setOpen(true) ; setPatientId(reserve?.user?.id)}} >Done</motion.button>
                        </TableCell>

                        
                    </>
                    ):(
                        <TableCell style={{color:'green'}}>
                            Done
                        </TableCell>
                    )}
                    <TableCell>
                            <a href={`doctor/patient/${reserve?.user?.id}`}>
                                <motion.button className={styles.accepted} variants={variants} whileHover='hover'>
                                    Info
                                </motion.button>
                            </a>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
        </>)}
       </>
  )
}
