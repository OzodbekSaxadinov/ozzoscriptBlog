"use client";
import { arrayUnion, doc, getDoc, updateDoc, increment } from "firebase/firestore";
import { db } from "../../tools/firebase.config";
import { useState, useEffect, use } from "react";
import AuthState from "../../tools/state";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { CiCalendarDate } from "react-icons/ci";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";
import Footer from "@/app/ui/Footer";
import Comment from "@/app/ui/comment";

const SkeletonText = ({ width = "100%", height = "1rem" }) => (
    <div className="bg-gray-300 rounded" style={{ width, height }}></div>
);

const SkeletonBlog = () => (
    <div className="w-full max-w-5xl mx-auto mt-20 p-4 md:p-8 lg:p-12 animate-pulse space-y-6">
        <SkeletonText width="60%" height="2.5rem" />
        <SkeletonText width="100%" height="1.5rem" />
        <div className="flex justify-between">
            <SkeletonText width="30%" height="1rem" />
            <SkeletonText width="20%" height="1rem" />
        </div>
        <SkeletonText width="100%" height="5rem" />
        <SkeletonText width="100%" height="2rem" />
    </div>
);



const SingleBlog = ({ params }) => {
    const isUser = AuthState((state) => state.isUser);
    const [userInfo, setUserInfo] = useState({ uid: "", name: "", img: null });
    const [newComment, setNewComment] = useState("");
    const [comment, setComment] = useState([]);
    const { id } = use(params);
    const [singleData, setSingleData] = useState({});
    const [sanitizedContent, setSanitizedContent] = useState("");
    const [pageLoading, setPageLoading] = useState(false);
    const [error, setError] = useState(false)
    useEffect(() => {
        async function getSingleData(url) {
            const docRef = doc(db, "blog", url);
            const docSnap = await getDoc(docRef);

            const userData = JSON.parse(localStorage.getItem("user"));
            setUserInfo(userData || { uid: "", name: "", img: null });

            if (docSnap.exists()) {
                const data = { id: docSnap.id, ...docSnap.data() };
                setSingleData(data);
                setComment(data.comment || []);
                const DOMPurify = (await import("dompurify")).default;
                setSanitizedContent(DOMPurify.sanitize(data.content));
                await updateDoc(docRef, { view: increment(1)});
                setPageLoading(true);
            } else {
                console.error("Document does not exist.");
                setPageLoading(false);
            }
        }

        if (id) getSingleData(id);
    }, [id]);

    const handleAddComment = async () => {
        if (!userInfo || !userInfo.uid) {
            alert("Foydalanuvchi ma'lumoti mavjud emas.");
            setNewComment(" ")
            return;
        }

        const commentObj = {
            text: newComment,
            name: userInfo.name,
            img: userInfo.img,
            user: userInfo.uid,
            createdAt: new Date()
        };
        if (newComment !== "") {
            const blogRef = doc(db, "blog", id);
            await updateDoc(blogRef, { comment: arrayUnion(commentObj) });
            setComment((prevComments) => [...prevComments, commentObj]);
            setNewComment("");
            setError(false);
        } else {
            setError(true)
        }
    };

    const handleDeleteComment = async (e) => {
        const updatedComments = comment.filter((c) => c.text !== e.text);
        const blogRef = doc(db, "blog", id);
        await updateDoc(blogRef, { comment: updatedComments });
        setComment(updatedComments);
    };

    return (
        <>
            {!pageLoading ? (
                <div className="flex w-full justify-center items-center h-screen">
                    <SkeletonBlog />
                    
                </div>
            ) : (
                <>
                    <div className="flex w-full mt-20 justify-center">
                        <Link href="/blogs" className="fixed z-10 top-32 2 left-4 md:left-20 bg-sky-600 hover:bg-sky-500 active:bg-sky-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200">
                            <FaArrowLeftLong />
                        </Link>
                        <div className="w-full max-w-5xl mx-auto mt-20 p-4 md:p-8 lg:p-12">
                            <h1 className="text-2xl md:text-4xl font-bold text-center text-sky-700 mb-6">{singleData.title}</h1>
                            <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} className="text-gray-700 text-lg leading-relaxed mb-4 md:mb-8" />
                            <div className="flex justify-between items-center text-gray-500 text-sm md:text-base mb-8">
                                <p className="flex items-center gap-2"><CiCalendarDate /> {singleData.date}</p>
                                <p className="flex items-center gap-2">{singleData.view} <MdOutlineRemoveRedEye /></p>
                            </div>

                            <Comment isUser={isUser} comment={comment} error={error} handleAddComment={handleAddComment} handleDeleteComment={handleDeleteComment} newComment={newComment} setNewComment={setNewComment} userInfo={userInfo}/>
                           
                        </div>
                    </div>
                    <Footer />
                </>
            )}
        </>
    );
};

export default SingleBlog;