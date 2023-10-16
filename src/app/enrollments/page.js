'use client'
import EnrollmentComponent from '@/components/EnrollmentComponent'
import Header from '@/components/Header'
import { EnrollmentContextProvider } from '@/context/EnrollmentContext'
import React, { useContext } from 'react'

const page = () => {
    const enrollmentContext = useContext(EnrollmentContextProvider)
  return (
    <div>
        <Header />
        <br />
        <div className='text-center px-5'>
            <div className='search_component bg-white p-3 rounded-md shadow-lg w-[100%] md:max-w-[800px] mx-auto'>
                <div className='flex flex-col gap-2'>
                    <strong>جميع الكورسات التم تم شرائها</strong>
                    {/* <input onChange={(e) => courseContext?.setQSearch(e.target.value)} placeholder='ابحث هنا' /> */}
                </div>
            </div>
            <br />
            {/* <PaginationComponent /> */}
            <div className='enrollments_container container__1000'>
                {
                    enrollmentContext?.enrollments?.map((e) => (
                        <div key={e?.id}>
                            <EnrollmentComponent e={e} />
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default page