"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const userRes = await fetch("/api/auth/me");
      const userData = await userRes.json();

      if (!userData.success) {
        toast.error("Please register or login to view your favorites");
        router.push("/register");
        return;
      }

      if (userData.user.favorites?.length > 0) {
        const dressesRes = await fetch("/api/dresses");
        const dressesData = await dressesRes.json();

        if (dressesData.success) {
          const favDresses = dressesData.dresses.filter((dress) =>
            userData.user.favorites.includes(dress._id)
          );
          setFavorites(favDresses);
        }
      }
    } catch (error) {
      console.error("Error fetching favorites:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = async (dressId) => {
    try {
      await fetch("/api/user/favorites", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dressId }),
      });
      setFavorites(favorites.filter((dress) => dress._id !== dressId));
      toast.success("Removed from favorites");
    } catch (error) {
      console.error("Error removing favorite:", error);
      toast.error("Failed to remove from favorites");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading favorites...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-serif font-bold mb-8 text-primary">My Favorites</h1>

      {favorites.length === 0 ? (
        <div className="text-center py-16">
          <svg
            className="w-24 h-24 mx-auto text-gray-300 mb-4"
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
          <p className="text-xl text-gray-600 mb-4">No favorites yet</p>
          <Link
            href="/collection"
            className="inline-block bg-accent text-white px-8 py-3 rounded-full hover:bg-darkPink transition"
          >
            Browse Collection
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {favorites.map((dress) => (
            <div key={dress._id} className="group relative">
              <Link href={`/dress/${dress._id}`}>
                <div className="relative h-[400px] mb-4 overflow-hidden bg-gray-200 rounded-lg shadow-md">
                  <Image
                    src={dress.image}
                    alt={dress.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                    className="object-cover group-hover:scale-105 transition duration-300"
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2YzZjRmNiIvPjwvc3ZnPg=="
                  />
                </div>
                <h3 className="text-xl font-serif mb-2 text-primary">{dress.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{dress.category}</p>
                <p className="font-semibold text-accent">₹{dress.price}</p>
              </Link>
              <button
                onClick={() => removeFavorite(dress._id)}
                className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-lg hover:bg-red-50 transition"
              >
                <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth={2} />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
