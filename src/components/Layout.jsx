import { Catamaran } from "next/font/google"

const font = Catamaran({
  subsets: ["latin"],
  variable: "--font-inter",
});


export default function RootLayout({ children }) {
  return (
      <main>
        <div className={`${font.className} overflow-hidden main`}>
          {children}
        </div>
      </main>
  )
}
