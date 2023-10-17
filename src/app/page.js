'use client'
import Header from "@/components/Header";
import Image from "next/image";
import { useEffect } from "react";

const page = () => {
  return (
    <div>
      <Header />
      <br />
      {/* ------------------------------------------------------------ */}
      <div className="home_head 
      flex flex-row justify-around flex-wrap rounded-xl shadow-md
      bg-cover bg-[url(/head_bg.png)] h-[90vh] bg-no-repeat">
        <div className="flex flex-col justify-center">
          <Image className="" alt="" width={500} height={500} src={'/head_vector.png'} />
        </div>
        <div className="  flex flex-col gap-3 justify-center">
          <h1 className="text-neutral-800">غير طريقة التعليم <span className="text-rose-800">القديمة</span> <br /> لتتقدم اسرع بالطرق <span className="text-green-800">الجديدة</span></h1>
          <p className="text-lg">منصة كوكي ليرنينج - منصة تعليمية</p>
          <button className="p-1 px-3   border border-blue-400 bg-transparent hover:bg-blue-400">اعرف المزيد</button>
        </div>
      </div>
      {/* ------------------------------------------------------------ */}
      <br />
      {/* ------------------------------------------------------------ */}
      <div className="bg-cover rounded-2xl shadow-xl bg-[url(/info_bg.png)] h-[100%] bg-no-repeat justify-around flex flex-row flex-wrap">
        <div className="flex flex-col justify-center">
          <Image className="" alt="" width={500} height={500} src={'/vector_info.png'} />
        </div>
        <div className="my-auto  ">
          <h3 className="text-3xl mb-2 text-neutral-800">المميزات التي نقدمها <span className="text-sky-700">للطالب</span>:</h3>
          <ul className="mb-3">
            <li className="text-base text-neutral-800">- احضر الدروس بدون مغادرة المنزل</li>
            <li className="text-base text-neutral-800">- وفر وقتك ومالك من المواصلات</li>
            <li className="text-base text-neutral-800">- اسأل المدرس مباشرة واحضر البث المباشر</li>
            <li className="text-base text-neutral-800">- ميزات اكثر...</li>
          </ul>
          <button className="p-1 px-3   border mb-2 border-blue-400 bg-transparent hover:bg-blue-400">دليل الطلاب</button>
        </div>
      </div>
      {/* ------------------------------------------------------------ */}
      <br />
      {/* ------------------------------------------------------------ */}
      <div className="bg-[url(/teacher_info_bg.png)] shadow-xl bg-no-repeat h-[100%] bg-cover rounded-xl
      flex flex-wrap flex-row-reverse gap-4 justify-around
      ">
        <div className="my-auto">
          <Image src='/teacher_info.png' className="" alt="" width={500} height={500} />
        </div>
        <div className="my-auto  ">
          <h3 className="text-3xl mb-2 text-neutral-800">المميزات التي نقدمها <span className="text-red-700">للمعلم</span>:</h3>
          <ul className="mb-3">
            <li className="text-base text-neutral-800">- الطلاب الجدد سيتعرفون عليك بسهولة</li>
            <li className="text-base text-neutral-800">- ستوفر نسبة السنتر والانتقالات من سنتر لأخر</li>
            <li className="text-base text-neutral-800">- ستقوم بشرح الدرس مره واحدة</li>
            <li className="text-base text-neutral-800">- اختبر الطلاب عن طريق امتحانات تلقائية التصحيح او علي بث مباشر</li>
          </ul>
          <button className="p-1 px-3   border mb-2 border-blue-400 bg-transparent hover:bg-blue-400">فديو توضيحي</button>
        </div>
      </div>
      {/* ------------------------------------------------------------ */}
      <br />
      {/* ------------------------------------------------------------ */}
      <div className="bg-[url(/about_us_bg.png)] shadow-xl bg-no-repeat h-[100%] bg-cover rounded-xl justify-center flex flex-col">
        <div className="my-auto mx-auto">
          <Image src='/about_us.png' className="" alt="" width={500} height={500} />
        </div>
        <div className="w-[100%] text-center flex flex-col gap-3">
          <h3>من نحن ؟</h3>
          <hr />
          <div>
            <p className="text-lg">منصة cookiy - learning هي تابعة لشركة cookiy وهي شركة تطوير المواقع الالكترونية والتطبيقات</p>
          </div>
        </div>
      </div>
      {/* ------------------------------------------------------------ */}
      <br />
      {/* ------------------------------------------------------------ */}
      <div className="contact_us flex flex-row-reverse gap-3 ps-5 bg-white">
        <div className="bg-black w-[40%] rounded-e-2xl hidden md:flex">.</div>
        <div className="contact w-[100%] md:w-[60%] flex flex-col gap-3">
          <h3 className="text-2xl md:text-4xl">تواصل معنا للاستفسار او المشاكل</h3>
          <hr />
          <div className="info flex flex-col gap-4">
            <div className="flex flex-row flex-wrap gap-2">
              <p>العنوان:</p>
              <p>القاهرة - مدينة الشروق - شارع القسم</p>
            </div>
            <div className="flex flex-row flex-wrap gap-2">
              <p>رقم الهاتف:</p>
              <p style={{direction:"ltr"}}>+20 109 575 3871</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
