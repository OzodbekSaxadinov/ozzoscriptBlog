"use client"
import React, { useState } from "react";
import { auth } from "../../tools/firebase.config";
import { sendPasswordResetEmail } from "firebase/auth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePasswordReset = async () => {
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Parolni tiklash uchun havola email manzilingizga yuborildi.");
      setError("");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setError("Bunday email yuq.");
      } else {
        setError("Xatolik yuz berdi. Email manzilingizni tekshiring.");
      }
      setMessage("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="w-[350px] p-6 bg-white rounded-md border border-blue-600 shadow-lg filter drop-shadow-lg">
        <h2 className="text-xl my-4 font-semibold mb-4">Parolni Tiklash</h2>
        <p className="mb-2 text-gray-600 my-3">Email manzilingizni kiriting:</p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="block w-full px-4 py-2 mt-2 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handlePasswordReset}
          className="w-full py-2 mt-6 text-lg font-semibold text-white bg-blue-500/90 backdrop-blur-md rounded-md hover:bg-blue-600 active:bg-blue-700"
        >
          {loading ? "Yuklanmoqda..." : "Parolni Tiklash"}
        </button>
        {message && <p className="mt-4 text-green-600">{message}</p>}
        {error && <p className="mt-4 text-red-600">{error}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
