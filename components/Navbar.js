"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import UserMenu from "./UserMenu";
import MobileSidebar from "./MobileSidebar";
import CartIcon from "./CartIcon";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-pink-100 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-1 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo2.png"
              alt="Aeloria Logo"
              width={80}
              height={80}
              priority
              className="object-contain mix-blend-multiply"
              style={{ filter: "contrast(1.1)" }}
            />
            <div className="flex flex-col -space-y-1">
              <span
                className="text-3xl font-bold text-primary"
                style={{ fontFamily: "'Dancing Script', cursive" }}
              >
                Aeloria
              </span>
              <span className="text-[9px] tracking-[0.3em] text-gray-500 uppercase">
                WEAR EXTRAORDINARY
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <div className="flex space-x-8">
                <Link
                  href="/"
                  className={`text-sm hover:text-accent transition font-medium ${
                    pathname === "/" ? "text-accent" : ""
                  }`}
                >
                  Home
                </Link>
                <Link
                  href="/collection"
                  className={`text-sm hover:text-accent transition font-medium ${
                    pathname === "/collection" ? "text-accent" : ""
                  }`}
                >
                  Collection
                </Link>
                <Link
                  href="/about"
                  className={`text-sm hover:text-accent transition font-medium ${
                    pathname === "/about" ? "text-accent" : ""
                  }`}
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className={`text-sm hover:text-accent transition font-medium ${
                    pathname === "/contact" ? "text-accent" : ""
                  }`}
                >
                  Contact
                </Link>
              </div>

              <div className="flex items-center gap-4">
                <Link
                  href="/favorites"
                  className={`p-2 hover:bg-rose rounded-full transition relative ${
                    pathname === "/favorites" ? "bg-rose" : ""
                  }`}
                  title="Favorites"
                >
                  <svg
                    className={`w-6 h-6 hover:text-accent transition ${
                      pathname === "/favorites" ? "text-accent" : "text-primary"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </Link>

                <CartIcon />

                <UserMenu />
              </div>
            </div>

            {/* Mobile Menu */}
            <div className="flex md:hidden items-center gap-3">
              <Link href="/favorites" className="p-2">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </Link>
              <CartIcon />
              <MobileSidebar />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
