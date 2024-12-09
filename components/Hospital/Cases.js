import React from 'react'
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
import { useAuth } from '@/Hooks/hospitalAuth ';
export default function EmergencyCases({cases ,  token}) {

    return (
    <>
        {cases?.length == 0? (<div style={{textAlign:"center" , marginTop:"120px"}}>
            <h6>No Cases to view.</h6>
        </div>):
        
        (
            <TableContainer component={Paper} className={styles.table}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead >
                <TableRow>
                <TableCell >User</TableCell>
                <TableCell >Email</TableCell>
                <TableCell >Phone</TableCell>
                <TableCell >National id</TableCell>
                <TableCell >Created_at</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {cases?.map((Case) => (
                <TableRow key={Case.id}>
                    <TableCell >
                    <div className={styles.cellWrapper}>
                    <img src={Case?.user?.image ?`http://domaiiiinonline.onlinewebshop.net/images/Users/${Case?.user?.image}` : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'} alt={Case.product?.name} className={styles.image}/>
                        {Case?.user.name}
                    </div>
                    </TableCell>
                    <TableCell >{Case?.user?.email}</TableCell>
                    <TableCell >{Case?.userInfo?.phone? '0' + Case?.userInfo?.phone : 'None'}</TableCell>
                    <TableCell >{Case?.userInfo?.national_id? Case?.userInfo?.national_id : 'None' }</TableCell>
                    <TableCell >{ Case?.created_at}</TableCell>

                    
                    
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
        )}
        </>
  )
}
