import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-white to-rose mt-20 border-t border-pink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-serif font-semibold mb-4 text-primary">Aeloria</h3>
            <p className="text-sm italic text-accent mb-2">Elegance, Redefined.</p>
            <p className="text-sm text-gray-600">
              Curating timeless pieces for the modern woman. Every dress tells a story — let yours begin here.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-primary">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-gray-600 hover:text-accent transition">About Us</Link></li>
              <li><Link href="/collection" className="text-gray-600 hover:text-accent transition">Collection</Link></li>
              <li><Link href="/contact" className="text-gray-600 hover:text-accent transition">Contact</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-accent transition">Privacy Policy</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-primary">Contact</h4>
            <p className="text-sm text-gray-600 mb-2">Email: hello@aeloria.com</p>
            <p className="text-sm text-gray-600 mb-4">WhatsApp: +91 99744 20398</p>
            <div className="flex space-x-4 text-sm">
              <a href="#" className="text-gray-600 hover:text-accent transition">Instagram</a>
              <a href="#" className="text-gray-600 hover:text-accent transition">Facebook</a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-pink-200 mt-8 pt-8 text-center text-sm text-gray-600">
          © 2025 Aeloria. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
