import styles from '../styles/NearestHospitals.module.css'
import Layout from '@/components/Layouts/Layout '
import { useEffect, useRef, useState } from 'react';
import { useAuth } from '@/Hooks/auth ';
import { Input, Label } from '@/components/Tools/Tools ';
import Hospitals from '@/components/Patient/Hospitals ';
import Loading from '@/components/Loading ';
import { useRouter } from 'next/router';


export default function Home() {
    const {user , searchByAddress , getHospitals } = useAuth({'middleware':'auth'})
    const [value , setValue] = useState()
    const [show , setShow] = useState(false)
    const [changeSelect , setChangeSelect] = useState(false)
    const [hospitals , setHospitals] = useState()
    const [hospitalsOfCity , setHospitalsOfCity] = useState()
    const [data , setData] = useState()
    const router = useRouter()
    const searchRef = useRef()

    useEffect(() => {
      getHospitals({setHospitals})
  },[]);

  useEffect(() => {
    if(hospitals?.status == false){
      router.push('/auth/login')
    }
  }, [hospitals]);

    useEffect(() => {
        if(!value){
            setValue(null)
            setData(null)
        }
        searchByAddress({value , setData})
    }, [value]);

    useEffect(() => {
      setHospitalsOfCity(hospitals?.hospitals?.filter(hospital => hospital?.city?.includes(value)))
  }, [changeSelect]);

    useEffect(() => {
      let handler = (e)=>{
          if(!searchRef?.current?.contains(e.target)){
              setShow(false)
          }
      }

      window.addEventListener('mousedown',handler);
  });

  if(!user){
    return <Loading />
  }
  return (
    <Layout   container={
      <div className={styles.container}>
        <div className={styles.title}>
            <h2>Get hospitals in your city </h2>
        </div>
        <div className={styles.SearchDiv} >
            <Label>City</Label>
            <Input type='search' placeholder="Enter your city" value={value} onFocus={()=>setShow(true)}  onChange={(e)=>{setValue(e.target.value); setShow(true)}}/>
            {show && (
              <>
                {data?.cities?.length > 0 && (
                  <div className={styles.searchResults} ref={searchRef}>
                  {data?.cities?.map((city) =>(
                      <div  key={city?.city} className={styles.result}>
                          <option onClick={(e)=>{setValue(e.currentTarget.value); setShow(false); setChangeSelect(!changeSelect)}} >{city.city}</option>
                      </div>
                  ))} 
                  </div>
                  )}
                </>
            )}
        </div>
        {hospitalsOfCity?.length > 0 &&(
          <div className={styles.hospitals}>
            <Hospitals hospitals={hospitalsOfCity}/>
          </div>
        )}
        
        
      </div>
    }/>
  )

}



/*

const [map , setMap] = useState([])
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')
  const center = { lat: 30.6665678, lng: 31.6094545 }
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyAm8m3nh3ErwN3jaJPqmXHPNyliJtmAIkg',
    libraries: ['places'],
  })
  
  const originRef = useRef()
  // @type React.MutableRefObject<HTMLInputElement> 
  const destiantionRef = useRef()

  if (!isLoaded) {
    return 'loading'
  }

  async function calculateRoute() {
    if (originRef.current.value === '' || destiantionRef.current.value === '') {
      return
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    })
    setDirectionsResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)
  }

  function clearRoute() {
    setDirectionsResponse(null)
    setDistance('')
    setDuration('')
    originRef.current.value = ''
    destiantionRef.current.value = ''
  }

<div style={{ height: '100vh', width: '100%' }}>
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          options={{
            zoomControl: false,
            streetViewControl: true,
            mapTypeControl: true,
            fullscreenControl: false,
          }}
          onLoad={map => setMap(map)}
        >
          <Marker position={center} />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
        <div>
        <div flexGrow={1}>
            <Autocomplete>
              <input type='text' placeholder='Origin' ref={originRef} />
            </Autocomplete>
          </div>
          <div flexGrow={1}>
            <Autocomplete>
              <input
                type='text'
                placeholder='Destination'
                ref={destiantionRef}
              />
            </Autocomplete>
          </div>
        </div>
      </div>
*/