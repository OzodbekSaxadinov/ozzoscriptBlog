import Link from 'next/link';
import React from 'react';
import { FaArrowRight, FaCode,  FaCss3, FaJs, FaNodeJs, FaReact } from 'react-icons/fa';

const Hero = () => {
  return (
    <section className="w-full mt-10 mb-32 lg:px-16 md:px-10 flex flex-col md:flex-row justify-between gap-10 items-center px-4 py-20">
      <div className='flex flex-col items-center text-center md:items-start md:text-left'>
        <h1 className='text-3xl md:text-4xl text-cyan-500 font-semibold'>
          Dasturlash Olamiga Xush Kelibsiz!
        </h1>
        <p className='my-5 p-2 text-slate-500 w-full max-w-md'>
          O‘zbek tilida texnologiya, dasturlash va veb-ishlab chiqish bo‘yicha foydali maqolalar, qo‘llanmalar va yangiliklarni kashf eting! Har bir maqola sizning bilimingizni kengaytirish va rivojlantirish uchun mo‘ljallangan.
        </p>
        <Link href="/blogs" className='border rounded-full  text-xl text-white shadow-md bg-sky-600 p-2 px-4 hover:shadow-lg hover:bg-sky-500 flex items-center transition-all hover:gap-4 gap-3'>Ko'proq maqolalar<FaArrowRight/></Link>
      </div>
      <div className='flex flex-wrap justify-center md:justify-start items-center gap-4 text-5xl md:text-7xl text-cyan-500'>
        <FaReact />
        <FaNodeJs className='text-green-400' />
        <FaJs className='text-yellow-400' />
        <FaCode className='text-slate-600' />
        <FaCss3 className='text-blue-300'/>
      </div>
    </section>
  );
};

export default Hero;
