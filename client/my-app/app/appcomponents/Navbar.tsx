"use client"

import { useEffect, useRef, useState } from "react"
import {
  Menu,
  Search,
  User,
  Heart,
  ShoppingBag,
  ChevronDown,
  Globe,
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

          <div className="flex items-center gap-8 relative">
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
              className="
                hidden sm:flex items-center gap-1.5
                text-sm cursor-pointer
                hover:underline
              "
            >
              <Globe size={16} />
              <span>EN £</span>
            </button>


            {langOpen && (
                <div
                  ref={langRef}
                  className="
                    absolute right-0 top-14 z-50 w-85
                    bg-white text-black
                    rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.15)]
                    border border-gray-100
                    p-6
                    animate-[fadeIn_.2s_ease-out]
                  "
                >
                  {/* Header */}
                  <h4 className="text-xs font-semibold mb-4">
                    Please choose your language or currency
                  </h4>

                  {/* Language */}
                  <div className="mb-4">
                    <label className="block text-xs font-medium text-gray-500 mb-1">
                      Language
                    </label>
                    <select
                      className="
                        w-full appearance-none
                        border border-gray-300
                        rounded-lg px-3 py-2
                        text-sm
                        focus:outline-none focus:ring-2 focus:ring-black
                      "
                    >
                      <option>English</option>
                      <option>French</option>
                      <option>German</option>
                    </select>
                  </div>

                  {/* Currency */}
                  <div className="mb-5">
                    <label className="block text-xs font-medium text-gray-500 mb-1">
                      Currency
                    </label>
                    <select
                      className="
                        w-full appearance-none
                        border border-gray-300
                        rounded-lg px-3 py-2
                        text-sm
                        focus:outline-none focus:ring-2 focus:ring-black
                      "
                    >
                      <option>£ GBP</option>
                      <option>$ USD</option>
                      <option>€ EUR</option>
                    </select>
                  </div>

                  {/* Info Box */}
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 mb-5">
                    <p className="text-sm text-gray-700">
                      Don’t miss out on your{" "}
                      <span className="font-semibold">Ultra</span> member benefits
                    </p>
                  </div>

                  {/* Button */}
                  <button
                    className="
                      w-full bg-black text-white
                      py-2.5 rounded-xl
                      text-sm font-medium
                      hover:bg-gray-900
                      transition
                    "
                  >
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
              className="
                absolute right-0 top-14 z-50 w-75
                bg-white text-black
                rounded-2xl
                shadow-[0_20px_40px_rgba(0,0,0,0.18)]
                border border-gray-100
                p-6
                animate-[fadeIn_.2s_ease-out]
              "
            >
              {/* Arrow */}
              <div className="absolute -top-2 right-6 w-4 h-4 bg-white rotate-45 border-l border-t border-gray-200" />

              {/* Title */}
              <h4 className="text-base font-semibold mb-1">
                Join Ultra
              </h4>

              {/* Description */}
              <p className="text-sm text-gray-600 mb-5 leading-relaxed">
                Don’t miss out on your{" "}
                <span className="font-semibold text-black">Ultra</span> member benefits —
                exclusive offers, faster checkout & early access.
              </p>

              {/* Buttons */}
              <div className="flex flex-col gap-3">
                <button
                  className="
                    w-full border border-gray-300
                    py-2.5 rounded-xl
                    text-sm font-medium
                    hover:bg-gray-100
                    transition
                  "
                >
                  Sign In
                </button>

                <button
                  className="
                    w-full bg-black text-white
                    py-2.5 rounded-xl
                    text-sm font-medium
                    hover:bg-gray-900
                    transition
                  "
                >
                  Create Free Account
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



