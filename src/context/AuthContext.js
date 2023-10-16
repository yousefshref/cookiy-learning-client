'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import {server} from '../../server'
import { UtlitsContextProvider } from './UtlitsContext'

const AuthContext = ({children}) => {

  const utlitsContext = useContext(UtlitsContextProvider)


  const [error, setError] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [type, setType] = useState('')
  const [password, setPassword] = useState('')


  const register = async(e) => {
    utlitsContext?.setloading(true)
    e.preventDefault()
    await axios.post(`${server}register/`,{
      username:username,
      email:email,
      is_teacher:type,
      password:password,
    })
    .then((e) => {
      utlitsContext?.setloading(false)
      if(e.data.success){
        document.cookie = `email=${email}`
        window.location.pathname = '/profile'
      }
      else{
        setError(e.data)
      }
    })
  }

  const login = async(e) => {
    utlitsContext?.setloading(true)
    e.preventDefault()
    await axios.post(`${server}login/`,{
      email:email,
      password:password,
    })
    .then((e) => {
      utlitsContext?.setloading(false)
      if(e.data.success){
        document.cookie = `email=${email}`
        window.location.pathname = '/profile'
      }
      else{
        setError(e.data)
      }
    })
  }



  const [user,setUser] = useState([])

  const getUserProfile = async() => {
    await axios.get(`${server}get_user_profile/?email=${document.cookie.split('email=')[1]}`)
    .then((e) => setUser(e.data))
  }

  useEffect(() => {
    document.cookie.split('email=')[1] ? getUserProfile() : null
  }, [])




  const [bio, setbio] = useState('')
  const [image, setimage] = useState(null)

  const [specialty, setspecialty] = useState('')
  const [subscribation_cost, setsubscribation_cost] = useState('')

  const editProfile = async () => {
    utlitsContext?.setloading(true)

    const formData = new FormData()
    formData.append('email', document.cookie.split('email=')[1])
    formData.append('image', image)
    formData.append('bio', bio)

    formData.append('specialty', specialty)
    formData.append('subscribation_cost', subscribation_cost)


    console.log(specialty);


    await axios.post(`${server}edit_profile/`, formData, {
      method:"POST",
      headers:{
        "Content-Type":"multipart/form-data"
      }
    })

    .then((e) => {
      utlitsContext?.setloading(false)
      if(e.data.success){
        window.location.reload()
      }else{
        setError(e.data)
      }
    })

  }




  return (
    <AuthContextProvider.Provider value={{
      setspecialty,
      setsubscribation_cost,
      register,
      login,
      setUsername,
      setEmail,
      setType, 
      setPassword,
      error,

      user,

      setbio,
      setimage,
      editProfile
    }}>
        {children}
    </AuthContextProvider.Provider>
  )
}

export default AuthContext
export const AuthContextProvider = createContext()