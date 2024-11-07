'use client'
import {  FaLinkedin, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-sky-500 w-full mt-32 text-white  py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold">Ozzoscript</h2>
          </div>
          <div className="flex text-2xl space-x-4">
            <a href="https://www.linkedin.com/in/ozodbek-saxadinov-4b4b12301?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className="hover:text-gray-100">
              <FaLinkedin />
            </a>
            <a href="https://github.com/OzodbekSaxadinov" className="hover:text-gray-100">
              <FaGithub />
            </a>
          </div>
        </div>
        <div className="text-center mt-6">
          <p className="text-gray-100">© {new Date().getFullYear()} Ozzoscript. Barcha huquqlar himoyalangan.</p>
        </div>
      </div>
    </footer>
  );
}
