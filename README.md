# E-Commerce Application

This is a full-stack e-commerce application built with Next.js, featuring product management, user authentication, and a responsive UI. It uses MongoDB as the database and includes features like user registration, product CRUD operations, and more.

## Features

- **User Authentication**: Secure login and registration using NextAuth with MongoDB.
- **Product Management**: Add, view, edit, and delete products via RESTful APIs.
- **Responsive Design**: Built with Tailwind CSS and DaisyUI for a modern, mobile-friendly interface.
- **Form Validation**: Client-side and server-side validation using Zod schemas.
- **Database Integration**: MongoDB for storing users and products.
- **Components**: Reusable components like Navbar, Swiper for product display, and modals for editing/deleting.

## Tech Stack

- **Frontend**: Next.js 16, React 19, Tailwind CSS, DaisyUI
- **Backend**: Next.js API Routes
- **Database**: MongoDB (Atlas)
- **Authentication**: NextAuth.js
- **Validation**: Zod
- **Other**: bcrypt for password hashing, Swiper for carousels

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, set up your environment variables. Create a `.env` file in the root directory with:

```
MONGO_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## API Endpoints

- `GET /api/products` - Fetch all products
- `POST /api/products` - Create a new product
- `GET /api/products/[id]` - Fetch a specific product
- `PUT /api/products/[id]` - Update a product
- `DELETE /api/products/[id]` - Delete a product
- `POST /api/register` - Register a new user
- `POST /api/auth/[...nextauth]` - Authentication routes

## Project Structure

- `app/` - Next.js app directory with pages and API routes
- `components/` - Reusable React components
- `lib/` - Utility functions, database connection, and validations
- `public/` - Static assets
