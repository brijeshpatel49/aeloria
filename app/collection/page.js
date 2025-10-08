"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function CollectionPage() {
  const [allDresses, setAllDresses] = useState([]);
  const [filteredDresses, setFilteredDresses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    fetchDresses();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchQuery, selectedCategory, sortBy, allDresses]);

  const fetchDresses = async () => {
    try {
      const res = await fetch("/api/dresses", { cache: "no-store" });
      const data = await res.json();
      if (data.success) {
        setAllDresses(data.dresses);
        setFilteredDresses(data.dresses);
      }
    } catch (error) {
      console.error("Error fetching dresses:", error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...allDresses];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (dress) =>
          (dress.name && dress.name.toLowerCase().includes(query)) ||
          (dress.category && dress.category.toLowerCase().includes(query)) ||
          (dress.id && dress.id.toString().toLowerCase().includes(query))
      );
    }

    // Category filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (dress) => dress.category === selectedCategory
      );
    }

    // Sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name-az":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-za":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      default:
        // Default sorting by ID
        filtered.sort((a, b) => {
          if (a.id && b.id) {
            const aNum = parseInt(a.id);
            const bNum = parseInt(b.id);
            if (!isNaN(aNum) && !isNaN(bNum)) {
              return aNum - bNum;
            }
            return String(a.id).localeCompare(String(b.id));
          }
          if (a.id) return -1;
          if (b.id) return 1;
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
    }

    setFilteredDresses(filtered);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSortBy("default");
  };

  const categories = ["All", "Cord Set", "Fancy", "Fancy Cord", "Ready Made"];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading collection...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-5xl font-serif font-bold text-center mb-4 text-primary">
        Our Collection
      </h1>
      <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
        Each piece is carefully curated to bring elegance and confidence to your
        wardrobe.
      </p>

      {/* Filters Section */}
      <div className="bg-rose rounded-lg p-4 sm:p-6 mb-8">
        {/* Mobile: Search full width, Category and Sort side by side */}
        {/* Desktop: All 3 in one row */}

        {/* Search - Full Width */}
        <div className="mb-4 md:mb-0 md:grid md:grid-cols-3 md:gap-4">
          <div className="mb-4 md:mb-0">
            <label className="block text-sm font-medium mb-2 text-primary">
              Search
            </label>
            <input
              type="text"
              placeholder="Search by name, category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-base"
            />
          </div>

          {/* Category and Sort - 2 columns on mobile, part of 3-col grid on desktop */}
          <div className="grid grid-cols-2 gap-3 md:contents">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium mb-2 text-primary">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-sm sm:text-base"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium mb-2 text-primary">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-sm sm:text-base"
              >
                <option value="default">Default</option>
                <option value="price-low">Price: Low-High</option>
                <option value="price-high">Price: High-Low</option>
                <option value="name-az">Name: A-Z</option>
                <option value="name-za">Name: Z-A</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results and Clear Button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pt-3 border-t border-pink-200">
          <p className="text-xs sm:text-sm text-gray-600">
            Showing {filteredDresses.length} of {allDresses.length} dresses
          </p>
          <button
            onClick={clearFilters}
            className="text-xs sm:text-sm text-accent hover:text-darkPink transition font-medium underline"
          >
            Clear All Filters
          </button>
        </div>
      </div>

      {filteredDresses.length === 0 ? (
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
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <p className="text-xl text-gray-600 mb-4">No dresses found</p>
          <p className="text-sm text-gray-500 mb-4">
            Try adjusting your filters
          </p>
          <button
            onClick={clearFilters}
            className="inline-block bg-accent text-white px-8 py-3 rounded-full hover:bg-darkPink transition"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredDresses.map((dress) => (
            <Link
              key={dress._id}
              href={`/dress/${dress._id}`}
              className="group"
            >
              <div className="relative h-[450px] mb-4 overflow-hidden bg-gray-200 rounded-lg shadow-md">
                <Image
                  src={dress.image}
                  alt={dress.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                  className="object-cover group-hover:scale-105 transition duration-300"
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDUwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDUwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iI2YzZjRmNiIvPjwvc3ZnPg=="
                />
              </div>
              <h3 className="text-xl font-serif mb-2 text-primary">
                {dress.name}
              </h3>
              <p className="text-gray-600 text-sm mb-2">{dress.category}</p>
              <p className="font-semibold text-accent">₹{dress.price}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
