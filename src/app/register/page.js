'use client'
import { AuthContextProvider } from '@/context/AuthContext'
import Link from 'next/link'
import React, { useContext } from 'react'

const page = () => {
    const authContext = useContext(AuthContextProvider)

    return (
        <div className='text-center p-3 bg-[url(/register_bg.png)] bg-no-repeat bg-cover h-[100vh] flex flex-col justify-center'>
            <div className='flex flex-row justify-around p-1 rounded-2xl flex-wrap'>
                <div className='text-start'>
                    <h1 className='text-3xl'>سجل حساب مجاني في منصة كوكي</h1>
                    <p>واستمتع بأفضل تجربة تعلم في حياتك</p>
                    <div className='flex flex-col gap-1'>
                        <small>[معلمين جدد احترافيين - كورسات قويه وجذرية في التعلم - اختبارات تحديد مستوي وبثوث مباشرة]</small>
                    </div>
                </div>
                <form className='flex flex-col gap-5 w-[100%] lg:w-[50%] p-4 rounded-lg bg-white shadow-md'>
                    <div className='flex flex-col gap-2 text-start'>
                        <label>الاسم</label>
                        <input onChange={(e) => authContext?.setUsername(e?.target?.value)} type='text' />
                        {
                            authContext?.error.username ? <small className='error-message'>{authContext?.error?.username}</small> : null
                        }
                    </div>
                    <div className='flex flex-col gap-2 text-start'>
                        <label>البريد الالكتروني</label>
                        <input onChange={(e) => authContext?.setEmail(e?.target?.value)} type='email' />
                        {
                            authContext?.error.email ? <small className='error-message'>{authContext?.error?.email}</small> : null
                        }
                    </div>
                    <div className='flex flex-col gap-2 text-start'>
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
                    <div className='flex flex-col gap-2 text-start'>
                        <label>كلمة المرور</label>
                        <input onChange={(e) => authContext?.setPassword(e?.target?.value)} type='password' />
                    </div>
                    {
                        authContext?.error.password ? <small className='error-message'>{authContext?.error.password}</small> : null
                    }
                    <div className='w-fit'>
                        <p className='text-sm'>هل لديك حساب بالفعل ؟ <Link className='text-blue-700' href={'/login'}>قم بتسجيل الدخول</Link></p>
                    </div>
                    <div className='flex flex-col gap-2 text-start w-fit bg-sky-200'>
                        <button className='bg-sky-200 p-1 hover:px-2' onClick={(e) => authContext?.register(e)}>
                            انشئ الحساب
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default page