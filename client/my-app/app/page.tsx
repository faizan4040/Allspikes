import Image from "next/image"
import Link from "next/link"
import { IMAGES } from "@/app/lib/images"

export default function Home() {
  return (
    <main className="px-4 md:px-8 py-3">
      <Link href="/coupon/summer-sale">
        <section
          className="
            grid grid-cols-1 md:grid-cols-2
            items-center
            gap-4
            bg-gray-100
            rounded-xl
            overflow-hidden
            cursor-pointer
            hover:shadow-lg transition
          "
        >
          {/* LEFT - IMAGE (VERY SHORT) */}
          <div className="relative w-full h-[16vh] sm:h-[18vh] md:h-[22vh] bg-white">
            <Image
              src={IMAGES.coupon}
              alt="Coupon Banner"
              fill
              priority
              className="object-contain"
            />
          </div>

          {/* RIGHT - TEXT */}
          <div className="p-4 md:p-6 text-center md:text-left">
            <span className="text-[10px] tracking-widest text-gray-500 uppercase">
              Limited Time
            </span>

            <h1 className="text-xl md:text-2xl font-extrabold leading-tight">
              UP TO <span className="text-red-600">80% OFF </span>
            </h1>

            <p className="text-sm md:text-base font-semibold">
              2026 Collection
            </p>

            <button className="mt-3 bg-black text-white px-4 py-2 rounded-full text-xs md:text-sm font-medium hover:scale-105 transition">
              Shop Now →
            </button>
          </div>
        </section>
      </Link>
    </main>
  )
}
