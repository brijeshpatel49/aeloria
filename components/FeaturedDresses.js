import Image from "next/image";
import Link from "next/link";
import clientPromise from "@/lib/mongodb";

// Helper function to convert Google Drive URLs
function convertGoogleDriveUrl(url) {
  if (!url) return url;
  
  // If already in thumbnail format, return as is
  if (url.includes('lh3.googleusercontent.com') || url.includes('drive.google.com/thumbnail')) {
    return url;
  }
  
  // Extract file ID from various Google Drive URL formats
  let fileId = null;
  
  // Format: https://drive.google.com/file/d/FILE_ID/view
  const match1 = url.match(/\/file\/d\/([^\/\?]+)/);
  if (match1) {
    fileId = match1[1];
  }
  
  // Format: https://drive.google.com/open?id=FILE_ID
  if (!fileId) {
    const match2 = url.match(/[?&]id=([^&]+)/);
    if (match2) {
      fileId = match2[1];
    }
  }
  
  // Format: https://drive.google.com/uc?id=FILE_ID
  if (!fileId) {
    const match3 = url.match(/\/uc\?.*id=([^&]+)/);
    if (match3) {
      fileId = match3[1];
    }
  }
  
  // If we found a file ID, convert to thumbnail format (works better with CORS)
  if (fileId) {
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
  }
  
  // Return original URL if no conversion needed
  return url;
}

export default async function FeaturedDresses() {
  let featured = [];
  
  try {
    const client = await clientPromise;
    const db = client.db("aeloria");
    
    // Try 'clothes' collection first, then 'dresses'
    // Sort by createdAt descending (newest first) and limit to 3 items
    let dresses = await db.collection("clothes")
      .find({})
      .sort({ createdAt: -1 })
      .limit(3)
      .toArray();
    
    if (dresses.length === 0) {
      dresses = await db.collection("dresses")
        .find({})
        .sort({ createdAt: -1 })
        .limit(3)
        .toArray();
    }
    
    featured = dresses.map(dress => ({
      ...dress,
      _id: dress._id.toString(),
      image: convertGoogleDriveUrl(dress.image)
    }));
  } catch (error) {
    console.error("Error fetching dresses:", error);
  }

  if (featured.length === 0) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-4xl font-serif font-semibold mb-6 text-primary">New Arrivals</h2>
        <p className="text-gray-600 mb-4">No dresses available yet.</p>
        <p className="text-sm text-gray-500">Please add dresses from the admin panel.</p>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-serif font-semibold text-primary mb-2">
          New Arrivals
        </h2>
        <p className="text-gray-600">Discover our latest collection of elegant dresses</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {featured.map((dress) => (
          <Link key={dress._id} href={`/dress/${dress._id}`} className="group">
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
              <div className="absolute top-4 left-4 bg-accent text-white px-3 py-1 rounded-full text-xs font-semibold">
                NEW
              </div>
            </div>
            <h3 className="text-xl font-serif mb-2 text-primary">{dress.name}</h3>
            <p className="text-gray-600 text-sm mb-2">{dress.category}</p>
            <p className="font-semibold text-accent">₹{dress.price}</p>
          </Link>
        ))}
      </div>
      
      <div className="text-center mt-12">
        <Link 
          href="/collection"
          className="inline-block bg-accent text-white px-8 py-3 rounded-full hover:bg-darkPink transition font-medium"
        >
          View All Collection
        </Link>
      </div>
    </section>
  );
}
