import React, { useState } from 'react'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import styles from '../../styles/Table.module.css'
import Link from 'next/link';
import { getTimestamp } from 'swr/_internal';
import { useAuth } from '@/Hooks/hospitalAuth ';
import { motion } from 'framer-motion';
export default function ClincalReservations({reservs , ShowManualReservations}) {
    const {acceptReservations , finishReservations , rejectReservations , reservations} = useAuth({'middleware':"auth" , 'redirectIfAuthenticated': ''})
    const variants ={
        hover:{scale:1.06  ,
            translation:{type:'spring' }
        }
        }
    const todayReservs = reservs?.filter(reserve => reserve?.NORIH )

    
    console.log(todayReservs)
    return (
    <>
    
        {reservs?.length == 0? (<div style={{marginTop:"1rem" , display:'flex' , alignItems:'center' , justifyContent:'center'}}>
            <h4>No Reservations to view.</h4>
        </div>):
       
        (
            <TableContainer component={Paper} className={styles.table}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead >
                <TableRow>
                {reservs?.length == todayReservs?.length &&(
                    <>
                        <TableCell >HID</TableCell>
                        <TableCell >CID</TableCell>
                    </>
                )}
                <TableCell >User</TableCell>
                <TableCell >Email</TableCell>
                <TableCell >Clincal</TableCell>
                <TableCell >Date</TableCell>
                <TableCell >Created_at</TableCell>
                <TableCell ></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {reservs?.map((reserve) => (
                <TableRow key={reserve.id}>
                    {reservs?.length == todayReservs?.length &&(
                    <>
                        <TableCell >{reserve.NORIH}</TableCell>
                        <TableCell >{reserve.NORIC}</TableCell>
                    </>
                    )} 
                    <TableCell >
                    <div className={styles.cellWrapper}>
                    <img src={reserve?.user?.image ?`http://domaiiiinonline.onlinewebshop.net/images/Users/${reserve?.user?.image}` : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'} alt={reserve.product?.name} className={styles.image}/>
                        {reserve.user? reserve.user.name : "Patient"}
                    </div>
                    </TableCell>
                    <TableCell >{reserve.user? reserve.user.email : "None"}</TableCell>
                    <TableCell style={{paddingLeft:"20px"}}>{reserve.clincal?.name}</TableCell>
                    <TableCell >{ reserve?.date}</TableCell>
                    <TableCell >{reserve?.created_at}</TableCell>
                    
                    {reserve.status == 'accepted' ? 
                    (<>
                    <TableCell  style={{color:'blue'}}>
                        Aceepted
                    </TableCell>
                    <TableCell>
                        <motion.button className={styles.done} variants={variants} whileHover='hover' onClick={()=>
                            {   reserve.status = 'done';
                            finishReservations({'id':reserve.id })
                        }} >Done</motion.button>
                    </TableCell>
                        </>) :
                    
                    reserve.status == 'rejected' ?
                    (
                        <TableCell style={{color:'rgba(152, 22, 22, 0.866)'}}>
                        Rejected
                        </TableCell>
                    ): 
                    reserve.status == 'done' ?
                    (
                        <TableCell style={{color:'green'}}>
                        Done
                        </TableCell>
                    ) :
                    reserve.status == 'canceled' ?
                    (
                        <TableCell style={{color:'orange'}}>
                        canceled
                        </TableCell>
                    ) :
                    (
                        <>
                        <TableCell>
                            <motion.button className={styles.accepted} variants={variants} whileHover='hover' onClick={()=>
                            {
                            reserve.status = 'accepted';
                            acceptReservations({'id' : reserve.id })
                            }} >Aceept</motion.button>
                        </TableCell>
                        
                        <TableCell>
                            <motion.button className={styles.rejected} variants={variants} whileHover='hover' onClick={()=>
                            {   reserve.status = 'rejected';
                            rejectReservations({'id':reserve.id })
                        }}>Reject</motion.button>
                        </TableCell>
                        </>
                    )
                    }
                    
                    
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
        )}
        </>
  )
}
