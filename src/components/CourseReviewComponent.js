import { Rating } from '@mui/material'
import Image from 'next/image'
import React from 'react'

const CourseReviewComponent = ({ e }) => {
    return (
        <div>
            <div>
                <Rating readOnly value={e?.review} />
            </div>
            <div className='review_container border border-sky-200 p-2 rounded-md'>
                <div className='flex flex-row-reverse gap-3'>
                    <div>
                        <Image className='max-w-[45px] max-h-[45px] rounded-full' alt='' width={500} height={500} src={'/avatar-.jpg'} />
                    </div>
                    <div className='my-auto'>
                        <strong>{e?.studet_details?.username}</strong>
                    </div>
                </div>
                <div>
                    <p>{e?.comment}</p>
                </div>
            </div>
        </div>
    )
}

export default CourseReviewComponent