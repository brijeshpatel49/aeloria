"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const userRes = await fetch("/api/auth/me", { cache: 'no-store' });
      const userData = await userRes.json();

      if (!userData.success) {
        toast.error("Please register or login to view your cart");
        router.push("/register");
        return;
      }

      if (userData.user.cart?.length > 0) {
        const dressesRes = await fetch("/api/dresses", { cache: 'no-store' });
        const dressesData = await dressesRes.json();

        if (dressesData.success && dressesData.dresses) {
          const cartItems = [];
          
          for (const cartItem of userData.user.cart) {
            for (const dress of dressesData.dresses) {
              // Try matching with both _id and id fields
              const dressMongoId = dress._id?.toString() || dress._id;
              const dressNumericId = dress.id?.toString() || dress.id;
              const cartDressId = cartItem.dressId?.toString() || cartItem.dressId;
              
              if (dressMongoId === cartDressId || dressNumericId === cartDressId) {
                cartItems.push({
                  ...dress,
                  _id: dressMongoId,
                  quantity: cartItem.quantity || 1
                });
                break;
              }
            }
          }
          
          setCart(cartItems);
        }
      } else {
        setCart([]);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (dressId, newQuantity) => {
    try {
      await fetch("/api/user/cart", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dressId, quantity: newQuantity }),
      });
      
      if (newQuantity <= 0) {
        setCart(cart.filter((item) => item._id !== dressId));
        toast.success("Item removed from cart");
      } else {
        setCart(cart.map((item) =>
          item._id === dressId ? { ...item, quantity: newQuantity } : item
        ));
        toast.success("Cart updated");
      }
    } catch (error) {
      console.error("Error updating cart:", error);
      toast.error("Failed to update cart");
    }
  };

  const removeItem = async (dressId) => {
    try {
      await fetch("/api/user/cart", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dressId }),
      });
      setCart(cart.filter((item) => item._id !== dressId));
      toast.success("Item removed from cart");
    } catch (error) {
      console.error("Error removing item:", error);
      toast.error("Failed to remove item");
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "1234567890";
    const items = cart.map((item) => `${item.name} x${item.quantity} - ₹${(item.price * item.quantity)}`).join("\n");
    const message = `Hi, I'd like to order:\n\n${items}\n\nTotal: ₹${total}`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-serif font-bold mb-8 text-primary">Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center py-16">
          <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <p className="text-xl text-gray-600 mb-4">Your cart is empty</p>
          <Link href="/collection" className="inline-block bg-accent text-white px-8 py-3 rounded-full hover:bg-darkPink transition">
            Browse Collection
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item._id} className="bg-white p-4 rounded-lg shadow border flex gap-4">
                <div className="relative w-[100px] h-[100px] bg-gray-200 rounded overflow-hidden">
                  <Image 
                    src={item.image} 
                    alt={item.name} 
                    width={100} 
                    height={100} 
                    className="object-cover"
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2YzZjRmNiIvPjwvc3ZnPg=="
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-lg font-semibold text-primary">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.category}</p>
                  <p className="text-accent font-semibold mt-2">₹{item.price}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <button onClick={() => updateQuantity(item._id, item.quantity - 1)} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">-</button>
                    <span className="px-4">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item._id, item.quantity + 1)} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">+</button>
                    <button onClick={() => removeItem(item._id)} className="ml-auto text-red-500 hover:text-red-700">Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-rose p-6 rounded-lg h-fit sticky top-4">
            <h2 className="text-2xl font-serif font-semibold mb-4 text-primary">Order Summary</h2>
            <div className="space-y-2 mb-4">
              {cart.map((item) => (
                <div key={item._id} className="flex justify-between text-sm">
                  <span>{item.name} x{item.quantity}</span>
                  <span>₹{(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-pink-300 pt-4 mb-6">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span className="text-accent">₹{total}</span>
              </div>
            </div>
            <button onClick={handleCheckout} className="w-full bg-green-600 text-white py-3 rounded-full hover:bg-green-700 transition font-semibold flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Order on WhatsApp
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
