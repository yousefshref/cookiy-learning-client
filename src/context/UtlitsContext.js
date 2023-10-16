'use client'
import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import { server } from '../../server'

const UtlitsContext = ({children}) => {
    const [loading, setloading] = useState(false)

    const [specialties, setspecialties] = useState([])
    const getSpecialties = async() => {
      await axios.get(`${server}get_specialies/`)
      .then((e) => setspecialties(e.data))
    }
    useEffect(() => {
      getSpecialties()
    }, [])
  return (
    <UtlitsContextProvider.Provider value={{
        setloading,
        loading,

        specialties
    }}>
        {children}
    </UtlitsContextProvider.Provider>
  )
}

export default UtlitsContext
export const UtlitsContextProvider = createContext()