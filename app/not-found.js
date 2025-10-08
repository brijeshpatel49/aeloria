import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-rose to-white">
      <div className="max-w-2xl w-full text-center">
        {/* Logo */}
        <div className="mb-8">
          <Image
            src="/logo2.png"
            alt="Aeloria Logo"
            width={120}
            height={120}
            className="mx-auto object-contain mix-blend-multiply"
          />
        </div>

        {/* 404 Text */}
        <h1 className="text-9xl font-serif font-bold text-accent mb-4">404</h1>
        
        <h2 className="text-3xl font-serif font-semibold text-primary mb-4">
          Page Not Found
        </h2>
        
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Oops! The page you're looking for seems to have wandered off. 
          Let's get you back to exploring our beautiful collection.
        </p>

        {/* Illustration */}
        <div className="mb-8">
          <svg className="w-64 h-64 mx-auto text-pink-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-block bg-accent text-white px-8 py-4 rounded-full hover:bg-darkPink transition font-semibold shadow-lg"
          >
            Go to Homepage
          </Link>
          <Link
            href="/collection"
            className="inline-block bg-white border-2 border-accent text-accent px-8 py-4 rounded-full hover:bg-rose transition font-semibold"
          >
            Browse Collection
          </Link>
        </div>

        {/* Quick Links */}
        <div className="mt-12 pt-8 border-t border-pink-200">
          <p className="text-sm text-gray-600 mb-4">Quick Links:</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/about" className="text-accent hover:underline">About Us</Link>
            <span className="text-gray-300">•</span>
            <Link href="/contact" className="text-accent hover:underline">Contact</Link>
            <span className="text-gray-300">•</span>
            <Link href="/favorites" className="text-accent hover:underline">Favorites</Link>
            <span className="text-gray-300">•</span>
            <Link href="/cart" className="text-accent hover:underline">Cart</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
