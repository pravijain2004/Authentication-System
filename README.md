# Admin Dashboard — Next.js + MUI + Zustand + NextAuth

A modern, responsive Admin Dashboard built with Next.js 14, Material UI (MUI),
Zustand for state management, and NextAuth.js for authentication.
All data is fetched from the public REST API at DummyJSON (https://dummyjson.com/).

---

## Tech Stack

| Technology     | Purpose                          |
|----------------|----------------------------------|
| Next.js 14     | React framework (App Router)     |
| Material UI    | UI component library             |
| Zustand        | Global state management          |
| NextAuth.js    | Authentication (JWT-based)       |
| Axios          | HTTP client for API calls        |
| DummyJSON API  | Backend mock REST API            |

---

## Features

- Authentication — Login with NextAuth using DummyJSON credentials
- Protected Routes — Middleware blocks unauthenticated access to dashboard
- Users Module — List, search, paginate.
- Products Module — Grid view with search, category filter, and pagination
- Caching — Zustand-based page caching to avoid redundant API calls
- Responsive Design — Works on mobile, tablet, and desktop


## Setup Instructions

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js version 18.x or higher
- npm version 9.x or higher
- A code editor like VS Code

---

## Installation & Run Commands

### Step 1 — Clone the Repository
```bash
git clone https://github.com/your-username/admin-dashboard.git
cd admin-dashboard
```

### Step 2 — Install Dependencies
```bash
npm install
```

### Step 3 — Configure Environment Variables

Create a `.env.local` file in the root of the project and add the following:
```env
NEXTAUTH_SECRET=MY_Secret
NEXTAUTH_URL=http://localhost:3000
```

Note: Never share or commit your `.env.local` file to GitHub.
Make sure `.env.local` is listed in your `.gitignore` file.

### Step 4 — Run the Development Server
```bash
npm run dev
```

Open your browser and visit:
```
http://localhost:3000
```

### Step 5 — Build for Production (Optional)
```bash
npm run build
npm start
```

---

## Environment Variables

| Variable           | Description                                              | Required |
|--------------------|----------------------------------------------------------|----------|
| NEXTAUTH_SECRET    | A random secret string used to encrypt JWT sessions      | Yes      |
| NEXTAUTH_URL       | The base URL of your app (use Vercel URL in production)  | Yes      |

To generate a secure secret, run the following command in your terminal:
```bash
openssl rand -base64 32
```

Copy the output and paste it as the value of NEXTAUTH_SECRET in your `.env.local` file.

---

## Demo Login Credentials

This project uses DummyJSON for authentication.
Use the following test credentials to log in:
```
Username: emilys
Password: emilyspass
```

These credentials are provided by DummyJSON's public API. No real user account is required.

---

## Folder Structure
```
admin-dashboard/
├── app/
│   ├── (auth)/
│   │   └── login/page.tsx          # Login page
│   ├── (dashboard)/
│   │   ├── layout.tsx              # Sidebar + Navbar layout
│   │   ├── dashboard/page.tsx      # Dashboard home
│   │   ├── users/
│   │   │   ├── page.tsx            # Users list
│   │   │   └── [id]/page.tsx       # Single user detail
│   │   └── products/
│   │       ├── page.tsx            # Products list
│   │       └── [id]/page.tsx       # Single product detail
│   ├── api/auth/[...nextauth]/
│   │   └── route.ts                # NextAuth API route
│   └── layout.tsx                  # Root layout
├── store/
│   ├── authStore.ts                # Auth state (Zustand)
│   ├── usersStore.ts               # Users state + caching
│   └── productsStore.ts            # Products state + caching
├── components/
│   ├── SessionWrapper.tsx          # NextAuth session provider
│   └── ThemeProvider.tsx           # MUI theme wrapper
├── hooks/
│   └── useDebounce.ts              # Debounce hook for search
├── lib/
│   └── axios.ts                    # Axios base instance
├── types/
│   └── index.ts                    # TypeScript interfaces
├── middleware.ts                   # Route protection middleware
├── .env.local                      # Environment variables (not committed)
└── README.md
```

---

## API Reference

All data is sourced from https://dummyjson.com.

| Endpoint                                | Description              |
|-----------------------------------------|--------------------------|
| POST /auth/login                        | Authenticate user        |
| GET /users?limit=10&skip=0              | Paginated users list     |
| GET /users/search?q=john               | Search users             |
| GET /users/{id}                         | Single user details      |
| GET /products?limit=12&skip=0          | Paginated products list  |
| GET /products/search?q=phone           | Search products          |
| GET /products/category/{category}      | Filter by category       |
| GET /products/{id}                      | Single product details   |
| GET /products/categories               | All product categories   |

---

## What is Done and What is Pending

### Completed

- Login page with NextAuth and DummyJSON authentication
- JWT token stored via NextAuth session
- Protected dashboard routes using Next.js middleware
- Users list with search, pagination, and single user detail page
- Products list with search, category filter, pagination, and single product detail page
- Image carousel on single product page
- Zustand stores for auth, users, and products with async API actions
- Zustand-based client-side caching to avoid repeat API calls
- Responsive UI using Material UI across all pages
- useCallback and useMemo used to reduce unnecessary re-renders
- API-side pagination using limit and skip parameters

### Pending / Incomplete

- React.memo has not been applied to all components where it could be beneficial.
  It was partially implemented but not completed across every list item component
  due to time constraints.
- Client-side caching comments explaining the strategy in code are minimal.
  The caching logic works correctly but inline code comments were not added
  to every relevant section.
- Performance optimization for the products category filter could be improved.
  Currently the category list is re-fetched on page reload instead of being
  cached persistently in localStorage.

---

## Author

Name: Pravi Jain
GitHub: https://github.com/pravijain2004/Authentication-System
Email: pravi.jain12@gmail.com
