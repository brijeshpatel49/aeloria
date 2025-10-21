"use client";

import { useState } from "react";

export default function WhatsAppButton({ dress }) {
  const [showModal, setShowModal] = useState(false);
  const [address, setAddress] = useState("");

  const handleWhatsAppClick = () => {
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!address.trim()) {
      return;
    }

    const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "9974420398";
    const productUrl = `${window.location.origin}/dress/${dress._id}`;
    const message = `Hi, I'm interested in ordering:\n\n*${dress.name}*\nPrice: ₹${dress.price}\nCategory: ${dress.category}\n${dress.id ? `ID: ${dress.id}\n` : ""}\n📍 *Delivery Address:*\n${address}\n\nView Product: ${productUrl}`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    
    // Reset and close
    setAddress("");
    setShowModal(false);
  };

  return (
    <>
      <button
        onClick={handleWhatsAppClick}
        className="w-full bg-green-600 text-white py-4 px-8 rounded-full hover:bg-green-700 transition font-semibold flex items-center justify-center gap-2 shadow-lg"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
        Order on WhatsApp
      </button>

      {/* Address Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-rose to-secondary p-6 border-b border-pink-200">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-serif font-semibold text-primary">Delivery Address</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-rose rounded-full transition"
                >
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-4 sm:p-6">
              <label className="block text-sm font-medium mb-2 text-primary">
                Please enter your complete delivery address
              </label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                rows="4"
                placeholder="House/Flat No., Street, Area, City, State, PIN Code"
                className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent resize-none text-base"
              />
              
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 text-white py-3 px-4 rounded-full hover:bg-green-700 transition font-semibold flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  Continue to WhatsApp
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="w-full sm:w-auto px-6 py-3 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition font-medium text-sm sm:text-base"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
