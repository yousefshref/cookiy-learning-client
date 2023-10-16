'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import {server} from '../../server'
import { UtlitsContextProvider } from './UtlitsContext'
import { AuthContextProvider } from './AuthContext'

const EnrollmentContext = ({children}) => {

  const authContext = useContext(AuthContextProvider)
  const utlitsContext = useContext(UtlitsContextProvider)

  const [enrollments, setEnrollments] = useState([])
  const getEnrollments = async() => {
    utlitsContext?.setloading(true)
    await axios.get(`${server}get_enrollments/?student=${authContext?.user?.user_details?.id}`)
    .then((e) => {
      utlitsContext?.setloading(false)
      setEnrollments(e.data)
    })
  }
  useEffect(() => {
    authContext?.user?.user_details?.id ? getEnrollments() : null
  }, [authContext?.user?.length])


  return (
    <EnrollmentContextProvider.Provider value={{
      enrollments
    }}>
        {children}
    </EnrollmentContextProvider.Provider>
  )
}

export default EnrollmentContext
export const EnrollmentContextProvider = createContext()