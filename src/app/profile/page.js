"use client";
import Header from "@/components/Header";
import EnrollmentComponent from "@/components/EnrollmentComponent";
import CourseComponent from "@/components/CourseComponent";
import { AuthContextProvider } from "@/context/AuthContext";
import { CourseContextProvider } from "@/context/CourseContext";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { server } from "../../../server";
import Link from "next/link";
import axios from "axios";
import { UtlitsContextProvider } from "@/context/UtlitsContext";
import { EnrollmentContextProvider } from "@/context/EnrollmentContext";

const page = () => {
    const authContext = useContext(AuthContextProvider);
    const courseContext = useContext(CourseContextProvider);
    const utlitsContext = useContext(UtlitsContextProvider);
    const enrollmentContext = useContext(EnrollmentContextProvider);

    const [edit_open, setedit_open] = useState(false);
    const [edit_profile_open, setedit_profile_open] = useState(false);

    const [delete_open, setdelete_open] = useState(false);
    const [delete_id, setdelete_id] = useState("");

    const deleteCourse = async () => {
        await axios
            .delete(
                `${server}delete_course/?email=${document.cookie.split("email=")[1]
                }&id=${delete_id}`
            )
            .then((e) => {
                window.location.reload();
            });
    };

    // check login
    useEffect(() => {
        !document.cookie.split("email=")[1] ? (location.pathname = "/") : null;
    }, []);

    return (
        <div>
            {edit_open ? (
                <div className="edit_profile bg-neutral-300 w-[100%] h-[100%] text-end absolute bg-opacity-50">
                    <div className="absolute top-[50%] translate-y-[-50%] right-[50%] translate-x-[50%] w-[90%] md:w-[500px]">
                        <div>
                            <button
                                className="
                px-5 bg-rose-700 py-1 text-white transition-all
                hover:text-neutral-800 hover:bg-neutral-200
                "
                                onClick={() => setedit_open(false)}
                            >
                                أغلق
                            </button>
                        </div>
                        <div className="bg-white p-1 rounded-sm shadow-lg px-5 mt-2">
                            <strong>عدل علي صفحتك</strong>
                            <hr className="my-2" />
                            <div className="flex flex-col gap-3">
                                <div className="edit_image flex flex-col gap-1">
                                    <div className="w-fit mx-auto">
                                        <Image
                                            className="w-[100px] h-[100px] rounded-full"
                                            alt=""
                                            width={100}
                                            height={100}
                                            src={
                                                authContext?.user?.image
                                                    ? server + authContext?.user?.image
                                                    : "/avatar-.jpg"
                                            }
                                        />
                                    </div>
                                    <label>غير الصورة</label>
                                    <input
                                        onChange={(e) => authContext?.setimage(e.target.files[0])}
                                        type="file"
                                    />
                                </div>
                                <div className="edit_image flex flex-col gap-1">
                                    <label>غير وصف الصفحة</label>
                                    <textarea
                                        defaultValue={authContext?.user?.bio}
                                        onChange={(e) => authContext?.setbio(e.target.value)}
                                        className="h-[150px]"
                                    />
                                </div>
                                <div>
                                    <button
                                        onClick={() => authContext?.editProfile()}
                                        className="px-5"
                                    >
                                        تم
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
            {delete_open ? (
                <div className="edit_profile bg-neutral-300 w-[100%] h-[100%] text-center absolute bg-opacity-50">
                    <div className="absolute top-[50%] translate-y-[-50%] right-[50%] translate-x-[50%] w-[90%] md:w-[500px]">
                        <div className="bg-white p-1 rounded-sm shadow-lg px-5 mt-2">
                            <strong>هل انت متأكد ؟</strong>
                            <hr className="my-2" />
                            <div className="flex flex-row justify-between">
                                <button
                                    onClick={() => setdelete_open(false)}
                                    className="px-5 bg-red-400 hover:bg-black"
                                >
                                    لا
                                </button>
                                <button
                                    onClick={() => deleteCourse()}
                                    className="px-5 bg-green-400 hover:bg-black"
                                >
                                    نعم
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
            {edit_profile_open |
                !authContext?.user?.specialty |
                !authContext?.user?.subscribation_cost &&
                authContext?.user?.user_details?.is_teacher ? (
                <div className="edit_profile bg-neutral-300 w-[100%] h-[100%] text-end absolute bg-opacity-50">
                    <div className="absolute top-[50%] translate-y-[-50%] right-[50%] translate-x-[50%] w-[90%] md:w-[500px]">
                        {!authContext?.user?.specialty |
                            !authContext?.user?.subscribation_cost ? null : (
                            <div>
                                <button
                                    className="
                px-5 bg-rose-700 py-1 text-white transition-all
                hover:text-neutral-800 hover:bg-neutral-200
                "
                                    onClick={() => setedit_profile_open(false)}
                                >
                                    أغلق
                                </button>
                            </div>
                        )}
                        <div className="bg-white p-1 rounded-sm shadow-lg px-5 mt-2 flex flex-col gap-4">
                            {!authContext?.user?.specialty |
                                !authContext?.user?.subscribation_cost ? (
                                <>
                                    <strong>عليك ان تكتب هذه المعلومات الاساسية</strong>
                                    <hr />
                                </>
                            ) : null}
                            <div className="flex flex-col gap-3">
                                <strong>غير تخصصك</strong>
                                <select
                                    defaultValue={authContext?.user?.specialty}
                                    onChange={(e) => authContext?.setspecialty(e.target.value)}
                                >
                                    <option value={""}>أختر</option>
                                    {utlitsContext?.specialties?.map((e) => (
                                        <option value={e?.id} key={e?.id}>
                                            {e?.name}
                                        </option>
                                    ))}
                                </select>
                                {authContext?.error?.specialty ? (
                                    <small className="error-message">
                                        {authContext?.error?.specialty}
                                    </small>
                                ) : null}
                            </div>
                            <div className="flex flex-col gap-3">
                                <strong>غير سعر اشتراكك الشهري</strong>
                                <input
                                    defaultValue={authContext?.user?.subscribation_cost}
                                    onChange={(e) =>
                                        authContext?.setsubscribation_cost(e.target.value)
                                    }
                                    type="number"
                                />
                                {authContext?.error?.subscribation_cost ? (
                                    <small className="error-message">
                                        {authContext?.error?.subscribation_cost}
                                    </small>
                                ) : null}
                            </div>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    authContext?.editProfile();
                                }}
                                className="bg-sky-400 hover:rounded-2xl w-full"
                            >
                                تم
                            </button>
                        </div>
                    </div>
                </div>
            ) : null}
            <Header />
            {/* ---------------------------- */}
            <br />
            <div className="px-2">
                <div className='w-fit mb-5 ms-auto'>
                    <button
                        onClick={() => {
                            document.cookie = 'email=;'
                            location.pathname = '/'
                        }}
                        className='px-2 hover:bg-transparent hover:text-black hover:px-5 bg-red-400 text-white'>تسجيل الخروج</button>
                </div>
                {/* ---------------------------- */}
                <div className="head container__1000 flex flex-row-reverse px-5 p-3 bg-white justify-between flex-wrap rounded-sm shadow-md">
                    <div>
                        {" "}
                        <button
                            className="bg-black text-white px-5 transition-all hover:text-black hover:bg-transparent"
                            onClick={() => setedit_open(true)}
                        >
                            Edit
                        </button>
                    </div>
                    <div className="flex flex-row gap-3">
                        <div>
                            <Image
                                className="max-w-[100px] max-h-[100px] rounded-full"
                                src={
                                    authContext?.user?.image
                                        ? server + authContext?.user?.image
                                        : "/avatar-.jpg"
                                }
                                width={100}
                                height={100}
                                alt=""
                            />
                        </div>
                        <div className="my-auto">
                            <h3 className="text-2xl font-bold">
                                {authContext?.user?.user_details?.username}
                            </h3>
                            <small>
                                {authContext?.user?.bio ? authContext?.user?.bio : "لا يوجد وصف"}
                            </small>
                        </div>
                    </div>
                </div>
                {/* ---------------------------- */}
                <br />
                {/* ---------------------------- */}
                {
                    authContext?.user?.user_details?.is_teacher ? (
                        <>
                            {
                                courseContext?.teacherCourses?.length == 0 ? (
                                    <>
                                        <div className="container__700 text-center flex flex-col gap-2">
                                            <h1 className="text-2xl text-center">ليس لديك اي كورسات حاليا</h1>
                                            <Link href={'/create_course'}>
                                                <button className="p-1 hover:px-2">انشئ كورس</button>
                                            </Link>
                                        </div>
                                        <br />
                                    </>
                                ) : (
                                    <>
                                        <div className='courses w-[95%] md:w-[75%] mx-auto flex flex-col gap-3 bg-white px-5 p-3 justify-between flex-wrap rounded-sm shadow-md'>
                                            <div className='mb-3 flex flex-row justify-between'>
                                                <strong className='my-auto'>اخر الكورسات</strong>
                                                <Link href={`/profile/all_courses`}>
                                                    <button className='bg-black text-white transition-all
                    hover:text-neutral-950 hover:bg-white hover:px-5 px-2
                    '>جميع الكورسات</button>
                                                </Link>
                                            </div>
                                            <div className='courses flex flex-col gap-5'>
                                                {
                                                    courseContext?.teacherCourses?.slice(0, 3).map((e) => (
                                                        <div key={e?.id}>
                                                            <CourseComponent setdelete_open={setdelete_open} setdelete_id={setdelete_id} e={e} />
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                        <br />
                                    </>
                                )
                            }

                            <div className='details w-[95%] md:w-[75%] mx-auto flex flex-col gap-3 bg-white px-5 p-3 justify-between flex-wrap rounded-sm shadow-md'>
                                <div className='flex flex-row-reverse justify-between'>
                                    <strong>معلومات اساسية عنك</strong>
                                    <button onClick={() => setedit_profile_open(true)} className='px-2 hover:px-5 bg-indigo-400'>تعديل</button>
                                </div>
                                <hr />
                                <ul className='flex flex-col gap-4'>
                                    <li className="text-lg">• التخصص: {authContext?.user?.specialty_name?.name}</li>
                                    <li className="text-lg">•سعر الاشتراك الشهري: <strong className='text-green-600'>EGP {authContext?.user?.subscribation_cost}</strong></li>
                                </ul>
                            </div>
                        </>
                    ) : (
                        // student
                        <div>
                            {
                                enrollmentContext?.enrollments?.length == 0 ? (
                                    <div className="container__700 flex flex-col gap-2 text-center">
                                        <h1 className="text-lg">انت لم تشترك في كورسات مؤخرا</h1>
                                        <Link href={'/search'}>
                                            <button className="p-1 hover:px-2 bg-sky-200 text-sm mx-auto">ابحث عن كورس مناسب</button>
                                        </Link>
                                    </div>
                                ) : (
                                    <div className='all_enrollments text-end container__1000 flex flex-col gap-3'>
                                        <div className='flex flex-row justify-between my-auto'>
                                            <strong className='my-auto'>أخر الكورسات التي تم شرائها</strong>
                                            <button className='bg-rose-700 text-white hover:px-3 p-1 my-auto'>
                                                <Link href={'/enrollments'}>
                                                    جميع الكورسات
                                                </Link>
                                            </button>
                                        </div>
                                        <hr />
                                        {
                                            enrollmentContext?.enrollments?.slice(0, 3).map((e) => (
                                                <div key={e?.id}>
                                                    <EnrollmentComponent e={e} />
                                                </div>
                                            ))
                                        }
                                    </div>
                                )
                            }
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default page;

// authContext?.user?.user_details?.is_teacher ? (
//     <div>
//         {
//             edit_open ?
//                 <div className='edit_profile bg-neutral-300 w-[100%] h-[100%] text-end absolute bg-opacity-50'>
//                     <div className='absolute top-[50%] translate-y-[-50%] right-[50%] translate-x-[50%] w-[90%] md:w-[500px]'>
//                         <div>
//                             <button className='
//                 px-5 bg-rose-700 py-1 text-white transition-all
//                 hover:text-neutral-800 hover:bg-neutral-200
//                 '
//                                 onClick={() => setedit_open(false)}
//                             >أغلق</button>
//                         </div>
//                         <div className='bg-white p-1 rounded-sm shadow-lg px-5 mt-2'>
//                             <strong>عدل علي صفحتك</strong>
//                             <hr className='my-2' />
//                             <div className='flex flex-col gap-3'>
//                                 <div className='edit_image flex flex-col gap-1'>
//                                     <div className='w-fit mx-auto'>
//                                         <Image className='w-[100px] h-[100px] rounded-full' alt='' width={100} height={100} src={authContext?.user?.image ? server + authContext?.user?.image : '/avatar-.jpg'} />
//                                     </div>
//                                     <label>غير الصورة</label>
//                                     <input onChange={(e) => authContext?.setimage(e.target.files[0])} type='file' />
//                                 </div>
//                                 <div className='edit_image flex flex-col gap-1'>
//                                     <label>غير وصف الصفحة</label>
//                                     <textarea defaultValue={authContext?.user?.bio} onChange={(e) => authContext?.setbio(e.target.value)} className='h-[150px]' />
//                                 </div>
//                                 <div>
//                                     <button onClick={() => authContext?.editProfile()} className='px-5'>تم</button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div> : null
//         }
//         {
//             delete_open ?
//                 <div className='edit_profile bg-neutral-300 w-[100%] h-[100%] text-center absolute bg-opacity-50'>
//                     <div className='absolute top-[50%] translate-y-[-50%] right-[50%] translate-x-[50%] w-[90%] md:w-[500px]'>
//                         <div className='bg-white p-1 rounded-sm shadow-lg px-5 mt-2'>
//                             <strong>هل انت متأكد ؟</strong>
//                             <hr className='my-2' />
//                             <div className='flex flex-row justify-between'>
//                                 <button onClick={() => setdelete_open(false)} className='px-5 bg-red-400 hover:bg-black'>لا</button>
//                                 <button onClick={() => deleteCourse()} className='px-5 bg-green-400 hover:bg-black'>نعم</button>
//                             </div>
//                         </div>
//                     </div>
//                 </div> : null
//         }
//         {
//             edit_profile_open | !authContext?.user?.specialty | !authContext?.user?.subscribation_cost ?
//                 <div className='edit_profile bg-neutral-300 w-[100%] h-[100%] text-end absolute bg-opacity-50'>
//                     <div className='absolute top-[50%] translate-y-[-50%] right-[50%] translate-x-[50%] w-[90%] md:w-[500px]'>
//                         {
//                             !authContext?.user?.specialty | !authContext?.user?.subscribation_cost ? null : (
//                                 <div>
//                                     <button className='
//                 px-5 bg-rose-700 py-1 text-white transition-all
//                 hover:text-neutral-800 hover:bg-neutral-200
//                 '
//                                         onClick={() => setedit_profile_open(false)}
//                                     >أغلق</button>
//                                 </div>
//                             )
//                         }
//                         <div className='bg-white p-1 rounded-sm shadow-lg px-5 mt-2 flex flex-col gap-4'>
//                             {
//                                 !authContext?.user?.specialty | !authContext?.user?.subscribation_cost ?
//                                     (
//                                         <>
//                                             <strong>عليك ان تكتب هذه المعلومات الاساسية</strong>
//                                             <hr />
//                                         </>
//                                     ) : null
//                             }
//                             <div className='flex flex-col gap-3'>
//                                 <strong>غير تخصصك</strong>
//                                 <select defaultValue={authContext?.user?.specialty} onChange={(e) => authContext?.setspecialty(e.target.value)}>
//                                     <option value={''}>أختر</option>
//                                     {
//                                         utlitsContext?.specialties?.map((e) => (
//                                             <option value={e?.id} key={e?.id}>{e?.name}</option>
//                                         ))
//                                     }
//                                 </select>
//                                 {
//                                     authContext?.error?.specialty ? <small className='error-message'>{authContext?.error?.specialty}</small> : null
//                                 }
//                             </div>
//                             <div className='flex flex-col gap-3'>
//                                 <strong>غير سعر اشتراكك الشهري</strong>
//                                 <input defaultValue={authContext?.user?.subscribation_cost} onChange={(e) => authContext?.setsubscribation_cost(e.target.value)} type='number' />
//                                 {
//                                     authContext?.error?.subscribation_cost ? <small className='error-message'>{authContext?.error?.subscribation_cost}</small> : null
//                                 }
//                             </div>
//                             <button onClick={(e) => {
//                                 e.preventDefault()
//                                 authContext?.editProfile()
//                             }} className='bg-sky-400 hover:rounded-2xl w-full'>تم</button>
//                         </div>
//                     </div>
//                 </div> : null
//         }
//         <Header />
//         <div className='mt-5 text-end w-[96%] mx-auto'>
//             <div className='w-fit me-auto'>
//                 <button
//                 onClick={() => {
//                     document.cookie = 'email=;'
//                     location.pathname = '/'
//                 }}
//                 className='px-2 hover:bg-transparent hover:text-black hover:px-5 bg-red-400 text-white'>تسجيل الخروج</button>
//             </div>
//             <br />
//             <div className='head flex flex-row px-5 p-3 bg-white justify-between flex-wrap rounded-sm shadow-md'>
//                 <div>
//                     <button className='
//             bg-black text-white px-5 transition-all
//             hover:text-black hover:bg-transparent
//             '
//                         onClick={() => setedit_open(true)}
//                     >Edit</button>
//                 </div>
//                 <div className='flex flex-row-reverse gap-3'>
//                     <div>
//                         <Image className='w-[100px] h-[100px] rounded-full' src={authContext?.user?.image ? server + authContext?.user?.image : '/avatar-.jpg'} width={100} height={100} alt='' />
//                     </div>
//                     <div className='my-auto'>
//                         <h3 className='text-2xl font-bold'>{authContext?.user?.user_details?.username}</h3>
//                         <small>{authContext?.user?.bio ? authContext?.user?.bio : 'لا يوجد وصف'}</small>
//                     </div>
//                 </div>
//             </div>
//             <br />
//             {
//                 courseContext?.teacherCourses?.length == 0 ? null : (
//                     <div className='courses w-[95%] md:w-[75%] mx-auto flex flex-col gap-3 text-end bg-white px-5 p-3 justify-between flex-wrap rounded-sm shadow-md'>
//                         <div className='mb-3 flex flex-row-reverse justify-between'>
//                             <strong className='my-auto'>اخر الكورسات</strong>
//                             <Link href={`/profile/all_courses`}>
//                                 <button className='bg-black text-white transition-all
//                 hover:text-neutral-950 hover:bg-white hover:px-5 px-2
//                 '>جميع الكورسات</button>
//                             </Link>
//                         </div>
//                         <div className='courses flex flex-col gap-5'>
//                             {
//                                 courseContext?.teacherCourses?.slice(0, 3).map((e) => (
//                                     <div key={e?.id}>
//                                         <CourseComponent setdelete_open={setdelete_open} setdelete_id={setdelete_id} e={e} />
//                                     </div>
//                                 ))
//                             }
//                         </div>
//                     </div>
//                 )
//             }

//             <br />
//             <div className='details w-[95%] md:w-[75%] mx-auto flex flex-col gap-3 text-end bg-white px-5 p-3 justify-between flex-wrap rounded-sm shadow-md'>
//                 <div className='flex flex-row-reverse justify-between'>
//                     <strong>معلومات اساسية عنك</strong>
//                     <button onClick={() => setedit_profile_open(true)} className='px-2 hover:px-5 bg-indigo-400'>تعديل</button>
//                 </div>
//                 <hr />
//                 <ul className='flex flex-col gap-4'>
//                     <li>التخصص: {authContext?.user?.specialty_name?.name} •</li>
//                     <li><strong className='text-green-600'>EGP {authContext?.user?.subscribation_cost}</strong>  :سعر الاشتراك الشهري •</li>
//                 </ul>
//             </div>
//         </div>
//     </div>
// ) : (
//     <div>
//         {
//             edit_open ?
//                 <div className='edit_profile bg-neutral-300 w-[100%] h-[100%] text-end absolute bg-opacity-50'>
//                     <div className='absolute top-[50%] translate-y-[-50%] right-[50%] translate-x-[50%] w-[90%] md:w-[500px]'>
//                         <div>
//                             <button className='
//                 px-5 bg-rose-700 py-1 text-white transition-all
//                 hover:text-neutral-800 hover:bg-neutral-200
//                 '
//                                 onClick={() => setedit_open(false)}
//                             >أغلق</button>
//                         </div>
//                         <div className='bg-white p-1 rounded-sm shadow-lg px-5 mt-2'>
//                             <strong>عدل علي صفحتك</strong>
//                             <hr className='my-2' />
//                             <div className='flex flex-col gap-3'>
//                                 <div className='edit_image flex flex-col gap-1'>
//                                     <div className='w-fit mx-auto'>
//                                         <Image className='w-[100px] h-[100px] rounded-full' alt='' width={100} height={100} src={authContext?.user?.image ? server + authContext?.user?.image : '/avatar-.jpg'} />
//                                     </div>
//                                     <label>غير الصورة</label>
//                                     <input onChange={(e) => authContext?.setimage(e.target.files[0])} type='file' />
//                                 </div>
//                                 <div className='edit_image flex flex-col gap-1'>
//                                     <label>غير وصف الصفحة</label>
//                                     <textarea defaultValue={authContext?.user?.bio} onChange={(e) => authContext?.setbio(e.target.value)} className='h-[150px]' />
//                                 </div>
//                                 <div>
//                                     <button onClick={() => authContext?.editProfile()} className='px-5'>تم</button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div> : null
//         }
//         {
//             delete_open ?
//                 <div className='edit_profile bg-neutral-300 w-[100%] h-[100%] text-center absolute bg-opacity-50'>
//                     <div className='absolute top-[50%] translate-y-[-50%] right-[50%] translate-x-[50%] w-[90%] md:w-[500px]'>
//                         <div className='bg-white p-1 rounded-sm shadow-lg px-5 mt-2'>
//                             <strong>هل انت متأكد ؟</strong>
//                             <hr className='my-2' />
//                             <div className='flex flex-row justify-between'>
//                                 <button onClick={() => setdelete_open(false)} className='px-5 bg-red-400 hover:bg-black'>لا</button>
//                                 <button onClick={() => deleteCourse()} className='px-5 bg-green-400 hover:bg-black'>نعم</button>
//                             </div>
//                         </div>
//                     </div>
//                 </div> : null
//         }
//         <Header />
//         <br />
//         <div className='px-3'>
//         <div className='w-fit me-auto'>
//                 <button
//                 onClick={() => {
//                     document.cookie = 'email=;'
//                     location.pathname = '/'
//                 }}
//                 className='px-2 hover:bg-transparent hover:text-black hover:px-5 bg-red-400 text-white'>تسجيل الخروج</button>
//             </div>
//             <br />

//             <div className='head flex flex-row px-5 p-3 bg-white justify-between flex-wrap rounded-sm shadow-md'>
//                 <div>
//                     <button className='
//             bg-black text-white px-5 transition-all
//             hover:text-black hover:bg-transparent
//             '
//                         onClick={() => setedit_open(true)}
//                     >Edit</button>
//                 </div>
//                 <div className='flex flex-row-reverse gap-3'>
//                     <div>
//                         <Image className='w-[100px] h-[100px] rounded-full' src={authContext?.user?.image ? server + authContext?.user?.image : '/avatar-.jpg'} width={100} height={100} alt='' />
//                     </div>
//                     <div className='my-auto'>
//                         <h3 className='text-2xl font-bold'>{authContext?.user?.user_details?.username}</h3>
//                         <small>{authContext?.user?.bio ? authContext?.user?.bio : 'لا يوجد وصف'}</small>
//                     </div>
//                 </div>
//             </div>

//             <br />

//             {
//                 enrollmentContext?.enrollments?.length == 0 ? null : (
//                     <div className='all_enrollments text-end container__1000 flex flex-col gap-3'>
//                         <div className='flex flex-row-reverse justify-between my-auto'>
//                             <strong className='my-auto'>أخر الكورسات التي تم شرائها</strong>
//                             <button className='bg-rose-700 text-white hover:px-3 p-1 my-auto'>
//                                 <Link href={'/enrollments'}>
//                                     جميع الكورسات
//                                 </Link>
//                             </button>
//                         </div>
//                         <hr />
//                         {
//                             enrollmentContext?.enrollments?.slice(0, 3).map((e) => (
//                                 <div key={e?.id}>
//                                     <EnrollmentComponent e={e} />
//                                 </div>
//                             ))
//                         }
//                     </div>
//                 )
//             }

//         </div>
//     </div>
// )



