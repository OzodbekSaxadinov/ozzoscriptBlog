
import {  Inter } from 'next/font/google'
import "./globals.css";
import Navbar from './ui/Navbar';

const inter = Inter({ subsets: ['latin'] })
 
export const metadata = {
  title: "ozzocript",
  description: "this is blog website to learn new web technology such as javascript, typescript, react, next, css",
};


export default function RootLayout({ children }) {

  return (
    <html lang="uz">
      <body
       className={inter.className}
      >
        <div className="min-h-screen w-full flex flex-col items-center">
        <Navbar/>
        {children}
        </div>
      </body>
    </html>
  );
}
