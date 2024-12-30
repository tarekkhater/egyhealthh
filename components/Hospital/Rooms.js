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
export default function Rooms({rooms , setOpen , setOpenDeleteForm ,setRoomSelected }) {

    const variants ={
        hidden: { opacity: 0, y: -10 },
        visible: { opacity: 1, y: 0 },
        hover:{scale:1.06  ,
            translation:{type:'spring' }
        }
        }
    return (
    <>
        {rooms?.length == 0? (<div style={{textAlign:"center" , marginTop:"120px"}}>
            <h6>No Rooms to view.</h6>
        </div>):
        
        (
            <TableContainer component={Paper} className={styles.table}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead >
                <TableRow>
                <TableCell >Room</TableCell>
                <TableCell >Floor</TableCell>
                <TableCell >Status</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rooms?.map((room) => (
                <motion.tr
                key={room.id}
                variants={variants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.8 }}
                >
                    <TableCell >
                    <div className={styles.cellWrapper}>
                    <img src='https://media.gemini.media/img/Original/2022/9/10/2022_9_10_16_8_8_248.jpg' alt={room?.number} className={styles.image}/>
                        {room?.number}
                    </div>
                    </TableCell>
                    <TableCell style={{paddingLeft:"20px"}} >{room?.floor}</TableCell>
                    {room?.status == 1? (
                        <>
                        <TableCell style={{paddingLeft:"20px" , color:'blue'}}>Available</TableCell>
                        <TableCell>
                            <motion.button className={styles.AddDoctor} variants={variants} whileHover='hover' onClick={()=>{setOpen(true); setRoomSelected(room)}}>Reserve</motion.button>
                        </TableCell>
                        
                        </>
                    ):
                    (
                        <>
                            <TableCell style={{paddingLeft:"20px" , color:'darkred'}} >Reserved</TableCell>
                            <TableCell></TableCell>
                        </>
                    )}
                    <TableCell>
                            <motion.button className={styles.AddDoctor} style={{backgroundColor:'rgba(152, 22, 22, 0.866)'}} variants={variants} whileHover='hover' onClick={()=>{setOpenDeleteForm(true); setRoomSelected(room)}}>Delete</motion.button>
                    </TableCell>
                </motion.tr>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
        )}
        </>
  )
}
