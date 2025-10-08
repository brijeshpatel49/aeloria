<div align="center">
  <img src="public/logo2.png" alt="Aeloria Logo" width="200"/>
  
  # Aeloria
  ### Where Grace Meets Modern Elegance
  
  *Wear Extraordinary*
</div>

---

## About Aeloria

Aeloria is a premium women's fashion boutique offering elegant dresses, cord sets, and ethnic wear. Shop our curated collection featuring Cord Sets, Fancy Dresses, Fancy Cord, and Ready Made outfits.

## Technology Stack

### Core Framework
- **Next.js 14** - React framework with App Router
  - Server-side rendering (SSR) for SEO
  - Dynamic routing for product pages
  - API routes for serverless backend
  - Image optimization with automatic WebP/AVIF conversion
  - Force dynamic rendering for real-time updates

### Frontend Technologies
- **React 18** - Component-based UI library
  - Hooks (useState, useEffect, useContext)
  - Client and server components
  - Suspense and loading states
- **Tailwind CSS** - Utility-first CSS framework
  - Custom color palette (pink theme)
  - Responsive breakpoints
  - Custom animations and transitions
- **React Hot Toast** - Toast notification system

### Backend & Database
- **MongoDB** - NoSQL database
  - Collections: users, clothes
  - Flexible schema for products
  - Aggregation pipelines for queries
- **MongoDB Node.js Driver** - Native MongoDB client
- **Next.js API Routes** - RESTful API endpoints
  - `/api/auth/*` - Authentication endpoints
  - `/api/dresses/*` - Product CRUD operations
  - `/api/user/*` - User data management

### Authentication System
- **JWT (jsonwebtoken)** - Token generation and verification
- **bcryptjs** - Password hashing (10 salt rounds)
- **js-cookie** - Client-side cookie management
- **HTTP-only Cookies** - Secure token storage
- **Role-based Access** - Admin and user roles
- **Protected Routes** - Middleware for authorization

### Image Handling
- **Google Drive API** - Cloud image storage
- **URL Conversion** - Automatic Drive link to thumbnail format
- **Next.js Image Component** - Optimized image delivery
  - Automatic format detection
  - Responsive sizing
  - Lazy loading with blur placeholders
  - CORS handling via Next.js proxy

### State Management
- **React Context API** - Global authentication state
- **Local State** - Component-level state with useState
- **Server State** - Real-time data fetching from MongoDB

### Search & Filtering
- **Client-side Filtering** - Real-time search results
- **Multi-criteria Search** - Name, category, ID
- **Smart Sorting** - Numeric and alphabetic ID handling
- **Category Filtering** - Filter by product type
- **Sort Options** - Price, name, date sorting

### E-commerce Features
- **Shopping Cart System**
  - Add/remove items
  - Quantity management
  - Duplicate prevention
  - Persistent cart in database
- **Favorites System**
  - Save products
  - Quick access to liked items
- **WhatsApp Integration**
  - Direct ordering
  - Address collection modal
  - Product details in message

### Admin Panel
- **Product Management**
  - Modal-based CRUD interface
  - Image upload via Google Drive
  - Auto-generated descriptions
  - Unique ID validation
  - Category management
- **Real-time Updates** - Changes reflect immediately
- **Toast Notifications** - Action feedback

### Performance Optimizations
- **Image Optimization** - AVIF/WebP formats, responsive sizes
- **Code Splitting** - Dynamic imports for smaller bundles
- **Compression** - Gzip/Brotli compression enabled
- **SWC Minification** - Fast JavaScript minification
- **Caching Strategy** - Image caching (60s TTL)
- **Loading States** - Skeleton screens for perceived performance

### SEO & Social Sharing
- **Open Graph Tags** - Rich previews on social media
- **Twitter Cards** - Optimized Twitter sharing
- **Dynamic Metadata** - Unique meta tags per product
- **Sitemap.xml** - Auto-generated sitemap
- **Robots.txt** - Search engine instructions
- **Structured Data Ready** - Schema.org markup support

### Security Features
- **Password Hashing** - bcrypt with salt rounds
- **JWT Tokens** - Secure authentication
- **HTTP-only Cookies** - XSS protection
- **CORS Configuration** - Controlled cross-origin requests
- **Input Validation** - Server-side validation
- **Error Handling** - Graceful error management

### Development Features
- **Hot Module Replacement** - Fast development refresh
- **TypeScript Ready** - Type safety support
- **Environment Variables** - Secure config management
- **Error Boundaries** - Graceful error handling
- **Console Logging** - Debugging support (production-ready)

### Deployment
- **Vercel Platform** - Optimized for Next.js
- **Serverless Functions** - Auto-scaling API routes
- **Edge Network** - Global CDN distribution
- **Automatic HTTPS** - SSL certificates included
- **Environment Variables** - Secure secrets management

---

<div align="center">
  
  ### Experience Elegance. Embrace Confidence. Wear Aeloria.
  
  Made with 💖 for women who love fashion
  
</div>
