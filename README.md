# Aeloria - Women's Dress Boutique

*Elegance, Redefined.*

A modern, elegant online boutique built with Next.js and MongoDB, featuring a curated collection of timeless dresses.

## Features

- 🎨 Elegant, minimal design with Tailwind CSS
- 📱 Fully responsive layout
- 🛍️ Product catalog with detailed dress pages
- 💬 WhatsApp integration for orders
- 🗄️ MongoDB ready for product management
- ⚡ Built with Next.js 14 App Router

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Update your WhatsApp number in `.env.local`:
```
NEXT_PUBLIC_WHATSAPP_NUMBER=your_number_here
MONGODB_URI=mongodb://localhost:27017/aeloria
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
aeloria/
├── app/
│   ├── page.js              # Homepage
│   ├── layout.js            # Root layout with Navbar & Footer
│   ├── globals.css          # Global styles
│   ├── collection/          # Collection page
│   ├── about/               # About page
│   ├── contact/             # Contact page
│   └── dress/[id]/          # Individual dress pages
├── components/
│   ├── Navbar.js
│   ├── Footer.js
│   ├── Hero.js
│   ├── FeaturedDresses.js
│   ├── AboutSection.js
│   └── WhatsAppButton.js
├── lib/
│   ├── dresses.js           # Dress data (placeholder)
│   └── mongodb.js           # MongoDB connection
└── public/                  # Static assets
```

## Customization

### Update WhatsApp Number
Edit `.env.local` and change `NEXT_PUBLIC_WHATSAPP_NUMBER`

### Add/Edit Dresses
Edit `lib/dresses.js` to modify the dress collection

### Styling
- Colors are defined in `tailwind.config.ts`
- Fonts: Playfair Display (serif) and Inter (sans-serif)

## MongoDB Integration

The project is set up for MongoDB. To use real data:

1. Set up MongoDB locally or use MongoDB Atlas
2. Update `MONGODB_URI` in `.env.local`
3. Create API routes to fetch dresses from the database
4. Replace the static `dresses` array with database queries

## Deployment

Deploy easily on Vercel:

```bash
npm run build
```

Then push to GitHub and connect to Vercel.

## License

© 2025 Aeloria. All rights reserved.
