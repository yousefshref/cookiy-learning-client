'use client'
import { AuthContextProvider } from '@/context/AuthContext'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useContext } from 'react'
import { server } from '../../server'
import { CourseContextProvider } from '@/context/CourseContext'

const Header = () => {
  const authContext = useContext(AuthContextProvider)
  const courseContext = useContext(CourseContextProvider)

  const path = usePathname()

  return (
    <div className='px-4 py-1 shadow-md flex flex-row-reverse justify-between bg-white'>
      {
        path == '/' ? (
          <div className='my-auto flex flex-row-reverse gap-2'>
            <div className='my-auto'>
              <Image alt='cookiy logo' width={30} height={30} src={'/cookiy_logo.png'} />
            </div>
            <div className='my-auto'>
              <p className='header_logo text-sm'>cookiy - learning</p>
            </div>
          </div>
        ) : (
          <div className='my-auto'>
            <Image alt='cookiy logo' width={30} height={30} src={'/cookiy_logo.png'} />
          </div>
        )
      }
      <div className='my-auto flex flex-row gap-4'>
        {
          path == '/' ? (
            <>
              <button className='px-2 bg-transparent border border-black '>
                <Link href={'/login'}>
                  سجل الدخول
                </Link>
              </button>
              <button className='px-2 bg-black text-white border hover:text-black hover:bg-transparent border-black'>
                <Link href={'/register'}>
                  سجل حساب جديد
                </Link>
              </button>
            </>
          ) : (
            authContext?.user?.user_details?.is_teacher ? (
              <>
                <Link href={'/profile'}>
                  <Image alt='' width={40} height={40} className='rounded-full max-w-[40px] max-h-[40px]' src={authContext?.user?.image ? server + authContext?.user?.image : '/avatar-.jpg'} />
                </Link>
                <Link className='my-auto' href={'/create_course'}>انشئ كورس</Link>
              </>
            ) : (
              <>
                <Link href={'/profile'}>
                  <Image alt='' width={40} height={40} className='rounded-full max-w-[40px] max-h-[40px]' src={authContext?.user?.image ? server + authContext?.user?.image : '/avatar-.jpg'} />
                </Link>
                <Link className='my-auto' href={'/search'}>ابحث عن كورس</Link>
                <Link onClick={() => courseContext?.getSaved()} className='my-auto' href={'/saved'}>المحفوظة <span className='py-1 px-2.5 rounded-full bg-red-800 text-white'>{courseContext?.saved?.length}</span></Link>
              </>
            )
          )
        }
      </div>
    </div>
  )
}

export default Header