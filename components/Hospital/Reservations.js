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
export default function Reservations({token,reservs , ShowManualReservations}) {
    const {acceptReservations , finishReservations , rejectReservations , reservations} = useAuth({'middleware':"auth" , 'redirectIfAuthenticated': ''})
    const variants ={
        hidden: { opacity: 0, y: -10 },
        visible: { opacity: 1, y: 0 },
        hover:{scale:1.06  ,
            translation:{type:'spring' }
        }
        }

    const OnlineReservs = reservs?.filter(reserve => reserve?.name == null)
    const manualReservs  = reservs?.filter(reserve => reserve?.name !== null)
    

    console.log( OnlineReservs)
    return (
    <>
    
        {reservs?.length == 0? (<div style={{marginTop:"1rem" , display:'flex' , alignItems:'center' , justifyContent:'center' }}>
            <h4>No Reservations to view.</h4>
        </div>):
        ShowManualReservations? 
        (<>
        <TableContainer component={Paper} className={styles.table}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead >
                <TableRow>
                <TableCell >User</TableCell>
                <TableCell >National_id</TableCell>
                <TableCell >Phone</TableCell>
                <TableCell >Room</TableCell>
                <TableCell>Doctor</TableCell>
                <TableCell >Date</TableCell>
                <TableCell >Created_at</TableCell>
                <TableCell ></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {manualReservs?.map((reserve) => (
                <motion.tr
                                key={reserve.id}
                                variants={variants}
                                initial="hidden"
                                animate="visible"
                                transition={{ duration: 0.8 }}
                              >
                    <TableCell >
                    <div className={styles.cellWrapper}>
                    <img src={reserve?.user?.image ?`http://domaiiiinonline.onlinewebshop.net/images/Users/${reserve?.user?.image}` : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'} alt={reserve.product?.name} className={styles.image}/>
                        {reserve?.name}
                    </div>
                    </TableCell>
                    <TableCell >{reserve?.national_id}</TableCell>
                    <TableCell style={{paddingLeft:"20px"}} >{ '0' + reserve?.phone}</TableCell>
                    <TableCell style={{paddingLeft:"20px"}}>{reserve.room?.number}</TableCell>
                    <TableCell>{reserve?.doctor? 'Dr ' + reserve?.doctor?.name : 'None' }</TableCell>
                    <TableCell >{reserve?.date}</TableCell>
                    <TableCell >{reserve?.created_at}</TableCell>
                    
                    {reserve.status == 'accepted' ? 
                    (<>
                    <TableCell  style={{color:'blue'}}>
                        Aceepted
                    </TableCell>
                    <TableCell>
                        <motion.button className={styles.done} variants={variants} whileHover='hover' onClick={()=>
                            {   reserve.status = 'done';
                            finishReservations({token,'id':reserve.id })
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
                            acceptReservations({token,'id' : reserve.id })
                            }} >Aceept</motion.button>
                        </TableCell>
                        
                        <TableCell>
                            <motion.button className={styles.rejected} variants={variants} whileHover='hover' onClick={()=>
                            {   reserve.status = 'rejected';
                            rejectReservations({token,'id':reserve.id })
                        }}>Reject</motion.button>
                        </TableCell>
                        </>
                    )
                    }
                    
                    
                </motion.tr>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
        </>):
        (
            <TableContainer component={Paper} className={styles.table}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead >
                <TableRow>
                <TableCell >User</TableCell>
                <TableCell >Email</TableCell>
                <TableCell >Doctor_reserved</TableCell>
                <TableCell >Room</TableCell>
                <TableCell >Date</TableCell>
                <TableCell >Time</TableCell>
                <TableCell >Created_at</TableCell>
                <TableCell ></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {OnlineReservs?.map((reserve) => (
                <motion.tr
                key={reserve.id}
                variants={variants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.8 }}
              >
                    <TableCell >
                    <div className={styles.cellWrapper}>
                    <img src={reserve?.user?.image ?`http://domaiiiinonline.onlinewebshop.net/images/Users/${reserve?.user?.image}` : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'} alt={reserve.product?.name} className={styles.image}/>
                        {reserve.user? reserve.user.name : reserve?.name}
                    </div>
                    </TableCell>
                    <TableCell >{reserve.user? reserve.user.email : reserve?.name}</TableCell>
                    <TableCell style={{paddingLeft:"20px"}} >{reserve?.doctor? reserve?.doctor.name : 'None'}</TableCell>
                    <TableCell style={{paddingLeft:"20px"}}>{reserve.room?.number}</TableCell>
                    <TableCell >{ reserve?.date}</TableCell>
                    <TableCell >{reserve?.time}</TableCell>
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
                    
                    
                </motion.tr>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
        )}
        </>
  )
}
