import useSWR from 'swr'
import axioss from '../lib/axios'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import localStorage from 'redux-persist/lib/storage'

export const useAuth = ({middleware , redirectIfAuthenticated}) => {
    const router = useRouter()
    const user = async ({token,setUserData}) => {

        setUserData([])

        await axioss
            .get('/patient',{
                headers:{
                    'auth-token' : token
                }
            })
            .then(res => {
                setUserData( res?.data) 
                console.log('tokeeen' , token)
                })
        
    }
   // const csrf = () => axioss.get('/sanctum/csrf-cookie')

    const register = async ({setData  , ...props }) => {
        //await csrf()
        setData([])

        axioss
            .post('user/register', props)
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
                localStorage.setItem('authToken', res?.data?.original?.user?.api_token)
                  /*  expires: 1, // 7 days
                    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
                    sameSite: 'strict',*/
                
            })
    }

    const forgetPassword = async ({ setStatus, setErrors, ...props }) => {
        //await csrf()

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
        //await csrf()

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

    const createEmergencyCase = async ({token, setData}) => {
        //await csrf()

        setData([])

        axioss
            .post('/user/createEmergencyCase',{
                headers:{
                    'auth-token' : token
                }
            })
            .then(res => {
                setData( res?.data?.original) 
                })
            .catch(error => {
                if (error.response.status !== 422) throw error
                return "Something went wrong"
            })
    }

    const enterPatientHistory = async ({token, setData, ...props }) => {
        //await csrf()

        setData([])

        axioss
            .post('/user/enterPatientHistory', props,{
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

    const updatePatientHistory = async ({token, setData , ...props}) => {
        //await csrf()
        setData([])

        await axioss
            .post('/user/updatePatientHistory' , props,{
                headers:{
                    'auth-token' : token
                }
            })
            .then(res => {
                setData( res?.data) 
                })
    }

    const reserve = async ({token, setData , ...props}) => {
        //await csrf()

        setData([])

        await axioss
            .post('/user/reserve' , props,{
                headers:{
                    'auth-token' : token
                }
            })
            .then(res => {
                setData( res?.data) 
                })
        
    }

    const clincalReserve = async ({token, setData , ...props}) => {
        //await csrf()

        setData([])

        await axioss
            .post('/user/clincalReserve', props,{
                headers:{
                    'auth-token' : token
                }
            } )
            .then(res => {
                setData( res?.data) 
                })
        
    }

    const getHospitals = async ({token, setHospitals}) => {
        //await csrf()
        setHospitals([])

        axioss
            .get('/user/hospitals',{
                headers:{
                    'auth-token' : token
                }
            })
            .then(res => {
                setHospitals( res?.data) 
                })
    }

    const getClincals = async ({token, setClincals}) => {
        //await csrf()
        setClincals([])

        axioss
            .get('/user/clincals',{
                headers:{
                    'auth-token' : token
                }
            })
            .then(res => {
                setClincals( res?.data) 
                })
    }

    const UserData = async ({token, setData}) => {
        //await csrf()
        setData([])

        axioss
            .get('/user/patientHistory',{
                headers:{
                    'auth-token' : token
                }
            })
            .then(res => {
                setData( res?.data) 
                })
    }

    const bookings = async ({token, setReservs}) => {
        //await csrf()
        setReservs([])

        axioss
            .get('/user/reservations',{
                headers:{
                    'auth-token' : token
                }
            })
            .then(res => {
                setReservs( res?.data) 
                })
    }

    const searchByName = async ({token, setData, ...props }) => {
        //await csrf()

        setData([])

        axioss
            .post('/user/searchByName', props ,{
                headers:{
                    'auth-token' : token
                }
            } )
            .then(res => {
                setData( res?.data) 
                console.log('tok' , token)
                })
            .catch(error => {
                if (error?.response?.status !== 422) throw error
                return "Something went wrong"
            })
    }

    const searchByAddress = async ({token, setData, ...props }) => {
        //await csrf()

        setData([])

        axioss
            .post('/user/searchByAddress', props ,{
                headers:{
                    'auth-token' : token
                }
            } )
            .then(res => {
                setData( res?.data) 
                })
            .catch(error => {
                if (error?.response?.status !== 422) throw error
                return "Something went wrong"
            })
    }

    const cancelReservation = async ({ token, id }) => {
        //await csrf()
        axioss
            .get(`/user/cancelReservation/${id}`,{
                headers:{
                    'auth-token' : token
                }
            } )
            .then(mutate)
            .then(res => res?.data?.original 
                )
    }

    const changePassword = async ({ token,setData, ...props }) => {
        //await csrf()

        setData([])

        axioss
            .post('/user/changePassword', props ,{
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


    const logout = async ({token}) => {
            await axioss
                .post('/user/logout',{
                    headers :{
                        "auth-token" : token
                    }
                })
                .then(() => {
                    localStorage.setItem('authToken', " ")
                })
                
            router.push( '/auth/login');
    }

    useEffect(() => {
    //    if (middleware === 'guest' && redirectIfAuthenticated && user) router.push(redirectIfAuthenticated)
    
    }, [  user ])

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
        
    }
}