import { useAuth } from '@/Hooks/auth '
import React, { useEffect, useState } from 'react'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import styles from '../../styles/Table.module.css'
import { motion } from 'framer-motion';

export default function ClincalsBookings({reservs , setX}) {
    const { cancelReservation } = useAuth({
        middleware: 'use',
        redirectIfAuthenticated: '/',
        })
  const variants ={
    hover:{scale:1.06  ,
        translation:{type:'spring' }
    }
    }


  const clincalsReservs = reservs?.filter(reserve => reserve?.clincal_id != null)
  return (
    <>
    
        {!clincalsReservs?.length > 0? (<div style={{padding:"10rem 0"  , display:'flex' , alignItems:'center' , justifyContent:'center' }}>
            <h4>No reservations of clincals to view.</h4>
        </div>):(
            <TableContainer component={Paper} className={styles.table}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead >
                <TableRow>
                <TableCell >HID</TableCell>
                <TableCell >CID</TableCell>
                <TableCell >clincal</TableCell>
                <TableCell >Date</TableCell>
                <TableCell >Created_at</TableCell>
                <TableCell >Status</TableCell>
                <TableCell ></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {clincalsReservs?.map((reserve) => (
                <TableRow key={reserve.id}>
                    <TableCell style={{paddingLeft:"20px"}}>{ reserve?.NORIH}</TableCell>
                    <TableCell style={{paddingLeft:"20px"}}>{reserve?.NORIC}</TableCell>
                    <TableCell >{reserve?.clincal?.name}</TableCell>
                    <TableCell >{ reserve?.date}</TableCell>
                    <TableCell >{reserve?.created_at}</TableCell>
                    <TableCell style={{color:'green'}} >{reserve?.status}</TableCell>
                    {reserve.status == 'accepted' ? 
                    (<>
                    <TableCell  style={{color:'blue'}}>
                        Aceepted
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
                            <motion.button className={styles.rejected} variants={variants} whileHover='hover' onClick={()=>
                            {   reserve.status = 'canceled';
                            cancelReservation({'id':reserve.id });
                        }}>Cancel</motion.button>
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