"use client"

import { useEffect, useRef, useState } from "react"
import {
  Menu,
  Search,
  User,
  Heart,
  ShoppingBag,
  ChevronDown,
} from "lucide-react"

const ads = [
  "SHOP NOW, PAY WITH KLARNA",
  "FREE DELIVERY ON ORDERS OVER £100",
  "JOIN ULTRA & GET EXCLUSIVE BENEFITS",
]

const categories = [
  "The Sale",
  "New In",
  "Men's",
  "Women's",
  "Kids'",
  "Run",
  "Trail",
  "Hike",
  "Sports",
  "Brands",
  "Partners",
  "Advice",
]

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const [adIndex, setAdIndex] = useState(0)
  const [langOpen, setLangOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)

  const miniBarRef = useRef<HTMLDivElement>(null)
  const langRef = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)

  /* Auto ads slider */
  useEffect(() => {
    const interval = setInterval(
      () => setAdIndex((prev) => (prev + 1) % ads.length),
      3000
    )
    return () => clearInterval(interval)
  }, [])

  /* Click outside */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Node

      if (miniBarRef.current && !miniBarRef.current.contains(target)) {
        setOpen(false)
      }
      if (langRef.current && !langRef.current.contains(target)) {
        setLangOpen(false)
      }
      if (profileRef.current && !profileRef.current.contains(target)) {
        setProfileOpen(false)
      }
    }

    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  return (
    <>
      {/* ================= HEADER ================= */}
      <header className="relative z-40">
        {/* MINI TOP BAR */}
        <div ref={miniBarRef} className="bg-white text-black text-xs border-b">
          <button
            onClick={() => setOpen(!open)}
            className="group w-full py-2 flex justify-center items-center gap-2"
          >
            <span className="relative font-medium">
              {ads[adIndex]}
              <span className="absolute left-0 -bottom-1 h-px w-0 bg-black transition-all group-hover:w-full" />
            </span>
            <ChevronDown
              size={14}
              className={`transition-transform cursor-pointer ${open ? "rotate-180" : ""}`}
            />
          </button>

          <div
            className={`overflow-hidden transition-all duration-500 ${
              open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="bg-white border-t shadow-xl">
              <div className="grid md:grid-cols-3 gap-6 p-6 text-sm">
                <div>
                  <h3 className="font-semibold">SHOP NOW, PAY WITH</h3>
                  <p className="text-gray-600">Choose Klarna at checkout.</p>
                </div>
                <div>
                  <h3 className="font-semibold">STUDENT DISCOUNT</h3>
                  <p className="text-gray-600">12% off SS26.</p>
                </div>
                <div>
                  <h3 className="font-semibold">ULTRA</h3>
                  <p className="text-gray-600">10% off first app order.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MAIN NAV */}
        <div className="bg-black text-white px-4 md:px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Menu className="cursor-pointer" />
           <a href="/"><span className="font-bold tracking-wide">BRANDLOGO.COM</span></a> 
          </div>

          <div className="flex items-center gap-4 relative">
            {/* SEARCH */}
            <div className="relative hidden sm:block w-64 md:w-80 lg:w-105">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
                className="w-full pl-10 pr-4 py-2 rounded-xl text-black text-sm bg-white focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Search products"
            />
            </div>


            {/* LANGUAGE */}
            <button
              onClick={() => {
                setLangOpen(!langOpen)
                setProfileOpen(false)
              }}
              className="hidden sm:block text-sm hover:underline cursor-pointer"
            >
              EN £
            </button>

            {langOpen && (
              <div
                ref={langRef}
                className="absolute right-0 top-12 z-50 w-80 bg-white text-black rounded-xl shadow-2xl p-5"
              >
                <h4 className="font-semibold mb-4">
                  Please choose your language or currency
                </h4>
                <select className="w-full border p-2 mb-3">
                  <option>English</option>
                </select>
                <select className="w-full border p-2 mb-4">
                  <option>£ GBP</option>
                </select>
                <button className="w-full bg-black text-white py-2 rounded-md">
                  Update
                </button>
              </div>
            )}

            {/* PROFILE */}
            <User
              className="cursor-pointer"
              onClick={() => {
                setProfileOpen(!profileOpen)
                setLangOpen(false)
              }}
            />

            {profileOpen && (
              <div
                ref={profileRef}
                className="absolute right-0 top-12 z-50 w-72 bg-white text-black rounded-xl shadow-2xl p-5 cursor-pointer"
              >
                <p className="text-sm mb-4">
                  Don’t miss out on your <strong>Ultra</strong> member benefits
                </p>
                <div className="flex gap-2">
                  <button className="flex-1 border py-2 rounded-md">
                    Sign In
                  </button>
                  <button className="flex-1 bg-black text-white py-2 rounded-md">
                    Create Account
                  </button>
                </div>
              </div>
            )}

            <Heart className="hidden sm:block cursor-pointer" />
            <ShoppingBag className="cursor-pointer"/>
          </div>
        </div>
      </header>

      {/* ================= CATEGORY BAR ================= */}
      <nav className="relative z-30 border-t bg-white">
        <ul className="flex gap-4 md:gap-6 px-4 md:px-6 py-3 text-sm font-medium overflow-x-auto">
          {categories.map((item) => (
            <li
              key={item}
              className="relative cursor-pointer whitespace-nowrap group"
            >
              {item}
              <span className="absolute left-0 -bottom-1 h-px w-0 bg-black transition-all duration-300 group-hover:w-full" />
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}

export default Navbar




// asdasdasdasdasdasdasdasd