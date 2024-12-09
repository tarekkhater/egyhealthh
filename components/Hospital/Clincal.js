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
export default function Clincal({clincals , setOpenDeleteForm , setOpen ,setClincalSelected }) {
    const variants ={
        hover:{scale:1.06  ,
            translation:{type:'spring' }
        }
        }
    return (
    <>
        {clincals?.length == 0? (<div style={{textAlign:"center" , marginTop:"120px"}}>
            <h6>No Clincals to view.</h6>
        </div>):
        
        (
            <TableContainer component={Paper} className={styles.table}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead >
                <TableRow>
                <TableCell >ID</TableCell>
                <TableCell >Clincal</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {clincals?.map((clincal) => (
                <TableRow key={clincal.id}>
                    <TableCell >
                        {clincals?.indexOf(clincal) + 1}
                    </TableCell>
                    <TableCell style={{paddingLeft:"30px"}} >{clincal?.name}</TableCell>
                    <TableCell>
                            <motion.button className={styles.clincalButtons} variants={variants} whileHover='hover' onClick={()=>{setOpen(true); setClincalSelected(clincal)}}>Reserve</motion.button>
                    </TableCell>
                    <TableCell>
                            <motion.button className={styles.clincalButtons} style={{backgroundColor:'rgba(152, 22, 22, 0.866)'}} variants={variants} whileHover='hover' onClick={()=>{setOpenDeleteForm(true); setClincalSelected(clincal)}}>Delete</motion.button>
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
