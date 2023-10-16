'use client'
import Header from '@/components/Header'
import { CourseContextProvider } from '@/context/CourseContext'
import React, { useContext, useState } from 'react'

const page = () => {

    const courseContext = useContext(CourseContextProvider)

    const [optionalOpen, setOptionalOpen] = useState(false)
    return (
        <div>
            <Header />
            <br />
            <div className='create_course_container text-end px-3 w-[100%] mx-auto md:w-[600px] bg-white p-5 rounded-sm shadow-xl'>
                <h1 className='text-center text-3xl font-bold'>انشئ كورس جديد</h1>
                <hr className='my-5' />
                <form className='flex flex-col gap-5'>
                    <div className='flex flex-col gap-2'>
                        <label>الاسم</label>
                        <input onChange={(e) => courseContext?.settitle(e.target.value)} type='text' />
                        {
                            courseContext?.error?.title ? <small className='text-red-600'>{courseContext?.error?.title}</small> : null
                        }
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label>الوصف</label>
                        <textarea onChange={(e) => courseContext?.setdescription(e.target.value)} className='h-[200px]' />
                        {
                            courseContext?.error?.description ? <small className='text-red-600'>{courseContext?.error?.description}</small> : null
                        }
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label>السعر</label>
                        <input onChange={(e) => courseContext?.setprice(e.target.value)} />
                        {
                            courseContext?.error?.price ? <small className='text-red-600'>{courseContext?.error?.price}</small> : null
                        }
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className='flex flex-row-reverse gap-3 flex-wrap'>
                            <div>
                                صورة مصغرة
                            </div>
                            <div className='text-red-700'>
                                ( 1920 x 1080 يفضل ان تكون )
                            </div>
                        </label>
                        <input onChange={(e) => courseContext?.setthumbnail(e.target.files[0])} type='file' />
                        {
                            courseContext?.error?.thumbnail ? <small className='text-red-600'>{courseContext?.error?.thumbnail}</small> : null
                        }
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label>رابط الفديو</label>
                        <input onChange={(e) => courseContext?.setvideourl(e.target.value)} type='url' />
                        {
                            courseContext?.error?.video ? <small className='text-red-600'>{courseContext?.error?.video}</small> : null
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
                                    <input onChange={(e) => courseContext?.setvideourl(e.target.value)} type='url' />
                                </div>

                            </div>
                        ):null
                    }
                    <div>
                        <button onClick={(e) => courseContext?.create_course(e)}>
                            انشئ الان
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default page