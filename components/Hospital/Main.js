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
import Reservations from './Reservations';
import EmergencyCases from './Cases';
import ClincalReservations from './ClincalReservations';
export default function Main({token,reservs , cases , setReservs}) {
  const clincalsReserves = reservs?.filter(reserve => reserve?.clincal !== null)
  const roomsReserves = reservs?.filter(reserve => reserve?.room !== null)
  return (
    <div className={styles.container}>
      <div>
        <p>Emergency Cases</p>
        <EmergencyCases cases={cases?.slice(0,3)} />
      </div>
      <div style={{marginTop:'40px'}}>
      <p>Clincals Reservations</p>
        <ClincalReservations token={token} reservs={clincalsReserves?.filter(reserve => reserve?.name == null)?.slice(0,5)}  setReservs={setReservs} />
      </div>

      <div style={{marginTop:'40px'}}>
      <p>Rooms Reservations</p>
        <Reservations token={token} reservs={roomsReserves?.filter(reserve => reserve?.name == null)?.slice(0,5)}  setReservs={setReservs} />
      </div>
    </div>
  )
}

