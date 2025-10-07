import Image from "next/image";
import { notFound } from "next/navigation";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import WhatsAppButton from "@/components/WhatsAppButton";
import FavoriteButton from "@/components/FavoriteButton";
import AddToCartButton from "@/components/AddToCartButton";
import ShareButton from "@/components/ShareButton";

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

async function getDress(id) {
  try {
    const client = await clientPromise;
    const db = client.db("aeloria");
    
    // Try 'clothes' collection first, then 'dresses'
    let dress = await db.collection("clothes").findOne({ _id: new ObjectId(id) });
    if (!dress) {
      dress = await db.collection("dresses").findOne({ _id: new ObjectId(id) });
    }
    
    if (!dress) return null;
    
    return {
      ...dress,
      _id: dress._id.toString(),
      image: convertGoogleDriveUrl(dress.image)
    };
  } catch (error) {
    console.error("Error fetching dress:", error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const dress = await getDress(params.id);
  
  if (!dress) {
    return {
      title: "Dress Not Found - Aeloria",
    };
  }

  const url = `https://aeloria.com/dress/${params.id}`;

  return {
    title: `${dress.name} - Aeloria`,
    description: dress.description,
    openGraph: {
      title: `${dress.name} - Aeloria`,
      description: dress.description,
      url: url,
      siteName: 'Aeloria',
      images: [
        {
          url: dress.image,
          width: 1200,
          height: 630,
          alt: dress.name,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${dress.name} - Aeloria`,
      description: dress.description,
      images: [dress.image],
    },
  };
}

export default async function DressPage({ params }) {
  const dress = await getDress(params.id);

  if (!dress) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="relative h-[600px] bg-gray-100">
          <Image
            src={dress.image}
            alt={dress.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>

        <div>
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-4xl font-serif font-bold mb-2">{dress.name}</h1>
              <p className="text-3xl font-semibold text-accent">₹{dress.price}</p>
            </div>
            <div className="flex gap-2">
              <FavoriteButton dressId={dress._id} />
              <ShareButton dress={dress} />
            </div>
          </div>
          
          <p className="text-gray-700 leading-relaxed mb-8">
            {dress.description}
          </p>

          <div className="border-t border-b border-gray-200 py-6 mb-8">
            <h3 className="font-semibold mb-4">Details</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex">
                <span className="font-medium w-24">Category:</span>
                <span>{dress.category || 'Dress'}</span>
              </li>
              {dress.id && (
                <li className="flex">
                  <span className="font-medium w-24">ID:</span>
                  <span>{dress.id}</span>
                </li>
              )}
            </ul>
          </div>

          <div className="space-y-3">
            <AddToCartButton dress={dress} />
            <WhatsAppButton dress={dress} />
          </div>

          <div className="mt-8 bg-rose p-6 rounded-lg">
            <h3 className="font-semibold mb-3 text-primary">Order Information</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• Click "Order on WhatsApp" to place your order</li>
              <li>• We'll confirm availability and pricing</li>
              <li>• Payment details will be shared via WhatsApp</li>
              <li>• Have questions? Chat with us anytime!</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
