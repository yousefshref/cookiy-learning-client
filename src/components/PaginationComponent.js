'use client'
import { CourseContextProvider } from '@/context/CourseContext'
import React, { useContext } from 'react'

const PaginationComponent = () => {
    const courseContext = useContext(CourseContextProvider)

    // pagination
    const goToPage = (page) => {
        window.scrollTo(0, 0)
        courseContext?.setCurrentPage(page);
    };
    // pagination
    return (
        <div className="justify-center gap-10 flex mx-auto px-4 mb-3">
            {courseContext?.currentPage > 1 && (
                <div>
                    <button
                    className='text-2xl bg-transparent py-0 px-4 hover:bg-black'
                        onClick={() => goToPage(courseContext?.currentPage - 1)}
                    >
                        <strong>{'<'}</strong>
                    </button>
                </div>
            )}
            {courseContext?.currentPage < courseContext?.totalPages && (
                <div>
                    <button
                    className='text-2xl bg-transparent py-0 px-4 hover:bg-black'
                        onClick={() => goToPage(courseContext?.currentPage + 1)}
                    >
                        <strong>{'>'}</strong>
                    </button>
                </div>
            )}
        </div>
    )
}

export default PaginationComponent