'use client'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { server } from '../../../../../server'
import { usePathname } from 'next/navigation'
import Header from '@/components/Header'
import CourseComponent from '@/components/CourseComponent'
import PaginationComponent from '@/components/PaginationComponent'
import { CourseContextProvider } from '@/context/CourseContext'

const page = () => {
  const path = usePathname()

  const courseContext = useContext(CourseContextProvider)


  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  // pagination

  // pagination
  const goToPage = (page) => {
    window.scrollTo(0, 0)
    setCurrentPage(page);
  };
  // pagination


  const [teacherCourses, setTeacherCourses] = useState([])
  const [q, setQ] = useState('')

  const getTeacherCourses = async () => {
    await axios.get(`${server}get_all_courses/?teacher_id=${path.split('/').pop()}&q=${q}&page_number=${currentPage}`)
      .then((e) => {
        setTeacherCourses(e.data.results)
        setTotalPages(e.data.total_pages)
      })

  }
  useEffect(() => {
    path.split('/').pop() ? getTeacherCourses() : null
  }, [q, currentPage])
  return (
    <div>
      <Header />
      <br />
      <div className='text-center px-5'>
        <div className='search_component bg-white p-3 rounded-md shadow-lg w-[100%] md:max-w-[800px] mx-auto'>
          <div className='flex flex-col gap-2'>
            <strong>هل تبحث عن شئ معين ؟</strong>
            <input onChange={(e) => setQ(e.target.value)} placeholder='ابحث هنا' />
          </div>
        </div>
        <br />
        <div className="justify-center gap-10 flex mx-auto px-4 mb-3">
          {currentPage > 1 && (
            <div>
              <button
                className='text-2xl bg-transparent py-0 px-4 hover:bg-black'
                onClick={() => goToPage(currentPage - 1)}
              >
                <strong>{'<'}</strong>
              </button>
            </div>
          )}
          {currentPage < totalPages && (
            <div>
              <button
                className='text-2xl bg-transparent py-0 px-4 hover:bg-black'
                onClick={() => goToPage(currentPage + 1)}
              >
                <strong>{'>'}</strong>
              </button>
            </div>
          )}
        </div>
        <div className='courses_container bg-white p-3 rounded-md shadow-lg flex flex-row flex-wrap justify-center gap-5 w-[100%] md:max-w-[1200px] mx-auto'>
          {
            teacherCourses?.map((e) => (
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