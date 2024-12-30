import useSWR from 'swr'
import axioss from '../lib/axios'
import { useRouter } from 'next/router'
import { createContext, useEffect, useState } from 'react'
import localStorage from 'redux-persist/lib/storage'

export const useAuth = ({middleware , redirectIfAuthenticated}) => {
    const router = useRouter()
    /*
    const { data: user, error, mutate } = useSWR('/api/hospital', () =>
        axioss.get('/api/hospital').then(res => res.data))
    const csrf = () => axioss.get('/sanctum/csrf-cookie')
    */
    const user = async ({token,setUserData}) => {

        setUserData([])

        await axioss
            .get('/hospital',{
                headers:{
                    'auth-token' : token
                }
            })
            .then(res => {
                setUserData( res?.data) 
            })
        
    }
    
    const login = async ({ setData,  ...props }) => {
        //await csrf()
        
        setData([])
        await axioss
            .post('/hospital/login', props)
            .then(res => {
                setData( res?.data?.original) ;
                localStorage.setItem('hospitalAuthToken', res?.data?.original?.hospital?.api_token)
                })
            
    }

    const create = async ({token , setData, ...props }) => {
        //await csrf()

        setData([])

        axioss.post('/hospital/createDoctor' , props,{
            headers:{
                'auth-token' : token
            }
        })
            .then(res => {
                setData( res?.data) 
                })
            
            .catch(error => {
                if (error.response.status !== 422) throw error

                return "Something went wrong"
            })
    }

    const doctors = async ({token , setData}) => {
        //await csrf()

        setData([])

        axioss
            .get('/hospital/getDoctors',{
                headers:{
                    'auth-token' : token
                }
            })
            .then(res => {
                setData( res?.data) 
                })
            .catch(error => {
                if (error.response.status !== 422) throw error
                return "Something went wrong"
            })
    }

    const search = async ({token, setResult, ...props }) => {
        //await csrf()

        setResult([])

        axioss
            .post('/hospital/search', props,{
                headers:{
                    'auth-token' : token
                }
            } )
            .then(res => {
                setResult( res?.data) 
                })
            .catch(error => {
                if (error.response.status !== 422) throw error
                return "Something went wrong"
            })
    }

    const reservations = async ({token , setReservs}) => {
        //await csrf()
        setReservs([])

        await axioss
            .get('/hospital/getReservations',{
                headers:{
                    'auth-token' : token
                }
            })
            .then(res => {
                setReservs( res?.data) 
                })
          
    }

    const emergencyCases = async ({token ,setCases}) => {
        //await csrf()

        setCases([])

        await axioss
            .get('/hospital/getEmergencyCases',{
                headers:{
                    'auth-token' : token
                }
            })
            .then(res => {
                setCases( res?.data) 
                })
        
    }

    const rooms = async ({token, setRooms}) => {
        //await csrf()
        setRooms([])

        await axioss
            .get('/hospital/getRooms',{
                headers:{
                    'auth-token' : token
                }
            })
            .then(res => {
                setRooms( res?.data) 
                })
    }

    const addRoom = async ({token, setData, ...props }) => {
        //await csrf()

        setData([])

        axioss
            .post('/hospital/addRoom', props ,{
                headers:{
                    'auth-token' : token
                }
            } )
            .then(res => {
                setData( res?.data) 
                })
            .catch(error => {
                if (error.response.status !== 422) throw error
                return "Something went wrong"
            })
    }

    const clincals = async ({token , setClincals}) => {
        //await csrf()
        setClincals([])

        await axioss
            .get('/hospital/getClincals',{
                headers:{
                    'auth-token' : token
                }
            })
            .then(res => {
                setClincals( res?.data) 
                })
    }

    const addClincal = async ({token , setData, ...props }) => {
        //await csrf()

        setData([])

        axioss
            .post('/hospital/addClincal', props ,{
                headers:{
                    'auth-token' : token
                }
            } )
            .then(res => {
                setData( res?.data) 
                })
            .catch(error => {
                if (error.response.status !== 422) throw error
                return "Something went wrong"
            })
    }

    const reserve = async ({token , setData, ...props }) => {
        //await csrf()

        setData([])

        axioss
            .post('/hospital/reserve', props ,{
                headers:{
                    'auth-token' : token
                }
            } )
            .then(res => {
                setData( res?.data) 
                })
            .catch(error => {
                if (error.response.status !== 422) throw error
                return "Something went wrong"
            })
    }

    const clincalReserve = async ({token , setData, ...props }) => {
        //await csrf()

        setData([])

        axioss
            .post('/hospital/clincalReserve', props ,{
                headers:{
                    'auth-token' : token
                }
            } )
            .then(res => {
                setData( res?.data) 
                })
            .catch(error => {
                if (error.response.status !== 422) throw error
                return "Something went wrong"
            })
    }

    const deleteClincal = async ({token ,  id , setData }) => {
        //await csrf()
        setData([])

        axioss
            .get(`/hospital/deleteClincal/${id}`,{
                headers:{
                    'auth-token' : token
                }
            } )
            .then(res => setData(res?.data)
                )
    }

    const deleteRoom = async ({ token , id , setData }) => {
        //await csrf()
        setData([])

        axioss
            .get(`/hospital/deleteRoom/${id}`,{
                headers:{
                    'auth-token' : token
                }
            } )
            .then(res => setData(res?.data)
                )
    }

    const deleteDoctor = async ({token ,  id , setData }) => {
        //await csrf()
        setData([])

        axioss
            .get(`/hospital/deleteDoctor/${id}`,{
                headers:{
                    'auth-token' : token
                }
            } )
            .then(res => setData(res?.data)
                )
    }

    const acceptReservations = async ({token ,  id }) => {
        //await csrf()


        axioss
            .get(`/hospital/acceptReservation/${id}`,{
                headers:{
                    'auth-token' : token
                }
            } )
            .then(mutate)
            .then(res => res?.data?.original 
                )
    }

    const rejectReservations = async ({token , id }) => {
        //await csrf()


        axioss
            .get(`/hospital/rejectReservation/${id}`,{
                headers:{
                    'auth-token' : token
                }
            })
            .then(mutate)
            .then(res => res?.data?.original)
    }

    const finishReservations = async ({token , id }) => {
        //await csrf()

        axioss
            .get(`/hospital/finishReservation/${id}`,{
                headers:{
                    'auth-token' : token
                }
            } )
            .then(mutate)
            .then(res =>  res?.data?.original) 
    }

    const logout = async ({token}) => {
        
            await axioss
                .post('/hospital/logout',{
                    headers:{
                        'auth-token' : token
                    }
                })
                .then(() => {
                    localStorage.setItem('hospitalAuthToken', " ")
                })
        router.push('/auth/login')
    }

    useEffect(() => {
      //  if (middleware === 'guest' && redirectIfAuthenticated && user) router.push(redirectIfAuthenticated)
    }, [ user ])

    return {
        login,
        create,
        doctors,
        search,
        emergencyCases,
        reservations,
        rooms,
        addRoom,
        clincals,
        addClincal,
        reserve,
        clincalReserve,
        deleteClincal,
        deleteDoctor,
        deleteRoom,
        acceptReservations,
        rejectReservations,
        finishReservations,
        logout,
        user
    }
}