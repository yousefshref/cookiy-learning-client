'use client'
import React, { useContext } from 'react'
import { server } from '../../server'
import Link from 'next/link'
import Image from 'next/image'
import { AuthContextProvider } from '@/context/AuthContext'
import Rating from '@mui/material/Rating'
import { CourseContextProvider } from '@/context/CourseContext'
import { usePathname } from 'next/navigation'

const CourseComponent = ({ e, setdelete_id, setdelete_open }) => {
    const authContext = useContext(AuthContextProvider)
    const courseContext = useContext(CourseContextProvider)

    const path = usePathname()
    return (
        authContext?.user?.user_details?.is_teacher ? (
            <div key={e?.id} className='course border p-2 px-4 rounded-md
                            flex flex-row justify-between
                         '>
                <div className='flex flex-row gap-2'>
                    <div className='my-auto'>
                        <Image alt='' className='max-w-[100px] max-h-[100px]' width={100} height={100} src={server + e?.thumbnail} />
                    </div>
                    <div className='flex flex-col gap-1 my-auto'>
                        <strong>{e?.title}</strong>
                        <small>{e?.description?.length > 50 ? e?.description?.slice(0, 50) + '...' : e?.description}</small>
                    </div>
                </div>
                <div className='options flex flex-col gap-1 my-auto text-start'>
                    <Link href={`/course/${e?.id}`}>
                        <button className='p-0 px-3 bg-sky-300 hover:bg-black'>تعديل</button>
                    </Link>
                    <button onClick={() => {
                        setdelete_id(e?.id)
                        setdelete_open(true)
                    }} className='p-0 px-3 bg-red-300 hover:bg-black'>حذف</button>
                </div>
            </div>
        ) :
            <>
                {
                    path == '/saved' ? (
                        <div className='flex flex-row gap-3 flex-wrap'>
                            <div>
                                <button onClick={() => courseContext?.deleteFromFav(e?.id)} className='border-red-600 border bg-transparent text-black px-3 hover:px-5 hover:border-none'>حذف</button>
                            </div>
                            <Link href={`/course/${e?.id}`} className='flex flex-row gap-3 flex-wrap bg-white p-3 w-full shadow-md transition-all hover:px-5 hover:rounded-3xl'>
                                <div>
                                    <Image alt='' className='max-w-[100px] h-[100px] sm:max-w-[150px] sm:h-[150px]' width={500} height={500} src={server + e?.thumbnail} />
                                </div>
                                <div className='my-auto flex flex-col gap-2'>
                                    <strong>{e?.title}</strong>
                                    <small>{e?.description?.length > 50 ? e?.description?.slice(0, 50) + "..." : e?.description}</small>
                                    <strong className='mb-0 font-bold text-green-600'>EGP {e?.price}</strong>
                                </div>
                            </Link>
                        </div>
                    ) : (
                        <>
                            {
                                e?.review | !e?.review ? <div className='mx-auto'>
                                    <Rating defaultValue={e?.review} readOnly />
                                </div> : null
                            }
                            <div className='course border p-2 px-4 rounded-md
                flex flex-col gap-1 justify-between w-[200px] sm:w-[250px]'>
                                <Link href={`/course/${e?.id}`} key={e?.id}>
                                    <div className='head mx-auto'>
                                        <Image alt='' className='w-[200px] h-[200px] sm:w-[250px] sm:h-[250px]' width={500} height={500} src={server + e?.thumbnail} />
                                    </div>
                                    <div className='text-center'>
                                        <strong>{e?.title}</strong>
                                    </div>
                                    <div className='text-center'>
                                        <small className='font-bold text-green-600'>EGP {e?.price}</small>
                                    </div>
                                </Link>
                                <div className='w-full'>
                                    <button onClick={() => {
                                        courseContext?.getSaved()
                                        courseContext?.addToFav(e?.id)
                                    }} className='w-full bg-black text-white hover:text-black hover:bg-transparent border border-black'>أحفظه لممشاهدة لاحقا</button>
                                </div>
                            </div>
                        </>
                    )
                }
            </>

    )
}

export default CourseComponent