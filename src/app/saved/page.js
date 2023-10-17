'use client'
import CourseComponent from '@/components/CourseComponent'
import Header from '@/components/Header'
import { CourseContextProvider } from '@/context/CourseContext'
import React, { useContext } from 'react'

const page = () => {
  const courseContext = useContext(CourseContextProvider)
  return (
    <div>
      <Header />
      <br />
      <div className='px-3'>
        <div className='head max-w-[100%] md:max-w-[800px] mx-auto bg-white p-2 px-5 rounded-md shadow-lg flex flex-row justify-between'>
          <strong>جميع المحفوظة</strong>
          <button onClick={() => courseContext?.deleteAllFav()} className='bg-red-600 text-white px-3'>حذف الجميع</button>
        </div>
        <br />
        <div className='saved flex flex-col gap-5 max-w-[100%] md:max-w-[1000px] mx-auto'>
          {
            courseContext?.saved?.length == 0 ? (
            <div className='flex flex-row-reverse text-center absolute top-[50%] translate-y-[-50%] right-[50%] translate-x-[50%] gap-3 flex-wrap bg-white p-3 w-full shadow-md transition-all hover:px-5 hover:rounded-3xl'>
              <h1 className='w-fit mx-auto font-semibold text-2xl'>لا يوجد حاليا اي محفوظات</h1>
            </div>
            ) :(
              courseContext?.saved?.map((e) => (
                <div key={e?.id}>
                  <CourseComponent e={e?.course_details} />
                </div>
              ))
            )
          }
        </div>
      </div>
    </div>
  )
}

export default page