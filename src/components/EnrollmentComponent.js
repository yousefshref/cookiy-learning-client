import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { server } from '../../server'

const EnrollmentComponent = ({ e }) => {
    return (
        <div>
            <Link href={`/teacher/${e?.teacher_details?.id}`} className='flex flex-row gap-3 mb-3 hover:border-sky-400 transition-all hover:pe-5 hover:rounded-lg p-1'>
                {/* <div className='w-fit'>
                    <Image className='max-w-[40px] max-h-[40px] rounded-full' alt='' width={500} height={500} src={e?.teacher_details?.image ? server+e?.teacher_details?.image : '/avatar-.jpg'} />
                </div> */}
                <div className='my-auto'>
                    <p>{e?.teacher_details?.username}</p>
                </div>
            </Link>
            <div className='enrollment flex-row flex justify-between p-2 border border-black rounded-md'>
                <div className='flex-row flex gap-3'>
                    <div className='w-fit'>
                        <Image className='max-w-[130px] max-h-[130px] rounded-md' alt='' width={500} height={500} src={server+e?.course_details?.thumbnail} />
                    </div>
                    <div className='text-start my-auto flex flex-col gap-1'>
                        <strong>{e?.course_details?.title}</strong>
                        <small>{e?.course_details?.description?.length > 50 ? e?.course_details?.description?.slice(0, 50)+"..." : e?.course_details?.description}</small>
                    </div>
                </div>
                <div className='mt-auto'>
                    <button className='px-2 rounded-sm hover:px-5 bg-sky-300'>
                        <Link href={`/course/${e?.course_details?.id}`}>
                            شاهد
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EnrollmentComponent