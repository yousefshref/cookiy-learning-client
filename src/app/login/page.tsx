'use client'
import { AuthContextProvider } from '@/context/AuthContext'
import React, { useContext } from 'react'

const page = () => {
    const authContext = useContext(AuthContextProvider)
    
  return (
    <div className='text-center p-3'>
        <div>
            <h1 className='text-3xl'>سجل الدخول في منصة كوكي</h1>
        </div>
        <form className='mx-auto flex flex-col gap-5 w-[90%] md:w-[50%] p-4 rounded-lg bg-neutral-100 mt-5 shadow-md'>
            <div className='flex flex-col gap-2 text-end'>
                <label>البريد الالكتروني</label>
                <input onChange={(e) => authContext?.setEmail(e?.target?.value)} type='email' />
                {
                    authContext?.error.email ? <small className='error-message'>{authContext?.error?.email}</small> : null
                }
            </div>
            <div className='flex flex-col gap-2 text-end'>
                <label>كلمة المرور</label>
                <input onChange={(e) => authContext?.setPassword(e?.target?.value)} type='password' />
            </div>
                {
                    authContext?.error.password ? <small className='error-message'>{authContext?.error.password}</small> : null
                }
            <div className='flex flex-col gap-2 text-end w-fit ms-auto'>
                <button onClick={(e) => authContext?.login(e)}>
                    سجل الدخول
                </button>
            </div>
                {
                    authContext?.error.error ? <small className='error-message'>{authContext?.error.error}</small> : null
                }
        </form>
    </div>
  )
}

export default page