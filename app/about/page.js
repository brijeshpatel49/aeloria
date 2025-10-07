export const metadata = {
  title: "About - Aeloria",
  description: "Learn about Aeloria's story and philosophy",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-5xl font-serif font-bold text-center mb-8 text-primary">About Aeloria</h1>
      
      <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
        <p>
          Aeloria is a curated collection of timeless dresses for the modern woman. 
          We believe in the power of simplicity — each piece is thoughtfully designed 
          to celebrate femininity, confidence, and effortless style.
        </p>
        
        <p>
          From intimate gatherings to unforgettable evenings, Aeloria dresses are made 
          to move with you. We source the finest fabrics and work with skilled artisans 
          to create pieces that stand the test of time.
        </p>
        
        <p>
          Our philosophy is simple: elegance should be accessible, style should be 
          effortless, and every woman deserves to feel beautiful in what she wears.
        </p>
        
        <div className="bg-gradient-to-br from-rose to-secondary p-8 mt-12 rounded-lg shadow-sm">
          <h2 className="text-3xl font-serif font-semibold mb-4 text-center text-primary">Our Values</h2>
          <ul className="space-y-4 mt-6">
            <li className="flex items-start">
              <span className="text-accent mr-3 text-xl">✦</span>
              <div>
                <strong className="text-primary">Quality First:</strong> We never compromise on fabric quality or craftsmanship.
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-accent mr-3 text-xl">✦</span>
              <div>
                <strong className="text-primary">Timeless Design:</strong> Our pieces are designed to be worn season after season.
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-accent mr-3 text-xl">✦</span>
              <div>
                <strong className="text-primary">Sustainable Choices:</strong> We prioritize eco-friendly materials and ethical production.
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
