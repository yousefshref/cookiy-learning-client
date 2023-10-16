'use client'
import Header from '@/components/Header'
import CourseReviewComponent from '@/components/CourseReviewComponent'
import axios from 'axios'
import { usePathname } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import { server } from '../../../../../server'
import { CourseContextProvider } from '@/context/CourseContext'
import { Rating } from '@mui/material'
import { AuthContextProvider } from '@/context/AuthContext'

const page = () => {
    const path = usePathname()

    const authContext = useContext(AuthContextProvider)
    const courseContext = useContext(CourseContextProvider)

    const [course, setCourse] = useState([])
    const getCourse = async () => {
        await axios(`${server}get_all_courses/?id=${path.split('/')[2]}`)
            .then((e) => setCourse(e.data.results))
    }
    useEffect(() => {
        getCourse()
    }, [])
    return (
        <div className='mb-10'>
            <Header />
            <br />
            <div className='px-5'>
                <div className='container__1000'>
                    <div className='video bg-black md:max-w-[700px] md:h-[500px] h-[100%] w-[100%] mx-auto'>
                        video
                    </div>
                </div>
                <br />
                <div className='container__1000 text-end flex flex-col gap-3'>
                    <strong>التقيمات</strong>
                    <hr />
                    {
                        courseContext?.reviews?.find((x) => x?.student == authContext?.user?.user_details?.id) ? (
                            <div className='create_review'>
                                <div className='flex flex-col gap-2 text-end'>
                                    <strong>عدل علي تعليقك</strong>
                                    <div className='w-fit ms-auto my-auto'>
                                        <Rating value={courseContext?.review == 0 ? courseContext?.reviews?.find((x) => x?.student == authContext?.user?.user_details?.id)?.review : courseContext?.review} onChange={(e) => courseContext?.setReview(e.target.value)} />
                                    </div>
                                    <textarea defaultValue={courseContext?.reviews?.find((x) => x?.student == authContext?.user?.user_details?.id)?.comment} className='h-[100px]' onChange={(e) => courseContext?.setComment(e.target.value)} />
                                    <div className='ms-auto'>
                                        <button onClick={() => courseContext?.updateCourseReview(path.split('/')[2])} className='px-2 hover:px-5'>ارسل</button>
                                    </div>
                                </div>
                            </div>
                        ) : <div className='create_review'>
                            <div className='flex flex-col gap-2 text-end'>
                                <strong>اكتب تعليق او سؤال</strong>
                                <div className='w-fit ms-auto my-auto'>
                                    <Rating value={courseContext?.review} onChange={(e) => courseContext?.setReview(e.target.value)} />
                                </div>
                                <textarea className='h-[100px]' onChange={(e) => courseContext?.setComment(e.target.value)} />
                                <div className='ms-auto'>
                                    <button onClick={() => courseContext?.createCourseReview(path.split('/')[2])} className='px-2 hover:px-5'>ارسل</button>
                                </div>
                            </div>
                        </div>
                    }
                    <div className='reviews flex flex-col gap-8'>

                        <hr className='my-2' />
                        {
                            courseContext?.reviews?.map((e) => (
                                <div key={e?.id}>
                                    <CourseReviewComponent e={e} />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page