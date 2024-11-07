'use client';

import { Button } from "@headlessui/react";
import Link from "next/link";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa6";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useState } from "react";
import { auth, db } from '@/app/tools/firebase.config';
import { useRouter } from "next/navigation";
import AuthState from "@/app/tools/state";

const LoginPage = () => {
    const authSuccess = AuthState((state) => state.authSuccess);
    const authFailure = AuthState((state) => state.authFailure);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [inputErrors, setInputErrors] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const googleProvider = new GoogleAuthProvider();

    const validateInputs = () => {
        let isValid = true;
        const errors = { email: "", password: "" };
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email) {
            errors.email = "Email kiritilishi kerak.";
            isValid = false;
        } else if (!emailPattern.test(email)) {
            errors.email = "Email noto‘g‘ri formatda.";
            isValid = false;
        }

        if (!password) {
            errors.password = "Parol kiritilishi kerak.";
            isValid = false;
        } else if (password.length < 6) {
            errors.password = "Parol kamida 6 ta belgidan iborat bo‘lishi kerak.";
            isValid = false;
        }

        setInputErrors(errors);
        return isValid;
    };

    const handleLogin = async () => {
        setErrorMessage("");
        if (!validateInputs()) return;

        setIsLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const userDoc = await getDoc(doc(db, "users", user.uid));

            if (userDoc.exists()) {
                router.push('/');
            } else {
                setErrorMessage("Foydalanuvchi mavjud emas.");
            }
            await authSuccess();
        } catch (error) {
            console.error(error);
            setErrorMessage("Foydalanuvchi topilmadi yoki parol noto‘g‘ri.");
            await authFailure();
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setErrorMessage("");
        setIsLoading(true);
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            const userDocRef = doc(db, "users", user.uid);
            const userSnapshot = await getDoc(userDocRef);

            if (!userSnapshot.exists()) {
                await setDoc(userDocRef, {
                    name: user.displayName,
                    email: user.email
                });
            }

            router.push('/');
            await authSuccess();
        } catch (error) {
            console.error(error.message);
            setErrorMessage("Google orqali tizimga kirishda xatolik yuz berdi.");
            await authFailure();
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4 md:p-8">
            <div className="w-96 max-w-xs md:max-w-sm border border-blue-300 p-4 md:p-6 bg-white shadow-lg rounded-lg">
                <h1 className="text-center text-2xl md:text-3xl font-semibold text-sky-700 mb-4">Login</h1>

                {errorMessage && (
                    <div className="text-red-600 text-center text-sm md:text-base mb-4">
                        {errorMessage}
                    </div>
                )}

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm md:text-base font-medium">Email</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="Emailingiz"
                            className="w-full px-3 py-2 text-sm md:text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                        {inputErrors.email && (
                            <p className="mt-1 text-red-500 text-xs md:text-sm">{inputErrors.email}</p>
                        )}
                    </div>
                    <div className="relative">
                        <label className="block text-sm md:text-base font-medium">Parol</label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type={showPassword ? "text" : "password"}
                            placeholder="Parolingiz"
                            className="w-full px-3 py-2 text-sm md:text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                        <div
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-2/4 transform -translate-y-2/4 text-gray-600"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </div>
                        {inputErrors.password && (
                            <p className="mt-1 text-red-500 text-xs md:text-sm">{inputErrors.password}</p>
                        )}
                        <Link href="/forgot-password" className="mt-2 text-sm text-blue-600 hover:text-blue-700">
                            Parolni unutdingizmi?
                        </Link>
                    </div>
                </div>

                <Button
                    onClick={handleLogin}
                    disabled={isLoading}
                    className={`w-full py-2 mt-6 text-sm md:text-base font-semibold text-white bg-sky-600 rounded-md transition duration-200 ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-sky-500 active:bg-sky-700'}`}
                >
                    {isLoading ? "Yuklanmoqda..." : "Kirish"}
                </Button>

                <hr className="my-6 border-gray-300" />

                <Button
                    onClick={handleGoogleLogin}
                    disabled={isLoading}
                    className={`w-full flex items-center justify-center gap-2 py-2 text-sm md:text-base font-semibold text-gray-700 bg-gray-100 rounded-md transition duration-200 ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'}`}
                >
                    <FaGoogle className="text-lg md:text-xl text-sky-500" />
                     orqali kirish
                </Button>

                <p className="text-center text-xs md:text-sm text-gray-600 mt-4">
                    Akkauntingiz yo'qmi?{' '}
                    <Link href="/register" className="text-sky-600 hover:underline">
                        Akkaunt yaratish
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
