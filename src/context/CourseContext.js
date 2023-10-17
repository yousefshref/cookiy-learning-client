'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import {server} from '../../server'
import { UtlitsContextProvider } from './UtlitsContext'
import { AuthContextProvider } from './AuthContext'
import { usePathname } from 'next/navigation'

const CourseContext = ({children}) => {
  const utlitsContext = useContext(UtlitsContextProvider)
  const authContext = useContext(AuthContextProvider)

  const path = usePathname()

  const [error, seterror] = useState([])
  const [title, settitle] = useState('')
  const [description, setdescription] = useState('')
  const [price, setprice] = useState('')
  const [thumbnail, setthumbnail] = useState(null)
  const [videourl, setvideourl] = useState('')
  
  const [freevideo, setfreevideo] = useState('')

  const create_course = async(e) => {
    utlitsContext?.setloading(true)

    e.preventDefault()
    
    const formData = new FormData()

    formData.append('teacher_email', document.cookie.split('email=')[1])
    formData.append('title', title)
    formData.append('description', description)
    formData.append('price', price)
    formData.append('thumbnail', thumbnail)
    formData.append('video_url', videourl)
    formData.append('free_video', freevideo)

    await axios.post(`${server}create_course/`, formData, {
      method:"POST",
      headers:{
        "Content-Type":"multipart/form-data"
      }
    })

    .then((e) => {
      utlitsContext?.setloading(false)
      if(e.data.success){
        window.location.pathname = '/profile'
      }
      else{
        seterror(e.data)
      }
    })
  }



  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  // pagination

  const [teacherCourses, setTeacherCourses] = useState([])
  const [titleSearch, setTitleSearch] = useState('')


  const getTeacherCourses = async() => {
    utlitsContext?.setloading(true)
    await axios.get(`${server}get_teacher_courses/?email=${document.cookie.split('email=')[1]}&page_number=${currentPage}&title=${titleSearch}`)
    .then((e) => {
      utlitsContext?.setloading(false)
      setTeacherCourses(e.data.results)
      setTotalPages(e.data.total_pages)
    })
  }

  useEffect(() => {
    document.cookie.split('email=')[1] && authContext?.user?.user_details?.is_teacher ? getTeacherCourses() : null
  }, [authContext?.user?.length, currentPage, titleSearch])



  const [allCourses, setAllCourses] = useState([])
  const [qSearch, setQSearch] = useState('')

  const getAllCourses = async() => {
    utlitsContext?.setloading(true)
    await axios.get(`${server}get_all_courses/?q=${qSearch}&page_number=${currentPage}`)
    .then((e) => {
      utlitsContext?.setloading(false)
      setAllCourses(e.data.results)
      setTotalPages(e.data.total_pages)
    })
  }

  useEffect(() => {
    getAllCourses()
  }, [qSearch, currentPage])










  // FAVOURITE
  const addToFav = async (course_id) => {
    utlitsContext?.setloading(true)
    await axios.post(`${server}add_to_fav/`,{
      student:authContext?.user?.user_details?.id,
      course:course_id
    })
    .then((e) => {
      utlitsContext?.setloading(false)
      if(e.data.success){
        alert('تمت الاضافة بنجاح')
      }
      if(e.data.exist){
        alert('تمت الاضافة سابقا')
      }
    })
  }

  const [saved, setSaved] = useState([])
  const getSaved = async() => {
    utlitsContext?.setloading(true)
    await axios.get(`${server}get_student_fav/?student=${authContext?.user?.user_details?.id}`)
    .then((e) => {
      utlitsContext?.setloading(false)
      setSaved(e.data)
    })
  }
  useEffect(() => {
    authContext?.user?.user_details?.id && authContext?.user?.user_details?.is_teacher != true ? getSaved() : null
  }, [authContext?.user?.length, saved?.length])


  const deleteAllFav = async() => {
    utlitsContext?.setloading(true)
    await axios.delete(`${server}delete_all_fav/?student=${authContext?.user?.user_details?.id}`)
    .then((e) => {
      utlitsContext?.setloading(false)
      if(e.data.success){
        alert('تم حذف الجميع من المفضلة')
        window.location.reload()
      }
    })
  }

  const deleteFromFav = async(course_id) => {
    utlitsContext?.setloading(true)
    await axios.delete(`${server}delete_from_fav/?student=${authContext?.user?.user_details?.id}&fav_id=${course_id}`)
    .then((e) => {
      utlitsContext?.setloading(false)
      if(e.data.success){
        alert('تم الحذف بنجاح')
        window.location.reload()
      }
    })
  }





  // COURSE REVIWES
  const [reviews, setReviews] = useState([])
  const getReviews = async() => {
    utlitsContext?.setloading(true)
    await axios.get(`${server}get_course_review/?course=${path.split('/')[2]}`)
    .then((e) => {
      utlitsContext?.setloading(false)
      setReviews(e.data)
    })
  }
  useEffect(() => {
    path.includes(`course/${path.split('/')[2]}/watch`) | path.includes(`course/${path.split('/')[2]}`) ? getReviews() : null
  }, [path.length])


  const [review, setReview] = useState(0)
  const [comment, setComment] = useState('')

  const createCourseReview = async(course) => {
    await axios.post(`${server}create_course_review/`,{
      course:course,
      student:authContext?.user?.user_details?.id,
      review:review,
      comment:comment
    })
    .then((e) => {
      if(e.data.success){
        window.location.reload()
      }
    })
  }
  const updateCourseReview = async(course) => {
    await axios.post(`${server}update_course_review/`,{
      course:course,
      student:authContext?.user?.user_details?.id,
      review:review == 0 ? reviews?.find((x) => x?.student == authContext?.user?.user_details?.id)?.review : review,
      comment:comment?.length == 0 ? reviews?.find((x) => x?.student == authContext?.user?.user_details?.id)?.comment : comment
    })
    .then((e) => {
      if(e.data.success){
        window.location.reload()
      }
    })
  }




  return (
    <CourseContextProvider.Provider value={{
      currentPage,
      setCurrentPage,
      totalPages,
      settitle,
      setdescription,
      setprice,
      setthumbnail,
      setvideourl,
      error,
      create_course,

      teacherCourses,
      allCourses,
      setQSearch,

      setTitleSearch,
      setfreevideo,



      // fav
      addToFav,
      saved,
      deleteAllFav,
      deleteFromFav,
      getSaved,



      // course review
      reviews,
      review,
      createCourseReview, setReview, setComment, review,
      updateCourseReview
    }}>
        {children}
    </CourseContextProvider.Provider>
  )
}

export default CourseContext
export const CourseContextProvider = createContext()