"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminPage() {
  const router = useRouter();
  const [dresses, setDresses] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    price: "",
    image: "",
    category: "Cord Set",
  });
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/auth/me");
      const data = await res.json();
      
      if (!data.success || !data.user.isAdmin) {
        router.push("/login");
        return;
      }
      
      setUser(data.user);
      fetchDresses();
    } catch (error) {
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  const fetchDresses = async () => {
    const res = await fetch("/api/dresses", { cache: 'no-store' });
    const data = await res.json();
    if (data.success) {
      setDresses(data.dresses);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const url = editingId ? `/api/dresses/${editingId}` : "/api/dresses";
    const method = editingId ? "PUT" : "POST";
    
    // Prepare data - description will be auto-generated on server if empty
    const dressData = {
      ...formData,
      price: parseFloat(formData.price),
    };
    
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dressData),
    });
    
    const data = await res.json();
    if (data.success) {
      alert(editingId ? "Dress updated!" : "Dress added!");
      setShowModal(false);
      setFormData({
        id: "",
        name: "",
        price: "",
        image: "",
        category: "Cord Set",
      });
      setEditingId(null);
      fetchDresses();
    }
  };

  const handleEdit = (dress) => {
    setFormData({
      id: dress.id || "",
      name: dress.name,
      price: dress.price.toString(),
      image: dress.image,
      category: dress.category || "Cord Set",
    });
    setEditingId(dress._id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this dress?")) return;
    
    const res = await fetch(`/api/dresses/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (data.success) {
      alert("Dress deleted!");
      fetchDresses();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-serif font-bold text-primary">Admin Panel</h1>
        <div className="flex items-center gap-4">
          <p className="text-gray-600">Welcome, {user.name}</p>
          <button
            onClick={() => {
              setEditingId(null);
              setFormData({
                id: "",
                name: "",
                price: "",
                image: "",
                category: "Cord Set",
              });
              setShowModal(true);
            }}
            className="bg-accent text-white px-6 py-2 rounded-full hover:bg-darkPink transition font-medium"
          >
            + Add New Dress
          </button>
        </div>
      </div>

      {/* Modal Popup */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => {
          if (confirm("Close without saving?")) {
            setShowModal(false);
            setEditingId(null);
            setFormData({
              id: "",
              name: "",
              price: "",
              image: "",
              category: "Cord Set",
            });
          }
        }}>
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-gradient-to-r from-rose to-secondary p-6 border-b border-pink-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-serif font-semibold text-primary">
                  {editingId ? "Edit Dress" : "Add New Dress"}
                </h2>
                <button
                  onClick={() => {
                    if (confirm("Close without saving?")) {
                      setShowModal(false);
                      setEditingId(null);
                      setFormData({
                        id: "",
                        name: "",
                        price: "",
                        image: "",
                        category: "Cord Set",
                      });
                    }
                  }}
                  className="p-2 hover:bg-rose rounded-full transition"
                >
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">ID (Optional)</label>
              <input
                type="text"
                value={formData.id}
                onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                className="w-full px-3 py-2 border rounded"
                placeholder="e.g., DR001"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Price (₹)</label>
              <input
                type="number"
                step="1"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-3 py-2 border rounded"
                placeholder="e.g., 2999"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Google Drive Image Link</label>
              <input
                type="text"
                required
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full px-3 py-2 border rounded"
                placeholder="Paste any Google Drive link"
              />
              <p className="text-xs text-gray-600 mt-1">
                Paste any Google Drive link - it will be auto-converted. Make sure the file is shared publicly.
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border rounded"
              >
                <option>Cord Set</option>
                <option>Fancy</option>
                <option>Fancy Cord</option>
                <option>Ready Made</option>
              </select>
            </div>
            
              <div className="flex gap-2 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  className="flex-1 bg-accent text-white px-6 py-3 rounded-full hover:bg-darkPink transition font-medium"
                >
                  {editingId ? "Update Dress" : "Add Dress"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingId(null);
                    setFormData({
                      id: "",
                      name: "",
                      price: "",
                      image: "",
                      category: "Cord Set",
                    });
                  }}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
        
      {/* List */}
      <div>
        <h2 className="text-2xl font-serif font-semibold mb-4 text-primary">
          All Dresses ({dresses.length})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {dresses.map((dress) => (
            <div key={dress._id} className="bg-white rounded-lg shadow-md border border-pink-100 overflow-hidden hover:shadow-lg transition">
              {dress.image && (
                <div className="relative h-48 bg-gray-100">
                  <Image 
                    src={dress.image} 
                    alt={dress.name} 
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-4">
                <h3 className="font-semibold text-lg text-primary mb-1">{dress.name}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  {dress.id && <span className="text-gray-500">ID: {dress.id}</span>}
                </p>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-accent font-bold text-lg">₹{dress.price}</span>
                  <span className="text-xs bg-rose px-2 py-1 rounded-full text-primary">{dress.category}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(dress)}
                    className="flex-1 bg-accent text-white py-2 rounded-full hover:bg-darkPink transition text-sm font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(dress._id)}
                    className="px-4 bg-red-500 text-white py-2 rounded-full hover:bg-red-600 transition text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
