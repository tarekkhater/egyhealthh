import GoogleMapReact  from 'google-map-react';
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from '@react-google-maps/api'
import styles from '../styles/Home.module.css'
import Layout from '@/components/Layouts/Layout '
import { useEffect, useRef, useState } from 'react';
import { useAuth } from '@/Hooks/auth ';
import { Button } from '@/components/Tools/Tools ';
import Loading from '../components/Loading'
import { useRouter } from 'next/router';
import localStorage from 'redux-persist/lib/storage'

export default function Home() {
  const {user ,getHospitals } = useAuth({ 'middleware':'guest'})
  const router = useRouter()
  const [hospitals , setHospitals] = useState()
  const [userData , setUserData] = useState()
  const [tokens , setTokens] = useState()

  useEffect(() => {
    const getToken = localStorage.getItem(('authToken')).then((token) =>{
      user({token,setUserData})
      getHospitals({token,setHospitals})
      setTokens(token)
    })
  }, []);

  useEffect(() => {
    if(hospitals?.status == false){
      router.push('/auth/login')
    }
  }, [hospitals]);
  if(!userData?.email){
    return <Loading />
  }
  return (
    <Layout className='coverContainer' user={user} token={tokens} container={
      <div className={styles.div1}>
        <h3>Welcome <span style={{color:'darkblue'}}>{userData?.name}</span></h3>
        <div>
        <p>Let's Find Your Hospital </p>
          <a href="/nearest-hospitals">
            <Button>Go</Button>
          </a>
        </div>
        
        
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