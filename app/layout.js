import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToastProvider from "@/components/ToastProvider";
import { AuthProvider } from "@/contexts/AuthContext";

export const metadata = {
  title: "Aeloria - Elegance, Redefined",
  description: "Curated collection of timeless dresses for the modern woman. Shop cord sets, fancy dresses, and ready-made outfits.",
  keywords: ["dresses", "women fashion", "cord sets", "fancy dresses", "ethnic wear", "party wear", "online shopping"],
  authors: [{ name: "Aeloria" }],
  creator: "Aeloria",
  publisher: "Aeloria",
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "any" },
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon.png",
    apple: { url: "/favicon.png", sizes: "180x180", type: "image/png" },
  },
  openGraph: {
    title: "Aeloria - Elegance, Redefined",
    description: "Curated collection of timeless dresses for the modern woman",
    url: "https://aeloria.com",
    siteName: "Aeloria",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aeloria - Elegance, Redefined",
    description: "Curated collection of timeless dresses for the modern woman",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ToastProvider />
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
