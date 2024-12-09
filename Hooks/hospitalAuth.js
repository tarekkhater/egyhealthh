import useSWR from 'swr'
import axioss from '../lib/axios'
import { useRouter } from 'next/router'
import { createContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie';





export const useAuth = ({middleware , redirectIfAuthenticated}) => {
    const token = Cookies.get('authToken');
    const router = useRouter()
    const { data: user, error, mutate } = useSWR('/api/hospital', () =>
        axioss.get('/api/hospital').then(res => res.data))
    const csrf = () => axioss.get('/sanctum/csrf-cookie')
    
    const login = async ({ setData,  ...props }) => {
        await csrf()
        
        setData([])
        await axioss
            .post('/hospital/login', props)
            .then(res => {
                setData( res?.data?.original) ;
                Cookies.set('authToken', res?.data?.original?.hospital?.api_token, {
                    expires: 1, // 7 days
                    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
                    sameSite: 'strict',
                })
        
                })
            
    }

    const create = async ({ setData, ...props }) => {
        await csrf()

        setData([])

        axioss.post('/hospital/createDoctor' , props)
            .then(res => {
                setData( res?.data) 
                })
            
            .catch(error => {
                if (error.response.status !== 422) throw error

                return "Something went wrong"
            })
    }

    const doctors = async ({ setData}) => {
        await csrf()

        setData([])

        axioss
            .get('/hospital/getDoctors')
            .then(res => {
                setData( res?.data) 
                })
            .catch(error => {
                if (error.response.status !== 422) throw error
                return "Something went wrong"
            })
    }

    const search = async ({ setResult, ...props }) => {
        await csrf()

        setResult([])

        axioss
            .post('/hospital/search', props )
            .then(res => {
                setResult( res?.data) 
                })
            .catch(error => {
                if (error.response.status !== 422) throw error
                return "Something went wrong"
            })
    }

    const reservations = async ({ setReservs}) => {
        await csrf()
        setReservs([])

        await axioss
            .get('/hospital/getReservations')
            .then(res => {
                setReservs( res?.data) 
                })
          
    }

    const emergencyCases = async ({ setCases}) => {
        await csrf()

        setCases([])

        await axioss
            .get('/hospital/getEmergencyCases')
            .then(res => {
                setCases( res?.data) 
                })
        
    }

    const rooms = async ({ setRooms}) => {
        await csrf()
        setRooms([])

        await axioss
            .get('/hospital/getRooms')
            .then(res => {
                setRooms( res?.data) 
                })
    }

    const addRoom = async ({ setData, ...props }) => {
        await csrf()

        setData([])

        axioss
            .post('/hospital/addRoom', props  )
            .then(res => {
                setData( res?.data) 
                })
            .catch(error => {
                if (error.response.status !== 422) throw error
                return "Something went wrong"
            })
    }

    const clincals = async ({ setClincals}) => {
        await csrf()
        setClincals([])

        await axioss
            .get('/hospital/getClincals')
            .then(res => {
                setClincals( res?.data) 
                })
    }

    const addClincal = async ({ setData, ...props }) => {
        await csrf()

        setData([])

        axioss
            .post('/hospital/addClincal', props  )
            .then(res => {
                setData( res?.data) 
                })
            .catch(error => {
                if (error.response.status !== 422) throw error
                return "Something went wrong"
            })
    }

    const reserve = async ({ setData, ...props }) => {
        await csrf()

        setData([])

        axioss
            .post('/hospital/reserve', props  )
            .then(res => {
                setData( res?.data) 
                })
            .catch(error => {
                if (error.response.status !== 422) throw error
                return "Something went wrong"
            })
    }

    const clincalReserve = async ({ setData, ...props }) => {
        await csrf()

        setData([])

        axioss
            .post('/hospital/clincalReserve', props  )
            .then(res => {
                setData( res?.data) 
                })
            .catch(error => {
                if (error.response.status !== 422) throw error
                return "Something went wrong"
            })
    }

    const deleteClincal = async ({  id , setData }) => {
        await csrf()
        setData([])

        axioss
            .get(`/hospital/deleteClincal/${id}` )
            .then(res => setData(res?.data)
                )
    }

    const deleteRoom = async ({  id , setData }) => {
        await csrf()
        setData([])

        axioss
            .get(`/hospital/deleteRoom/${id}` )
            .then(res => setData(res?.data)
                )
    }

    const deleteDoctor = async ({  id , setData }) => {
        await csrf()
        setData([])

        axioss
            .get(`/hospital/deleteDoctor/${id}` )
            .then(res => setData(res?.data)
                )
    }

    const acceptReservations = async ({  id }) => {
        await csrf()


        axioss
            .get(`/hospital/acceptReservation/${id}` )
            .then(mutate)
            .then(res => res?.data?.original 
                )
    }

    const rejectReservations = async ({ id }) => {
        await csrf()


        axioss
            .get(`/hospital/rejectReservation/${id}`)
            .then(mutate)
            .then(res => res?.data?.original)
    }

    const finishReservations = async ({ id }) => {
        await csrf()

        axioss
            .get(`/hospital/finishReservation/${id}` )
            .then(mutate)
            .then(res =>  res?.data?.original) 
    }

    const logout = async () => {
        if (! error) {
            await axioss
                .post('/hospital/logout')
                .then(() => mutate())
        }
        router.push('/auth/login')
    }

    useEffect(() => {
        if (middleware === 'guest' && redirectIfAuthenticated && user) router.push(redirectIfAuthenticated)
    }, [ error , user ])

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