import { db } from "./tools/firebase.config";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import Hero from "./ui/Hero";
import Blog from "./ui/Blog";
import Footer from "./ui/Footer";
import { FaArrowRight, FaFileCode } from "react-icons/fa6";
import {IoDocumentTextOutline} from "react-icons/io5"
import Link from "next/link";
async function getItems() {
  const itemsCollection = collection(db, "blog");

  // Yangiliklarni sanasi bo'yicha kamayish tartibida saralash va faqat oxirgi oltita postni olish
  const itemsQuery = query(itemsCollection, orderBy("date", "desc"), limit(6));
  const itemsSnapshot = await getDocs(itemsQuery);

  const itemsList = itemsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return itemsList;
}

export default async function Home() {
  const items = await getItems()

  return (
    <>
      <div className="w-full pt-36 min-h-screen flex flex-col items-center ">
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

        
        <h1 className="md:text-3xl text-2xl text-slate-500 mt-56 mb-16 text-center md:flex items-center hidden gap-2">
          <FaFileCode className="text-yellow-500 md:block hidden" /> Dasturlash tillari va texnologiyalar
        </h1>

        <div className="md:flex hidden flex-wrap gap-6 justify-center px-4">
         
        </div>
      </div>
      <Footer />
    </>
  );
}
