import useSWR from 'swr'
import axioss from '../lib/axios'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie';

export const useAuth = ({middleware , redirectIfAuthenticated}) => {
    const router = useRouter()
    const token = Cookies.get('authToken');

    const { data: user, error, mutate } = useSWR('/api/patient', () =>
        axioss.get('/api/patient').then(res => res.data))
    

  
    const csrf = () => axioss.get('/sanctum/csrf-cookie')

    const register = async ({setData  , ...props }) => {
        await csrf()
        setData([])

        axioss
            .post('api/user/register', props)
            .then( res => {
                setData( res?.data)   
                
            })
            
        /*
        let user = await fetch("domaiiiinonline.onlinewebshop.net/api/user/register",{
            method:"POST",
            'headers': {'X-Requested-With': 'XMLHttpRequest' ,"content-type": 'multipart/form-data'  },
            body:JSON.stringify(props)
        })
        
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
            user = await user.json();
            console.log('user' , user)
            */
    }
    
    const login = async ({ setData,  ...props }) => {
        setData([])

        await axioss
            .post('/user/login', props)

            .then(res => {
                setData( res?.data?.original) 
                //mutate(res?.data?.original?.user)
                /*Cookies.set('authToken', res?.data?.original?.user?.api_token, {
                    expires: 1, // 7 days
                    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
                    sameSite: 'strict',
                })*/
            })
    }

    const forgetPassword = async ({ setStatus, setErrors, ...props }) => {
        await csrf()

        setErrors([])

        axioss
            .post('/user/forgot-password', props)
            .then(res =>  setStatus(res?.data))
            .catch(error => {
                if (error?.response?.status !== 422) throw error
                setErrors(error?.response?.data?.errors)
            })
    }

    const resetPassword = async ({ setErrors, ...props }) => {
        await csrf()

        setErrors([])

        axioss
            .post('/user/reset-password', props)
            .then(res => {
                setData( res?.data?.original) 
                })
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const createEmergencyCase = async ({ setData}) => {
        await csrf()

        setData([])

        axioss
            .post('/user/createEmergencyCase')
            .then(res => {
                setData( res?.data?.original) 
                })
            .catch(error => {
                if (error.response.status !== 422) throw error
                return "Something went wrong"
            })
    }

    const enterPatientHistory = async ({ setData, ...props }) => {
        await csrf()

        setData([])

        axioss
            .post('/user/enterPatientHistory', props )
            .then(res => {
                setData( res?.data) 
                })
            .catch(error => {
                if (error.response.status !== 422) throw error
                return "Something went wrong"
            })
    }

    const updatePatientHistory = async ({ setData , ...props}) => {
        await csrf()
        setData([])

        await axioss
            .post('/user/updatePatientHistory' , props)
            .then(res => {
                setData( res?.data) 
                })
    }

    const reserve = async ({ setData , ...props}) => {
        await csrf()

        setData([])

        await axioss
            .post('/user/reserve' , props)
            .then(res => {
                setData( res?.data) 
                })
        
    }

    const clincalReserve = async ({ setData , ...props}) => {
        await csrf()

        setData([])

        await axioss
            .post('/user/clincalReserve' , props)
            .then(res => {
                setData( res?.data) 
                })
        
    }

    const getHospitals = async ({ setHospitals}) => {
        await csrf()
        setHospitals([])

        axioss
            .get('/user/hospitals')
            .then(res => {
                setHospitals( res?.data) 
                })
    }

    const getClincals = async ({ setClincals}) => {
        await csrf()
        setClincals([])

        axioss
            .get('/user/clincals',)
            .then(res => {
                setClincals( res?.data) 
                })
    }

    const UserData = async ({ setData}) => {
        await csrf()
        setData([])

        axioss
            .get('/user/patientHistory')
            .then(res => {
                setData( res?.data) 
                })
    }

    const bookings = async ({ setReservs}) => {
        await csrf()
        setReservs([])

        axioss
            .get('/user/reservations')
            .then(res => {
                setReservs( res?.data) 
                })
    }

    const searchByName = async ({ setData, ...props }) => {
        await csrf()

        setData([])

        axioss
            .post('/user/searchByName', props  )
            .then(res => {
                setData( res?.data) 
                })
            .catch(error => {
                if (error?.response?.status !== 422) throw error
                return "Something went wrong"
            })
    }

    const searchByAddress = async ({ setData, ...props }) => {
        await csrf()

        setData([])

        axioss
            .post('/user/searchByAddress', props  )
            .then(res => {
                setData( res?.data) 
                })
            .catch(error => {
                if (error?.response?.status !== 422) throw error
                return "Something went wrong"
            })
    }

    const cancelReservation = async ({  id }) => {
        await csrf()
        axioss
            .get(`/user/cancelReservation/${id}` )
            .then(mutate)
            .then(res => res?.data?.original 
                )
    }

    const changePassword = async ({ setData, ...props }) => {
        await csrf()

        setData([])

        axioss
            .post('/user/changePassword', props  )
            .then(res => {
                setData( res?.data) 
                })
            .catch(error => {
                if (error.response.status !== 422) throw error
                return "Something went wrong"
            })
    }


    const logout = async () => {
            await axioss
                .post('/user/logout',{
                    headers :{
                        "auth-token" : token
                    }
                })
                .then(() => mutate());
                
            router.push( '/auth/login');
    }

    useEffect(() => {
        if (middleware === 'guest' && redirectIfAuthenticated && user) router.push(redirectIfAuthenticated)
    
    }, [ error , user ])

    return {
        register,
        login,
        forgetPassword,
        resetPassword,
        reserve,
        clincalReserve,
        getClincals,
        cancelReservation,
        bookings,
        getHospitals,
        UserData,
        searchByAddress,
        searchByName,
        createEmergencyCase,
        enterPatientHistory,
        updatePatientHistory,
        changePassword,
        logout,
        user,
        token
    }
}