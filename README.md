# 🛍️ Kuba - Modern E-commerce Platform

A full-stack e-commerce web application built with Next.js 15, TypeScript, and modern web technologies. Prostore provides a complete online store solution with both customer-facing and administrative features.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?style=for-the-badge&logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-6.5-2D3748?style=for-the-badge&logo=prisma)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🛒 Customer Features

- **Product Catalog** with search and filtering capabilities
- **Shopping Cart** with session persistence
- **User Authentication** (sign up/sign in with credentials)
- **Order Management** with complete order history
- **Product Reviews & Ratings** system with verified purchase badges
- **Multiple Payment Methods** (Stripe, PayPal, Cash on Delivery)
- **Shipping Address Management**
- **Responsive Design** optimized for all devices
- **Dark/Light Theme** support with system preference detection

### 👨‍💼 Admin Features

- **Product Management** (Create, Read, Update, Delete operations)
- **Order Management** with status tracking and fulfillment
- **User Management** with role-based access control
- **Analytics Dashboard** with overview statistics
- **Inventory Management** with real-time stock tracking

### 🔧 Technical Features

- **Role-based Authorization** (admin/user roles)
- **Session Management** with JWT tokens
- **Cart Persistence** across browser sessions
- **Email Notifications** for orders and receipts
- **Image Upload** for products with UploadThing
- **SEO Optimization** with dynamic metadata
- **Performance Optimization** with Next.js App Router

## 🏗️ Tech Stack

### Frontend

- **Next.js 15** with App Router
- **React 19** with TypeScript
- **Tailwind CSS** for styling
- **Radix UI** for accessible components
- **Lucide React** for icons
- **React Hook Form** with Zod validation
- **Next Themes** for theme management

### Backend & Database

- **Next.js API Routes**
- **Prisma ORM** with PostgreSQL
- **Neon Database** (serverless PostgreSQL)
- **NextAuth.js** for authentication

### Payment & Services

- **Stripe** for payment processing
- **PayPal** for alternative payments
- **UploadThing** for file uploads
- **Resend** for email services
- **React Email** for email templates

### Development Tools

- **Jest** for testing
- **ESLint** for code linting
- **Bun** as package manager

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ or Bun
- PostgreSQL database (or Neon account)
- Stripe account (for payments)
- PayPal account (for payments)
- UploadThing account (for file uploads)
- Resend account (for emails)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd prostore
   ```

2. **Install dependencies**

   ```bash
   bun install
   # or
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:

   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/prostore"

   # Authentication
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"

   # Payment Providers
   STRIPE_SECRET_KEY="sk_test_..."
   STRIPE_PUBLISHABLE_KEY="pk_test_..."
   PAYPAL_CLIENT_ID="your-paypal-client-id"
   PAYPAL_CLIENT_SECRET="your-paypal-client-secret"

   # File Upload
   UPLOADTHING_SECRET="your-uploadthing-secret"
   UPLOADTHING_APP_ID="your-uploadthing-app-id"

   # Email
   RESEND_API_KEY="your-resend-api-key"
   SENDER_EMAIL="noreply@yourdomain.com"

   # App Configuration
   NEXT_PUBLIC_APP_NAME="Prostore"
   NEXT_PUBLIC_APP_DESCRIPTION="A modern ecommerce store built with Next.js"
   NEXT_PUBLIC_SERVER_URL="http://localhost:3000"
   ```

4. **Set up the database**

   ```bash
   # Generate Prisma client
   bun run prisma generate

   # Run database migrations
   bun run prisma db push

   # Seed the database with sample data
   bun run prisma db seed
   ```

5. **Start the development server**

   ```bash
   bun run dev
   # or
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
prostore/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── (root)/            # Public pages
│   ├── admin/             # Admin dashboard
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── ui/               # Base UI components
│   ├── shared/           # Shared components
│   └── admin/            # Admin-specific components
├── lib/                  # Utility functions
│   ├── actions/          # Server actions
│   ├── constants/        # App constants
│   └── auth-guard.ts     # Authentication guard
├── db/                   # Database configuration
├── prisma/               # Database schema
├── email/                # Email templates
├── types/                # TypeScript types
└── tests/                # Test files
```

## 🔐 Authentication

The application uses NextAuth.js with credentials provider. Default admin credentials:

- **Email**: `admin@example.com`
- **Password**: `123456`

## 💳 Payment Setup

### Stripe

1. Create a Stripe account
2. Get your API keys from the Stripe dashboard
3. Add them to your environment variables

### PayPal

1. Create a PayPal developer account
2. Create an app to get client ID and secret
3. Add them to your environment variables

## 📧 Email Setup

1. Create a Resend account
2. Get your API key
3. Configure your sender email
4. Add them to your environment variables

## 🧪 Testing

Run the test suite:

```bash
# Run all tests
bun run test

# Run tests in watch mode
bun run test:watch
```

## 📧 Email Development

Preview email templates:

```bash
bun run email
```

This will start the email preview server at `http://localhost:3001`.

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

The app can be deployed to any platform that supports Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🔧 Available Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run start` - Start production server
- `bun run lint` - Run ESLint
- `bun run test` - Run tests
- `bun run test:watch` - Run tests in watch mode
- `bun run email` - Start email preview server
- `bun run prisma:seed` - Seed database with sample data

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](../../issues) page
2. Create a new issue with detailed information
3. Include steps to reproduce the problem

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Prisma](https://prisma.io/) for the database toolkit
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) for the accessible components
- [Stripe](https://stripe.com/) for payment processing
- [PayPal](https://paypal.com/) for alternative payments

---

Made with ❤️ using Next.js and modern web technologies
