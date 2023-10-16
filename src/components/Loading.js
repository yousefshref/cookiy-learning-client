import React from 'react'

const Loading = () => {
  return (
    <div className='bg-white w-[100%] h-[100vh] absolute top-0 bg-opacity-80'>
        <h1 className='absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]
        text-5xl
        '>...جاري التحميل</h1>
    </div>
  )
}

export default Loading