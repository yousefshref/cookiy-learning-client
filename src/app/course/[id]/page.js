'use client'
import axios from 'axios'
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { server } from '../../../../server'
import { usePathname } from 'next/navigation'
import Header from '@/components/Header'
import Image from 'next/image'
import { AuthContextProvider } from '@/context/AuthContext'
import { Rating } from '@mui/material'
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css'
import Link from 'next/link'
import SwiperButtonNext from '@/components/SwiperButtonNext'
import SwiperButtonPrev from '@/components/SwiperButtonPrev'
import { CourseContextProvider } from '@/context/CourseContext'
import { EnrollmentContextProvider } from '@/context/EnrollmentContext'


const page = () => {

    const authContext = useContext(AuthContextProvider)
    const courseContext = useContext(CourseContextProvider)
    const enrollmentContext = useContext(EnrollmentContextProvider)

    const pathName = usePathname()




    const [error, seterror] = useState()

    const [title, settitle] = useState('')
    const [description, setdescription] = useState('')
    const [price, setprice] = useState('')
    const [thumbnail, setthumbnail] = useState('')
    const [video_url, setvideo_url] = useState('')

    const [free_video, setfree_video] = useState('')

    const getCourse = async () => {
        await axios.get(`${server}get_teacher_courses/?email=${document.cookie.split('email=')[1]}&id=${pathName.split('/').pop()}`)
            .then((e) => {
                settitle(e.data.title)
                setdescription(e.data.description)
                setprice(e.data.price)
                setthumbnail(e.data.thumbnail)
                setvideo_url(e.data.video_url)
                setfree_video(e.data.free_video)
            })
    }
    useEffect(() => {
        authContext?.user?.user_details?.is_teacher ? getCourse() : null
    }, [authContext?.user?.length])




    const updateCourse = async (e) => {
        e.preventDefault()

        const formData = new FormData()

        formData.append('email', document.cookie.split('email=')[1])
        formData.append('course_id', pathName.split('/').pop())

        formData.append('title', title)
        formData.append('description', description)
        formData.append('price', price)
        formData.append('thumbnail', thumbnail)
        formData.append('video_url', video_url)

        formData.append('free_video', free_video)

        await axios.post(`${server}edit_teacher_course/`, formData, {
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then((e) => {
                if (e.data.success) {
                    window.location.pathname = '/profile'
                } else {
                    seterror(e.data)
                }
            })
    }

    const [optionalOpen, setOptionalOpen] = useState(false)



    const [course, setcourse] = useState([])
    const getCourseStudent = async () => {
        await axios.get(`${server}get_all_courses/?id=${pathName.split('/').pop()}`)
            .then((e) => {
                setcourse(e.data.results)
            })
    }
    useEffect(() => {
        authContext?.user?.user_details?.is_teacher == false ? getCourseStudent() : null
    }, [authContext?.user?.length])


    const swiper_ref = useRef()
    
    const handlePrev = useCallback(() => {
        if (!swiper_ref.current) return;
        swiper_ref.current.swiper.slidePrev();
    }, [])

    const handleNext = useCallback(() => {
        if (!swiper_ref.current) return;
        swiper_ref.current.swiper.slideNext();
    }, [])


    return (
        authContext?.user?.user_details?.is_teacher ? (
            <div>
                <Header />
                <br />
                <div className='create_course_container text-end px-3 w-[96%] mx-auto md:w-[600px] bg-white p-5 rounded-sm shadow-xl'>
                    <h1 className='text-center text-3xl font-bold'>يمكنك التعديل علي الكورس</h1>
                    <hr className='my-5' />
                    <form className='flex flex-col gap-5'>
                        <div className='flex flex-col gap-2'>
                            <div className='mx-auto'>
                                <Image src={server + thumbnail} alt='' width={300} height={300} className='w-[300px] h-[180px]' />
                            </div>
                            <label className='flex flex-row-reverse gap-3 flex-wrap'>
                                <div>
                                    قم بتغيير الصورة المصغرة
                                </div>
                                <div className='text-red-700'>
                                    ( 1920 x 1080 يفضل ان تكون )
                                </div>
                            </label>
                            <input onChange={(e) => setthumbnail(e.target.files[0])} type='file' />
                            {
                                error?.thumbnail ? <small className='text-red-600'>{error?.thumbnail}</small> : null
                            }
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label>الاسم</label>
                            <input onChange={(e) => settitle(e.target.value)} value={title} type='text' />
                            {
                                error?.title ? <small className='text-red-600'>{error?.title}</small> : null
                            }
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label>الوصف</label>
                            <textarea onChange={(e) => setdescription(e.target.value)} value={description} className='h-[200px]' />
                            {
                                error?.description ? <small className='text-red-600'>{error?.description}</small> : null
                            }
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label>السعر</label>
                            <input onChange={(e) => setprice(e.target.value)} value={price} />
                            {
                                error?.price ? <small className='text-red-600'>{error?.price}</small> : null
                            }
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label>رابط الفديو</label>
                            <input onChange={(e) => setvideo_url(e.target.value)} value={video_url} type='url' />
                            {
                                error?.video ? <small className='text-red-600'>{error?.video}</small> : null
                            }
                        </div>
                        <div className='w-full'>
                            <button onClick={(e) => {
                                e.preventDefault()
                                setOptionalOpen(!optionalOpen)
                            }} className='w-[100%] bg-black text-white hover:bg-white hover:text-black'>اضغط لتضع اشياء اضافية تزود من فرصة بيع الكورس</button>
                        </div>
                        {
                            optionalOpen ? (
                                <div className='optionals flex flex-col gap-5'>

                                    <div className='flex flex-col gap-2'>
                                        <label>ضع رابط فديو تعريفي عن الكورس يجذب الطلاب</label>
                                        <input value={free_video} onChange={(e) => setfree_video(e.target.value)} type='url' />
                                    </div>

                                </div>
                            ) : null
                        }
                        <div>
                            <button className='px-3 hover:px-6 hover:bg-black' onClick={(e) => updateCourse(e)}>
                                تم
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        ) : (
            <div>
                <Header />
                <br />

                <div className='review_course px-5'>

                    {
                        course?.map((e) => (
                            <div key={e?.id} className='w-[100%] md:max-w-[800px] mx-auto'>
                                <div className='mx-auto w-fit'>
                                    <Rating readOnly />
                                </div>
                                <div className='text-center bg-white rounded-md shadow-md p-2'>
                                    <Swiper
                                    ref={swiper_ref}
                                    slidesPerView={1}
                                    className='relative'
                                    >
                                        {
                                            e?.free_video ? (
                                                <>
                                                <SwiperButtonPrev />
                                                <SwiperButtonNext />
                                                </>
                                            ):null
                                        }

                                        {
                                            e?.free_video ? (
                                                <SwiperSlide>
                                                    <div className='w-[300px] h-[300px] bg-black mx-auto'>
                                                        video
                                                    </div>
                                                </SwiperSlide>
                                            ):null
                                        }

                                        <SwiperSlide>
                                            <div className='mx-auto w-fit'>
                                                <Image className='w-[300px] h-[300px]' src={server + e?.thumbnail} alt='' width={500} height={500} />
                                            </div>
                                        </SwiperSlide>
                                        
                                    </Swiper>
                                    <div>
                                        <strong>{e?.title}</strong>
                                        <hr />
                                        <div className='flex flex-col gap-0 text-end border border-black p-2 rounded-md'>{e?.description.split('\r\n').map((e) => <p key={e+Math.random()}>{e}</p>)}</div>
                                    </div>
                                    <br />
                                    <div>
                                        <strong className='text-green-600'>EGP {e?.price}</strong>
                                    </div>
                                    
                                    {
                                            enrollmentContext?.enrollments?.find((x) => e?.id == x?.course)? 
                                            <Link href={`/course/${e?.id}/watch`}>
                                                <button className='w-full bg-sky-700 text-white'>
                                                        شاهد الكورس
                                                    
                                                </button> 
                                            </Link> :  <button className='w-full hover:bg-black'>اشتري هذا الكورس</button>
                                    }

                                    <div className='w-full mt-3'>
                                        <button onClick={() => courseContext?.addToFav(e?.id)} className='w-full bg-black text-white hover:text-black hover:bg-transparent border border-black'>أحفظه لممشاهدة لاحقا</button>
                                    </div>
                                </div>
                                <br />
                                <div className='text-end bg-white rounded-md shadow-md p-2'>
                                    <strong>عن المدرس</strong>
                                    <hr className='my-3' />
                                    <div className='mx-auto w-fit'>
                                        <Rating readOnly />
                                    </div>
                                    <Link href={`/teacher/${e?.teacher}`} className='teacher_info cursor-pointer flex flex-row-reverse gap-2 border p-2 rounded-lg bg-slate-200 transition-all
                                    hover:bg-neutral-800 hover:text-white
                                    '>
                                        <div className='my-auto'>
                                            <Image className='max-w-[90px] max-h-[90px] rounded-full' alt='' width={500} height={500} src={e?.teacher_profile?.image ? server + e?.teacher_profile?.image : '/avatar-.jpg'} />
                                        </div>
                                        <div className='my-auto flex flex-col'>
                                            <strong>{e?.teacher_details?.username}</strong>
                                            <small>{e?.teacher_profile?.bio ? e?.teacher_profile?.bio : null}</small>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))
                    }


                </div>

            </div>
        )

    )
}

export default page



// {
//     "id": 9,
//     "teacher_details": {
//         "id": 26,
//         "username": "مستر يوسف شريف",
//         "email": "teacher_yousef@gmail.com",
//         "is_teacher": true,
//         "password": "1234",
//         "date": "2023-10-12"
//     },
//     "teacher_profile": {
//         "id": 7,
//         "user_details": {
//             "id": 26,
//             "username": "مستر يوسف شريف",
//             "email": "teacher_yousef@gmail.com",
//             "is_teacher": true,
//             "password": "1234",
//             "date": "2023-10-12"
//         },
//         "bio": "تست غريب لحد ما الاقي حل لموضوع الصور الغريبة دي من الاخر يعني فاهمني",
//         "image": "/profile_images/1.jpg",
//         "user": 26
//     },
//     "title": "كورس برمجة php حصري",
//     "description": "هذا الكورس يحتوي علي:\r\n1-اساسيات php والتطبيق عليها\r\n2-معرفة الكتغيرات والدوال وغيرهم\r\n3-التطبيق علي مواقع حقيقة",
//     "price": 233,
//     "thumbnail": "/courses_thumbnails/_yous_ef_342530298_1355342405038878_7237721110152673594_n_Fef6MkD.jpg",
//     "video_url": "http://127.0.0.1:8000/admin/api/course/9/change/",
//     "free_video": null,
//     "date": "2023-10-13",
//     "teacher": 26,
//     "profile": 7
// }