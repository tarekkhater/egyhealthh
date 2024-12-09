import {  useState , useEffect } from 'react';
import styles from '../../styles/Hospital/Sidebar.module.css'
import { useRouter } from 'next/router';
function Sidebar() {
    const router = useRouter();
    const [profile , setProfile] = useState();
  
    return (
        <div className={styles.container}>
        <div className="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
            <a href="/hospital"> <p className="nav-link  " id={styles.home}> Home</p></a>
            <a href="/hospital/reservations"> <p className="nav-link" id="v-pills-profile-tab"> Reservations</p></a>
            <a href="/hospital/emergency_cases"> <p className="nav-link" id="v-pills-profile-tab"> Cases </p></a>
            <a href="/hospital/doctors"> <p className="nav-link" id="v-pills-messages-tab"> Doctors</p></a>
            <a href="/hospital/rooms"> <p className="nav-link" id="v-pills-profile-tab"> Rooms</p></a>
            <a href="/hospital/clincals"> <p className="nav-link" id="v-pills-profile-tab"> Clincals</p></a>
            <a> <p className="nav-link" id="v-pills-profile-tab"> Profile</p></a>
            <a href="#"> <p className="nav-link" id="v-pills-settings-tab"  type=" button"  > Settings </p></a>
            
        </div>
        </div>
    )
}
export default Sidebar;
