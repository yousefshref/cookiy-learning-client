'use client'
import { AuthContextProvider } from '@/context/AuthContext'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext } from 'react'

const page = () => {
    const authContext = useContext(AuthContextProvider)

    return (
        <div className='text-center bg-[url(/login_bg.png)] flex flex-col justify-center h-[100vh] bg-cover'>
            <div className='mb-10'>
                <h1>
                    سجل الدخول الي منصة كوكي
                </h1>
            </div>
            <div className='flex flex-row-reverse bg-sky-200 rounded-lg shadow-lg w-[100%] lg:w-[80%] mx-auto'>
                <div className='hidden md:block md:w-[40%] mx-auto w-fit'>
                    <Image alt='منصة كوكي ليرنينج' width={500} height={500} src={'/login_vector.png'} />
                </div>
                <form className='w-[100%] md:w-[60%] mx-auto flex flex-col gap-5 p-4 rounded-lg bg-neutral-100 shadow-md'>
                    <div className='flex flex-col gap-2 text-start'>
                        <label>البريد الالكتروني</label>
                        <input onChange={(e) => authContext?.setEmail(e?.target?.value)} type='email' />
                        {
                            authContext?.error.email ? <small className='error-message'>{authContext?.error?.email}</small> : null
                        }
                    </div>
                    <div className='flex flex-col gap-2 text-start'>
                        <label>كلمة المرور</label>
                        <input onChange={(e) => authContext?.setPassword(e?.target?.value)} type='password' />
                    </div>
                    {
                        authContext?.error.password ? <small className='error-message'>{authContext?.error.password}</small> : null
                    }
                    <div className='w-fit'>
                        <p className='text-sm'>هل انت مستخدم جديد ؟ <Link className='text-blue-700' href={'/register'}>سجل حساب جديد</Link></p>
                    </div>
                    <div className='flex flex-col gap-2 text-start w-fit'>
                        <button onClick={(e) => authContext?.login(e)} className='px-2 bg-sky-300'>
                            سجل الدخول
                        </button>
                    </div>
                    {
                        authContext?.error.error ? <small className='error-message'>{authContext?.error.error}</small> : null
                    }
                </form>
            </div>
            {/* <div>
            <h1 className='text-3xl'>سجل الدخول في منصة كوكي</h1>
        </div>
        <form className='mx-auto flex flex-col gap-5 w-[90%] md:w-[50%] p-4 rounded-lg bg-neutral-100 mt-5 shadow-md'>
            <div className='flex flex-col gap-2 text-start'>
                <label>البريد الالكتروني</label>
                <input onChange={(e) => authContext?.setEmail(e?.target?.value)} type='email' />
                {
                    authContext?.error.email ? <small className='error-message'>{authContext?.error?.email}</small> : null
                }
            </div>
            <div className='flex flex-col gap-2 text-start'>
                <label>كلمة المرور</label>
                <input onChange={(e) => authContext?.setPassword(e?.target?.value)} type='password' />
            </div>
                {
                    authContext?.error.password ? <small className='error-message'>{authContext?.error.password}</small> : null
                }
            <div className='flex flex-col gap-2 text-start w-fit ms-auto'>
                <button onClick={(e) => authContext?.login(e)}>
                    سجل الدخول
                </button>
            </div>
                {
                    authContext?.error.error ? <small className='error-message'>{authContext?.error.error}</small> : null
                }
        </form> */}
        </div>
    )
}

export default page