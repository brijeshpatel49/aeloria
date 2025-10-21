export const metadata = {
  title: "Contact - Aeloria",
  description: "Get in touch with Aeloria",
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-5xl font-serif font-bold text-center mb-8 text-primary">
        Contact Us
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-serif font-semibold mb-6 text-primary">
            Get in Touch
          </h2>
          <p className="text-gray-700 mb-6">
            Have questions about our dresses or need styling advice? We'd love
            to hear from you.
          </p>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2 text-primary">Email</h3>
              <a
                href="mailto:hello@aeloria.com"
                className="text-accent hover:text-darkPink transition"
              >
                hello@aeloria.com
              </a>
            </div>

            <div>
              <h3 className="font-semibold mb-2 text-primary">WhatsApp</h3>
              <a
                href="https://wa.me/9974420398"
                className="text-accent hover:text-darkPink transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                +91 99744 20398
              </a>
            </div>

            <div>
              <h3 className="font-semibold mb-2 text-primary">
                Business Hours
              </h3>
              <p className="text-gray-700">
                Monday - Saturday: 9:00 AM - 6:00 PM
              </p>
              <p className="text-gray-700">Sunday: Closed</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-rose to-secondary p-8 rounded-lg shadow-sm">
          <h2 className="text-2xl font-serif font-semibold mb-6 text-primary">
            How to Order
          </h2>
          <p className="text-gray-700 mb-6">
            Browse our collection and order directly through WhatsApp. Simply
            click the "Order on WhatsApp" button on any dress page, and we'll
            help you complete your order.
          </p>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2 text-primary">Easy Process</h3>
              <p className="text-gray-700 text-sm">
                1. Browse our collection
                <br />
                2. Click "Order on WhatsApp"
                <br />
                3. Confirm details with us
                <br />
                4. Complete payment
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2 text-primary">Questions?</h3>
              <p className="text-gray-700 text-sm">
                Feel free to message us on WhatsApp anytime!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
