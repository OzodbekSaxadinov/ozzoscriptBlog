import {MagnifyingGlassIcon} from "@heroicons/react/24/solid"
const Search = ({ searchQuery, setSearchQuery })=>{
    return(
        <div className="flex  justify-between   items-center gap-3 px-4 text-xl w-[350px] p-2 bg-white my-10 mb-20 border rounded-md">
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className=" outline-none text-[18px]" placeholder="search..."/>
            <MagnifyingGlassIcon className="size-5"/>
        </div>
    )
}
export default Search