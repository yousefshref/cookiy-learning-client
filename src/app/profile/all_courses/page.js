'use client'
import CourseComponent from '@/components/CourseComponent'
import Header from '@/components/Header'
import PaginationComponent from '@/components/PaginationComponent'
import { CourseContextProvider } from '@/context/CourseContext'
import React, { useContext, useState } from 'react'
import { server } from '../../../../server'
import axios from 'axios'

const page = () => {
    const courseContext = useContext(CourseContextProvider)

    const [delete_open, setdelete_open] = useState(false)
    const [delete_id, setdelete_id] = useState('')


    const deleteCourse = async () => {
        await axios.delete(`${server}delete_course/?email=${document.cookie.split('email=')[1]}&id=${delete_id}`)
            .then((e) => {
                window.location.reload()
            })
    }
    return (
        <div>
            {
                delete_open ?
                    <div className='edit_profile bg-neutral-300 w-[100%] h-[100%] text-center absolute bg-opacity-50'>
                        <div className='absolute top-[50%] translate-y-[-50%] right-[50%] translate-x-[50%] w-[90%] md:w-[500px]'>
                            <div className='bg-white p-1 rounded-sm shadow-lg px-5 mt-2'>
                                <strong>هل انت متأكد ؟</strong>
                                <hr className='my-2' />
                                <div className='flex flex-row justify-between'>
                                    <button onClick={() => setdelete_open(false)} className='px-5 bg-red-400 hover:bg-black'>لا</button>
                                    <button onClick={() => deleteCourse()} className='px-5 bg-green-400 hover:bg-black'>نعم</button>
                                </div>
                            </div>
                        </div>
                    </div> : null
            }
            <Header />
            <br />
            <div className='all_courses_container w-[97%] md:w-[700px] mx-auto flex flex-col gap-5'>
                <div className='bg-white p-1 text-center rounded-md shadow-lg'>
                    <strong>جميع كورساتك</strong>
                </div>

                <div className='search bg-white p-1 text-center rounded-md shadow-lg px-5 py-2'>
                    <input onChange={(e) => courseContext?.setTitleSearch(e.target.value)} className='w-full' placeholder="ابحث بأسم الكورس" />
                </div>


                <div className='courses mb-10 '>
                    {/* PAGINATION */}
                    <PaginationComponent />
                    {/* PAGINATION */}
                    <div className='courses bg-white py-5 px-3 text-center rounded-md shadow-lg'>
                        <div className='flex flex-col gap-5'>
                            {
                                courseContext?.teacherCourses?.map((e) => (
                                    <div key={e?.id}>
                                        <CourseComponent setdelete_id={setdelete_id} setdelete_open={setdelete_open} e={e} />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page