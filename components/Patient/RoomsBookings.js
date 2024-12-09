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

export default function RoomsBookings({reservs , setX}) {
  const variants ={
    hover:{scale:1.06  ,
        translation:{type:'spring' }
    }
    }


  const roomsReservs = reservs?.filter(reserve => reserve?.room_id != null)
  return (
    <>
    
        {!roomsReservs?.length > 0? (<div style={{padding:"10rem 0" , display:'flex' , alignItems:'center' , justifyContent:'center' }}>
            <h4>No reservations of rooms to view.</h4>
        </div>):(
            <TableContainer component={Paper} className={styles.table}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead >
                <TableRow>
                <TableCell >Room</TableCell>
                <TableCell >Doctor_reserved</TableCell>
                <TableCell >Date</TableCell>
                <TableCell >Created_at</TableCell>
                <TableCell ></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {roomsReservs?.map((reserve) => (
                <TableRow key={reserve.id}>
                    <TableCell >
                    <div className={styles.cellWrapper}>
                    <img src='https://media.gemini.media/img/Original/2022/9/10/2022_9_10_16_8_8_248.jpg' alt={reserve?.room?.number} className={styles.image}/>
                        {reserve?.room?.number}
                    </div>
                    </TableCell>
                    <TableCell style={{paddingLeft:"20px"}}>{reserve?.doctor? reserve?.doctor.name : 'Not Defined'}</TableCell>
                    <TableCell >{ reserve?.date}</TableCell>
                    <TableCell >{reserve?.created_at}</TableCell>
                    
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
                            setX(x+1)
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