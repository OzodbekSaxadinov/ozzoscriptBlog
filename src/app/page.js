
import Blog from "./ui/Blog";
import { db } from "./tools/firebase.config";
import { collection, getDocs } from "firebase/firestore";
import Hero from "./ui/Hero";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaArrowRight, FaJs, FaNodeJs, FaReact } from "react-icons/fa6";
import { FaFileCode } from "react-icons/fa";
import {
  SiExpress,
  SiFirebase,
  SiMongodb,
  SiNextdotjs,
  SiRedux,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import Link from "next/link";
import Footer from "./ui/Footer";
 
export const metadata = {
  title: "ozzoscript | bosh sahifa",
  description: "next-15 react-router-dom redux tailwind html javascript, typescript, react, next, css",
};
async function getItems() {
  const itemsCollection = collection(db, "blog");
  const itemsSnapshot = await getDocs(itemsCollection);
  const itemsList = itemsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return itemsList.slice(-6);
}

export default async function Home() {
  const items = await getItems();

  return (
    <>
      <div className="w-full pt-36 flex flex-col items-center justify-center">
        <Hero />
        <h1 className="md:text-3xl text-2xl text-slate-500 my-10 mb-16 flex items-center gap-2 text-center">
          <IoDocumentTextOutline className="text-orange-500" /> Yangi maqolalar
        </h1>

        <div className="w-full grid md:grid-cols-12 grid-cols-1 gap-6 md:gap-10 md:px-20 px-4">
          {items.map((item) => (
            <Blog
              key={item.id}
              id={item.id}
              url={item.url}
              title={item.title}
              hash={item.hash}
              time={item.date}
            />
          ))}
        </div>

        <div className="my-10">
          <Link
            href="/blogs"
            className="text-xl my-20 rounded-md p-2 text-white bg-sky-600 border hover:shadow-lg backdrop-blur-md shadow-md flex items-center gap-3 hover:gap-4 transition-all"
          >
            Ko'proq maqolalar
            <FaArrowRight />
          </Link>
        </div>

        <h1 className="md:text-3xl text-2xl text-slate-500   mt-56 mb-16 text-center md:flex items-center hidden gap-2">
          <FaFileCode className="text-yellow-500 md:block hidden" /> Dasturlash tillari va texnologiyalar
        </h1>

        <div className="md:flex hidden flex-wrap gap-6 justify-center px-4">
          <div className="border w-[150px] md:w-[200px] text-lg md:text-2xl flex justify-center p-2 rounded-md items-center gap-2 transition-transform transform hover:scale-105 hover:bg-blue-100">
            <FaReact /> React
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
