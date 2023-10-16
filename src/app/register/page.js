'use client'
import { AuthContextProvider } from '@/context/AuthContext'
import React, { useContext } from 'react'

const page = () => {
    const authContext = useContext(AuthContextProvider)
    
  return (
    <div className='text-center p-3'>
        <div>
            <h1 className='text-3xl'>سجل حساب مجاني في منصة كوكي</h1>
            <p>واستمتع بأفضل تجربة تعلم في حياتك</p>
        </div>
        <form className='mx-auto flex flex-col gap-5 w-[90%] md:w-[50%] p-4 rounded-lg bg-white mt-5 shadow-md'>
            <div className='flex flex-col gap-2 text-end'>
                <label>الاسم</label>
                <input onChange={(e) => authContext?.setUsername(e?.target?.value)} type='text' />
                {
                    authContext?.error.username ? <small className='error-message'>{authContext?.error?.username}</small> : null
                }
            </div>
            <div className='flex flex-col gap-2 text-end'>
                <label>البريد الالكتروني</label>
                <input onChange={(e) => authContext?.setEmail(e?.target?.value)} type='email' />
                {
                    authContext?.error.email ? <small className='error-message'>{authContext?.error?.email}</small> : null
                }
            </div>
            <div className='flex flex-col gap-2 text-end'>
                <label>اختر نوع حسابك</label>
                <select onChange={(e) => authContext?.setType(e?.target?.value)}>
                    <option value={''}>اختر</option>
                    <option value={'True'}>معلم</option>
                    <option value={'False'}>طالب</option>
                </select>
                {
                    authContext?.error.type ? <small className='error-message'>{authContext?.error.type}</small> : null
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
                <button onClick={(e) => authContext?.register(e)}>
                    انشئ الحساب
                </button>
            </div>
        </form>
    </div>
  )
}

export default page