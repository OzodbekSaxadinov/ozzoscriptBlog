
import { Button } from "@headlessui/react"
import { TrashIcon, UserCircleIcon } from "@heroicons/react/24/solid"
import Image from "next/image"

const Comment = ({ comment, userInfo, handleAddComment, error, handleDeleteComment, isUser, newComment, setNewComment }) => {
    return (
        <div className="border-t pt-6 mt-8">
            <p className="text-xl md:text-2xl font-semibold text-sky-800 mb-4">Sharhlar</p>
            <div className="space-y-4">
                {comment.map((p) => (
                    <div key={p.user} className="bg-white/70 backdrop-blur-md border border-blue-100 flex gap-4 p-4 rounded-lg">
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                            {p.img ? (
                                <Image src={p.img} width={40} height={40} alt={p.name} className="object-cover" />
                            ) : (
                                <UserCircleIcon className="w-full h-full text-gray-300" />
                            )}
                        </div>
                        <div>
                            <h2 className="font-semibold text-sky-700">{p.name}</h2>
                            <p className="text-gray-800 mt-2">{p.text}</p>
                            {p.user === userInfo.uid && (
                                <button
                                    className="mt-2 flex items-center gap-1 text-red-600 hover:text-red-800"
                                    onClick={() => handleDeleteComment(p)}
                                >
                                    <TrashIcon className="w-4 h-4" /> delete
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {isUser && (
                <div className="mt-6 space-y-4">
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Sharh yozing..."
                        className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 resize-none"
                    />
                    {error && <p className="my-5 text-sm text-red-500">Sharhni kiriting</p>}
                    <Button
                        onClick={handleAddComment}
                        className="bg-sky-600 hover:bg-sky-500 text-white font-medium py-2 px-6 rounded-lg"
                    >
                        Send
                    </Button>
                </div>
            )}
        </div>
                       
    )
}
export default Comment