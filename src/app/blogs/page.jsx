"use client";

import { useEffect, useState } from "react";
import Blog from "../ui/Blog";
import Search from "../ui/Search";
import { db } from "../tools/firebase.config";
import { collection, getDocs } from "firebase/firestore";
import Footer from "../ui/Footer";

async function getItems() {
  const itemsCollection = collection(db, "blog");
  const itemsSnapshot = await getDocs(itemsCollection);
  const itemsList = itemsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return itemsList;
}

export default function Home() {
  const [blogs, setBlogs] = useState([]) 
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      const fetchedItems = await getItems();
      setBlogs(fetchedItems); 
      setLoading(false);
    };
    fetchItems();
  }, []); 

  const filteredItems = blogs.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.hash.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full">
      <div className="w-full min-h-screen pt-36 flex flex-col justify-center items-center">
        <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <div className="w-full grid md:grid-cols-12 grid-col-1 gap-6 md:px-20 px-4 justify-items-center">
          {loading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="w-full md:col-span-6 lg:col-span-4 md:w-3/4 lg:w-full p-4 bg-white/80 backdrop-blur-md rounded-md border shadow-md">
                <div className="relative h-72 bg-gray-300 animate-pulse rounded-md mb-4"></div>
                <div className="h-4 bg-gray-300 rounded-md w-3/4 mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded-md w-1/2 mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded-md w-1/3 mb-2 animate-pulse"></div>
              </div>
            ))
          ) : (
            filteredItems.map(item => (
              <Blog key={item.id} id={item.id} url={item.url} title={item.title} hash={item.hash} time={item.date} />
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
