import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <h1 className="text-5xl font-serif font-bold mb-4">Dress Not Found</h1>
      <p className="text-gray-600 mb-8">
        Sorry, we couldn't find the dress you're looking for.
      </p>
      <Link 
        href="/collection"
        className="inline-block bg-primary text-white px-8 py-3 hover:bg-accent transition"
      >
        Browse Collection
      </Link>
    </div>
  );
}
