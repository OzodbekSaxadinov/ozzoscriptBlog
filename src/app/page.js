
import Hero from "./ui/Hero";

import Footer from "./ui/Footer";

import {
  SiExpress,
  SiFirebase,
  SiMongodb,
  SiNextdotjs,
  SiReact,
  SiRedux,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { FaFileCode, FaJs, FaNodeJs } from "react-icons/fa";

export default async function Home() {

  return (
    <>
      <div className="w-full pt-36 min-h-screen flex flex-col items-center ">
        <Hero />
        <h1 className="md:text-3xl text-2xl text-slate-500 mt-56 mb-16 text-center md:flex items-center hidden gap-2">
          <FaFileCode className="text-yellow-500 md:block hidden" /> Dasturlash tillari va texnologiyalar
        </h1>

        <div className="md:flex hidden flex-wrap gap-6 justify-center px-4">
        <div className="border w-[150px] md:w-[200px] text-lg md:text-2xl flex justify-center p-2 rounded-md items-center gap-2 transition-transform transform hover:scale-105 hover:bg-blue-100">
            <SiReact /> React
          </div>
          <div className="border w-[150px] md:w-[200px] text-lg md:text-2xl flex justify-center p-2 rounded-md items-center gap-2 transition-transform transform hover:scale-105 hover:bg-green-100">
            <FaNodeJs /> Node
          </div>
          <div className="border w-[150px] md:w-[200px] text-lg md:text-2xl flex justify-center p-2 rounded-md items-center gap-2 transition-transform transform hover:scale-105 hover:bg-yellow-100">
            <FaJs /> Javascript
          </div>
          <div className="border w-[150px] md:w-[200px] text-lg md:text-2xl flex justify-center p-2 rounded-md items-center gap-2 transition-transform transform hover:scale-105 hover:bg-blue-200">
            <SiTypescript /> Typescript
          </div>
          <div className="border w-[150px] md:w-[200px] text-lg md:text-2xl flex justify-center p-2 rounded-md items-center gap-2 transition-transform transform hover:scale-105 hover:bg-orange-100">
            <SiFirebase /> Firebase
          </div>
          <div className="border w-[150px] md:w-[200px] text-lg md:text-2xl flex justify-center p-2 rounded-md items-center gap-2 transition-transform transform hover:scale-105 hover:bg-gray-100">
            <SiExpress /> Express
          </div>
          <div className="border w-[150px] md:w-[200px] text-lg md:text-2xl flex justify-center p-2 rounded-md items-center gap-2 transition-transform transform hover:scale-105 hover:bg-purple-100">
            <SiRedux /> Redux
          </div>
          <div className="border w-[150px] md:w-[200px] text-lg md:text-2xl flex justify-center p-2 rounded-md items-center gap-2 transition-transform transform hover:scale-105 hover:bg-indigo-100">
            <SiNextdotjs /> Next
          </div>
          <div className="border w-[150px] md:w-[200px] text-lg md:text-2xl flex justify-center p-2 rounded-md items-center gap-2 transition-transform transform hover:scale-105 hover:bg-teal-100">
            <SiTailwindcss /> Tailwind
          </div>
          <div className="border w-[150px] md:w-[200px] text-lg md:text-2xl flex justify-center p-2 rounded-md items-center gap-2 transition-transform transform hover:scale-105 hover:bg-red-100">
            <SiMongodb /> Mongodb
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
