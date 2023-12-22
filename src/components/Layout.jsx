import { Catamaran } from "next/font/google"
import Navbar from "./Navbar";
import Footer from "./Footer";

const font = Catamaran({
  subsets: ["latin"],
  variable: "--font-inter",
});


export default function RootLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>
        <div className={`${font.className} bg-slate-100 overflow-hidden main`}>
          {children}
        </div>
      </main>
      <Footer />
    </>
  )
}
