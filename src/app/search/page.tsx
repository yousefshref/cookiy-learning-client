'use client'
import CourseComponent from '@/components/CourseComponent'
import Header from '@/components/Header'
import PaginationComponent from '@/components/PaginationComponent'
import { CourseContextProvider } from '@/context/CourseContext'
import React, { useContext } from 'react'

const page = () => {
    const courseContext = useContext(CourseContextProvider)
  return (
    <div className='search_container'>
        <Header />
        <br />
        <div className='text-center px-5'>
            <div className='search_component bg-white p-3 rounded-md shadow-lg w-[100%] md:max-w-[800px] mx-auto'>
                <div className='flex flex-col gap-2'>
                    <strong>هل تبحث عن شئ معين ؟</strong>
                    <input onChange={(e) => courseContext?.setQSearch(e.target.value)} placeholder='ابحث هنا' />
                </div>
            </div>
            <br />
            <PaginationComponent />
            <div className='courses_container bg-white p-3 rounded-md shadow-lg flex flex-row flex-wrap justify-center gap-5 w-[100%] md:max-w-[1200px] mx-auto'>
                {
                    courseContext?.allCourses?.map((e:any) => (
                        <div key={e?.id}>
                            <CourseComponent setdelete_id={''} setdelete_open={''} e={e} />
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default page