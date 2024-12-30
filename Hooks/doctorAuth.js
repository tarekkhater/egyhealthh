import useSWR from 'swr'
import axioss from '../lib/axios'
import { useRouter } from 'next/router'
import { createContext, useEffect, useState } from 'react'
import localStorage from 'redux-persist/lib/storage'

export const useAuth = ({middleware , redirectIfAuthenticated}) => {
    const router = useRouter()
    /*
    const { data: user, error, mutate } = useSWR('/api/doctor', () =>
        axioss.get('/api/doctor').then(res => res.data))
    const csrf = () => axioss.get('/sanctum/csrf-cookie')
    */
    const user = async ({token,setUserData}) => {

        setUserData([])

        await axioss
            .get('/doctor',{
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
            .post('/doctor/login', props)
            .then(res => {
                setData( res?.data?.original) ;
                localStorage.setItem('doctorAuthToken', res?.data?.original?.user?.api_token)
                })
            
    }


    const prescription = async ({ token , setData, ...props  }) => {
        //await csrf()

        setData([])

        axioss
            .post('/doctor/makePrescription', props ,{
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

    const search = async ({ token , setResult, ...props }) => {
        //await csrf()

        setResult([])

        axioss
            .post('/hospital/search', props ,{
                headers:{
                    'auth-token' : token
                }
            })
            .then(res => {
                setResult( res?.data) 
                })
            .catch(error => {
                if (error.response.status !== 422) throw error
                return "Something went wrong"
            })
    }

    const reservations = async ({ token , setReservs}) => {
        //await csrf()
        setReservs([])

        await axioss
            .get('/doctor/getReservations',{
                headers:{
                    'auth-token' : token
                }
            })
            .then(res => {
                setReservs( res?.data) 
                })
    }


    const logout = async ({token}) => {
            await axioss
                .post('/doctor/logout',{
                    headers:{
                        'auth-token' : token
                    }
                })
                .then(() => localStorage.setItem('doctorAuthToken', " "))
        window.location.pathname = '/auth/login'
        
    }

    useEffect(() => {
    //  if (middleware === 'guest' && redirectIfAuthenticated && user) router.push(redirectIfAuthenticated)
    }, [ user ])

    return {
        login,
        search,
        prescription,
        reservations,
        logout,
        user
    }
}