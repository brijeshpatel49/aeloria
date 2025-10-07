"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AddToCartButton({ dress }) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/auth/me");
      const data = await res.json();
      if (data.success) {
        setUser(data.user);
      }
    } catch (error) {
      // User not logged in
    }
  };

  const addToCart = async () => {
    if (!user) {
      toast.error("Please login to add items to cart");
      setTimeout(() => router.push("/login"), 1500);
      return;
    }

    setLoading(true);
    const loadingToast = toast.loading("Adding to cart...");
    
    try {
      const dressId = dress._id || dress.id;
      
      const res = await fetch("/api/user/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dressId: dressId, quantity: 1 }),
      });

      const data = await res.json();
      if (data.success) {
        const message = data.message === 'Quantity updated' 
          ? "Quantity updated in cart! 🛒" 
          : "Added to cart! 🛒";
        toast.success(message, { id: loadingToast });
      } else {
        toast.error(data.error || "Failed to add to cart", { id: loadingToast });
      }
    } catch (error) {
      toast.error("Something went wrong", { id: loadingToast });
      console.error("Error adding to cart:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={addToCart}
      disabled={loading}
      className="w-full bg-primary text-white py-4 px-8 rounded-full hover:bg-accent transition font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
      {loading ? "Adding..." : "Add to Cart"}
    </button>
  );
}
