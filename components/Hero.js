import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative flex items-center justify-center overflow-hidden" style={{ height: 'calc(100vh - 5rem)' }}>
      <Image 
        src="/hero.png" 
        alt="Aeloria Hero" 
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative z-10 text-center px-4">
        <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4 text-white drop-shadow-lg">
          Where Grace Meets Modern Elegance
        </h1>
        <p className="text-xl text-white mb-8 max-w-2xl mx-auto drop-shadow-md">
          Discover dresses that speak to your soul.
        </p>
        <Link 
          href="/collection"
          className="inline-block bg-accent text-white px-10 py-4 rounded-full hover:bg-darkPink transition shadow-lg font-medium"
        >
          Explore Collection
        </Link>
      </div>
    </section>
  );
}
