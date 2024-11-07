"use client";
import { Button } from "@headlessui/react";
import Link from "next/link";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa6";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { collection, getDocs, query, where, setDoc, doc } from "firebase/firestore";
import { useState } from "react";
import { auth, db } from "@/app/tools/firebase.config";
import AuthState from "@/app/tools/state";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const authSuccess = AuthState((state) => state.authSuccess);
  const authFailure = AuthState((state) => state.authFailure);
  const { setUser } = AuthState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const router = useRouter();
  const googleProvider = new GoogleAuthProvider();

  const validateInputs = () => {
    const errors = {};
    if (name.length < 2) errors.name = "Ism kamida 2 belgidan iborat bo'lishi kerak";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) errors.email = "Email formati noto'g'ri";
    if (password.length < 6) errors.password = "Parol kamida 6 belgidan iborat bo'lishi kerak";
    return errors;
  };

  const handleRegister = async () => {
    const validationErrors = validateInputs();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsLoading(true);
    try {
      const q = query(collection(db, "users"), where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setEmailError(true);
        setIsLoading(false);
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: name });

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name,
        email,
        createdAt: new Date(),
      });

      setUser({ id: user.uid, name: user.displayName, email: user.email, img: user.photoURL });
      router.push("/");
      await authSuccess();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      await authFailure();
      setIsLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const userDocRef = doc(db, "users", user.uid);
      const userSnapshot = await getDoc(userDocRef);

      if (!userSnapshot.exists()) {
        await setDoc(userDocRef, {
          name: user.displayName,
          email: user.email,
        });
      }
      await authSuccess();
      setUser({ id: user.uid, name: user.displayName, email: user.email, img: user.photoURL });
      router.push("/");
    } catch (error) {
      console.log(error.message);
      await authFailure();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 md:p-8">
      <div className="w-96 max-w-xs md:max-w-sm border border-blue-300 p-4 md:p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-center text-2xl md:text-3xl font-semibold text-sky-700 mb-4">
          Ro'yxatdan o'tish
        </h1>

        <div className="space-y-4">
          <div>
            <label className="block text-sm md:text-base font-medium">Ism</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Ismingiz"
              className="w-full px-3 py-2 text-sm md:text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            {errors.name && <p className="text-red-500 text-xs md:text-sm mt-1">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-sm md:text-base font-medium">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Emailingiz"
              className="w-full px-3 py-2 text-sm md:text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            {errors.email && (
              <p className="text-red-500 text-xs md:text-sm mt-1">
                {errors.email}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm md:text-base font-medium">Parol</label>
            <div className="relative">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                placeholder="Parolingiz"
                className="w-full px-3 py-2 text-sm md:text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2/4 transform -translate-y-2/4 text-gray-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs md:text-sm mt-1">{errors.password}</p>
            )}
          </div>
        </div>

        <Button
          onClick={handleRegister}
          disabled={isLoading}
          className={`w-full py-2 mt-6 text-sm md:text-base font-semibold text-white bg-sky-600 rounded-md transition duration-200 ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-sky-500 active:bg-sky-700'}`}
        >
          {isLoading ? "Yuklanmoqda..." : "Ro'yxatdan o'tish"}
        </Button>

        <hr className="my-4 border-gray-300" />

        <Button
          disabled={isLoading}
          onClick={handleGoogleRegister}
          className={`w-full flex items-center justify-center gap-2 py-2 text-sm md:text-base font-semibold text-gray-700 bg-gray-100 rounded-md transition duration-200 ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'}`}
        >
          <FaGoogle className="text-sm md:text-lg text-sky-500" />
          orqali ro'yxatdan o'tish
        </Button>

        <p className="mt-4 text-center text-xs md:text-sm text-gray-500">
          {emailError ? (<p className="text-red-600"> Siz allaqachon ro'yxatdan o'tgansiz </p>) : "Allaqachon akkauntingiz bormi?"}
          <Link href="/login" className="text-sky-600 hover:underline"> Kirish</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
