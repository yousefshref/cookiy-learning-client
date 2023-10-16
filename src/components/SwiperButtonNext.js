'use client'
import { useSwiper } from 'swiper/react';
import React from 'react'

const SwiperButtonNext = () => {
    const swiper = useSwiper();

  return (
    <p onClick={() => swiper.slideNext()} className='bg-neutral-200
    
    absolute top-0 bottom-0 right-0 z-50
    hover:text-white text-black px-0.5 font-bold transition-all hover:bg-black hover:px-1 cursor-pointer rounded-md h-[100%] flex flex-col justify-center'>{'>'}</p>
  )
}

export default SwiperButtonNext