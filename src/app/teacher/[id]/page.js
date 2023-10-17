'use client'
import axios from 'axios'
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { server } from '../../../../server'
import { usePathname } from 'next/navigation'
import Header from '@/components/Header'
import SwiperButtonNext from '@/components/SwiperButtonNext'
import SwiperButtonPrev from '@/components/SwiperButtonPrev'
import Image from 'next/image'
import { Rating } from '@mui/material'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import Link from 'next/link'
import { AuthContextProvider } from '@/context/AuthContext'


const page = () => {
    const authContext = useContext(AuthContextProvider)

    const path = usePathname()

    const [teacher, setTeacher] = useState()
    const getTeacher = async() => {
        await axios.get(`${server}get_teacher_profile/?id=${path.split('/').pop()}`)
        .then((e) => setTeacher(e.data))
    }
    useEffect(() => {
        path.split('/').pop() ? getTeacher() : null
    }, [])



    const [teacherCourses, setTeacherCourses] = useState([])
    const getTeacherCourses = async() => {
        await axios.get(`${server}get_teacher_courses/?teacher_id=${path.split('/').pop()}&title=`)
        .then((e) => setTeacherCourses(e.data))
    }
    useEffect(() => {
        path.split('/').pop() ? getTeacherCourses() : null
    }, [])



  return (
    <div>
        <Header />
        <br />
        <div className='text-start px-5'>
            <div className='w-fit mx-auto'>
                <Rating readOnly />
            </div>
            <div className='head flex flex-row gap-3 bg-white rounded-md p-3 shadow-lg'>
                <div className='my-auto'>
                    <Image className='w-[100px] h-[100px] rounded-full' alt='' width={500} height={500} src={teacher?.image ? server+teacher?.image : '/avatar-.jpg'} />
                </div>
                <div className='flex flex-col my-auto'>
                    <strong>{teacher?.user_details?.username}</strong>
                    <small>{teacher?.bio ? teacher?.bio : ''}</small>
                </div>
            </div>
            <br />
            <div className='courses flex flex-col gap-4 bg-white rounded-md p-3 shadow-lg max-w-[100%] md:max-w-[900px] mx-auto'>
                <div className='flex flex-row justify-between'>
                    <strong>أخر دروسة</strong>
                    <button className='px-2 bg-black hover:bg-white hover:text-black text-white hover:px-6'>
                        <Link href={`/teacher/all/${teacher?.user}`}>
                            جميع الدروس
                        </Link>
                    </button>
                </div>

                <hr />

                <div>
                    <Swiper
                        slidesPerView={window.innerWidth >= '1000' ? 3 : 1}
                        spaceBetween={100}
                        className='relative'
                    >
                        <SwiperButtonPrev />
                        <SwiperButtonNext />
                        {
                            teacherCourses?.slice(0, 10).map((e) => (
                                <SwiperSlide className='transition-all hover:scale-105 hover:bg-sky-200 
                                my-auto
                                bg-opacity-60 hover:rounded-md hover:px-5
                                ' key={e?.id}>
                                    <Link href={`/course/${e?.id}`}>
                                        <div className='mx-auto w-fit'>
                                            <Rating readOnly />
                                        </div>
                                        <div className='mx-auto w-fit'>
                                            <Image className='max-w-[150px] max-h-[150px] rounded-sm' alt='' width={500} height={500} src={server+e?.thumbnail} />
                                        </div>
                                        <div className='text-center w-[150px] mx-auto'>
                                            <strong>{e?.title}</strong>
                                        </div>
                                    </Link>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>

            </div>
            <br />
            <div className='details flex flex-col gap-4 bg-white rounded-md p-3 shadow-lg max-w-[100%] md:max-w-[900px] mx-auto'>
                <strong>معلومات عن المدرس</strong>
                <hr />
                <ul>
                    <li className='text-lg'>• التخصص: {teacher?.specialty_name?.name}</li>
                    <li className='text-lg'>• سعر الاشتراك الشهري: <strong className='text-green-600'>EGP {teacher?.subscribation_cost}</strong></li>
                </ul>
                <button className='w-full'>أشترك لتشاهد جميع الكورسات مجانا وتتابع الجديد !</button>
            </div>
        </div>
    </div>
  )
}

export default page