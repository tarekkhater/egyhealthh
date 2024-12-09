import { useState } from 'react'
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  const [name , setName] = useState('default')
  return (
      
      <Component {...pageProps} />
  
  )
}
