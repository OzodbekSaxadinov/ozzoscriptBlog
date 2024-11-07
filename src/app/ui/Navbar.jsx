'use client'
import { Button } from "@headlessui/react"
import { CommandLineIcon, UserCircleIcon } from "@heroicons/react/24/solid"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import AuthState from "../tools/state";
import { FaGithub } from "react-icons/fa6";
import { signOut } from 'firebase/auth';
import { auth } from "../tools/firebase.config"
const Navbar = () => {
    const [userData, setUserData] = useState(null)
    const [openAccount, setOpenAccount] = useState(false);
    const authState = AuthState((state) => state.isAuth)
    const authSuccess = AuthState((state) => state.authSuccess)
    const authFailure = AuthState((state) => state.authFailure)
    const userSuccess = AuthState((state) => state.userSuccess)
    const menuRef = useRef(null);
    const handleLogout = async () => {
        try {
            await signOut(auth);
            localStorage.removeItem("user")
            await authFailure()
            console.log('Foydalanuvchi hisobdan chiqarildi');
            setOpenAccount(false)
            setUserData(null)
        } catch (error) {
            console.error('Logout xatosi:', error.message);
            await authSuccess()
        }
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpenAccount(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    useEffect(() => {
        const data = localStorage.getItem("user");
        setUserData(JSON.parse(data))
        userSuccess()
    }, [authState])
    return (
        <div className="w-full fixed top-0 md:px-20 px-2 left-0 h-20 flex justify-between items-center bg-white/70 backdrop-blur-md z-10 ">
            <Link href="/" className="flex h-full cursor-pointer md:text-3xl text-2xl md:gap-4 gap-1 items-center justify-center"><CommandLineIcon className="md:size-10 size-8 text-blue-500" />ozzoscript</Link>
            <div className="h-full flex items-center">
                <Link className="mx-5 text-[18px] text-slate-500 hover:text-blue-500" href="/blogs">Maqolalar</Link>
                <a href="https://github.com/OzodbekSaxadinov"><FaGithub className="text-2xl md:block hidden text-slate-800 cursor-pointer hover:text-slate-600" /></a>
                <span className="h-6 md:block hidden mx-5 rounded-md w-[1px] bg-blue-500">

                </span>

                {userData == null && (<Link href="/login"><Button className="rounded flex items-end gap-2 bg-sky-600 py-2 px-4 text-sm text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700">
                    Kirish <UserCircleIcon className="size-6 md:block hidden" />
                </Button></Link>)}
                {
                    userData != null && (
                        <div className="flex relative items-center gap-2">
                            {(userData.img == null) ? <UserCircleIcon onClick={() => setOpenAccount((p) => !p)} className="size-8" />
                                : <div onClick={() => setOpenAccount((p) => !p)} className="w-10 h-10 rounded-full relative overflow-hidden ">
                                    <Image priority={false} src={userData.img} fill className="" alt='sadsa' />
                                </div>}
                            {openAccount && <div
                                ref={menuRef}
                                className="fixed top-24 right-10 w-64 h-64 flex flex-col items-center border border-gray-200 rounded-lg bg-white/90 shadow-lg backdrop-blur-md p-6 transition-transform duration-300 transform-gpu scale-95 hover:scale-100"
                            >
                                <p className="text-2xl font-semibold text-gray-700 text-center my-4">{userData.name}</p>
                                <p className="text-sm text-gray-500 text-center my-2">{userData.email}</p>
                                <Button
                                    onClick={handleLogout}
                                    className="mt-auto rounded-md bg-sky-600 py-2 px-5 text-sm font-medium text-white hover:bg-sky-500 active:bg-sky-700 focus:ring-2 focus:ring-sky-500 focus:outline-none transition-all duration-200 ease-in-out"
                                >
                                    Log Out
                                </Button>
                            </div>
                            }
                        </div>

                    )
                }

            </div>
        </div>
    )
}
export default Navbar 