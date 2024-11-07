
import Image  from "next/image"
import {NewspaperIcon} from "@heroicons/react/24/solid"
import Link from "next/link"
const Blog = ({url,title, hash, id,time}) => {
    return (
        <div className=" w-[90%] ml-[5%] md:ml-0 md:col-span-6 mx-auto lg:col-span-4  md:w-full p-4 bg-white/80 backdrop-blur-md rounded-md border shadow-md">
            <div className="relative  h-56"> 
                <Image
                    src={url}
                    alt="rasm"
                    loading="lazy"
                    layout="fill" 
                    objectFit="cover" 
                    className="rounded-md hover:opacity-80 transition-all filter saturate-150"
                />
            </div>
            <div>
                <p className="text-xl my-2">{title}</p>
                <div className="flex justify-between items-center">
                   <p className="text-blue-500">#{hash}</p>
                   <Link href={`/blogs/${id}`} className="rounded text-xl flex items-center gap-2 bg-sky-600 py-2 px-4 text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700">
                       O'qish
                       <NewspaperIcon className="size-5"/>
                    </Link>
                </div>
                <p className="text-slate-500 ">{time}</p>
            </div>
        </div>
    )
}
export default Blog