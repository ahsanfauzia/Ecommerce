# ShopKart - Full Stack E-Commerce Website

ShopKart is a full-stack e-commerce application built with Next.js, TypeScript, Tailwind CSS, Prisma, and SQLite. It includes product browsing, cart, checkout, authentication, wishlist, reviews, order history, receipts, and an admin dashboard.

## Features

- Product listing from database
- Product detail pages
- Category pages
- Product search
- Shopping cart
- Cart quantity update
- Checkout flow
- Demo payment methods
- Order saving in database
- User login and signup
- Cookie-based user sessions
- Wishlist
- Product reviews
- Order history
- Receipt page
- Profile page
- Admin dashboard
- Responsive UI
- Prisma ORM integration

## Tech Stack

- Next.js
- TypeScript
- React
- Tailwind CSS
- Prisma
- SQLite
- Lucide React Icons

## Project Structure

```txt
src/
  app/
    api/
    admin/
    cart/
    category/
    checkout/
    deals/
    login/
    orders/
    products/
    profile/
    search/
    signup/
    support/
    wishlist/
  components/
  lib/
  types/
prisma/
  schema.prisma
  seed.ts
```

## Getting Started

Install dependencies:

```bash
npm install
```

Create and sync the database:

```bash
npx prisma migrate dev
```

Seed demo products:

```bash
npx prisma db seed
```

Start the development server:

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```

## Environment Variables

Create a `.env` file in the project root:

```env
DATABASE_URL="file:./dev.db"
```

Do not commit `.env` to GitHub.

## Useful Commands

Open Prisma Studio:

```bash
npx prisma studio
```

Build the project:

```bash
npm run build
```

Run linting:

```bash
npm run lint
```

## Admin Access

1. Create an account from `/signup`.
2. Open Prisma Studio:

```bash
npx prisma studio
```

3. Open the `User` table.
4. Change your user's role from `CUSTOMER` to `ADMIN`.
5. Visit:

```txt
http://localhost:3000/admin
```

## Important Routes

```txt
/                 Home
/products         All products
/category/[name]  Category products
/search           Search results
/cart             Shopping cart
/checkout         Checkout
/login            Login
/signup           Signup
/wishlist         Wishlist
/orders           Order history
/orders/[id]      Receipt
/profile          User profile
/admin            Admin dashboard
```

## Future Improvements

- Real Razorpay integration
- Product image upload
- Admin product create/edit/delete pages
- Email order confirmation
- Coupons and discounts
- Product filter sidebar polish
- Deployment with PostgreSQL

## Author

Built as a full-stack e-commerce portfolio project.
