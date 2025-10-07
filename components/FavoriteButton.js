"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function FavoriteButton({ dressId }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    checkFavoriteStatus();
  }, [dressId]);

  const checkFavoriteStatus = async () => {
    try {
      const res = await fetch("/api/auth/me");
      const data = await res.json();
      if (data.success) {
        setUser(data.user);
        setIsFavorite(data.user.favorites?.includes(dressId) || false);
      }
    } catch (error) {
      // User not logged in
    }
  };

  const toggleFavorite = async () => {
    if (!user) {
      toast.error("Please login to add favorites");
      setTimeout(() => router.push("/login"), 1500);
      return;
    }

    setLoading(true);
    try {
      const method = isFavorite ? "DELETE" : "POST";
      const res = await fetch("/api/user/favorites", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dressId }),
      });

      const data = await res.json();
      if (data.success) {
        setIsFavorite(!isFavorite);
        toast.success(isFavorite ? "Removed from favorites" : "Added to favorites! ❤️");
      } else {
        toast.error("Failed to update favorites");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error("Error toggling favorite:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      disabled={loading}
      className={`p-3 rounded-full transition shadow-lg ${
        isFavorite
          ? "bg-accent text-white hover:bg-darkPink"
          : "bg-white text-gray-600 hover:bg-rose border border-gray-300"
      }`}
      title={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <svg
        className="w-6 h-6"
        fill={isFavorite ? "currentColor" : "none"}
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
    </button>
  );
}
