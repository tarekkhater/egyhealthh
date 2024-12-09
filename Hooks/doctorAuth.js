import useSWR from 'swr'
import axioss from '../lib/axios'
import { useRouter } from 'next/router'
import { createContext, useEffect, useState } from 'react'





export const useAuth = ({middleware , redirectIfAuthenticated}) => {
    const router = useRouter()
    const { data: user, error, mutate } = useSWR('/api/doctor', () =>
        axioss.get('/api/doctor').then(res => res.data))
    const csrf = () => axioss.get('/sanctum/csrf-cookie')
    
    const login = async ({ setData,  ...props }) => {
        await csrf()
        
        setData([])
        await axioss
            .post('/doctor/login', props)
            .then(res => {
                setData( res?.data?.original) ;
        
                })
            
    }


    const prescription = async ({ setData, ...props }) => {
        await csrf()

        setData([])

        axioss
            .post('/doctor/makePrescription', props )
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
            .get('/doctor/getReservations')
            .then(res => {
                setReservs( res?.data) 
                })
    }


    const logout = async () => {
        if (! error) {
            await axioss
                .post('/doctor/logout')
                .then(() =>mutate())
        }
        window.location.pathname = '/auth/login'
        
    }

    useEffect(() => {
        if (middleware === 'guest' && redirectIfAuthenticated && user) router.push(redirectIfAuthenticated)
    }, [ error , user ])

    return {
        login,
        search,
        prescription,
        reservations,
        logout,
        user
    }
}