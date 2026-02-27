# Admin Dashboard — Next.js + MUI + Zustand + NextAuth

A modern, responsive Admin Dashboard built with Next.js 14, Material UI (MUI),
Zustand for state management, and NextAuth.js for authentication.
All data is fetched from the public REST API at DummyJSON (https://dummyjson.com/).

---

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
git clone https://github.com/pravijain2004/Authentication-System
cd admin-dashboard
```

### Step 2 — Install Dependencies
```bash
npm install
```

### Step 3 — Run the Development Server
```bash
npm run dev
```

Open your browser and visit:
```
http://localhost:3000
```

### Step 4 — Build for Production (Optional)
```bash
npm run build
npm start
```

---

## Environment Variables

Create a `.env.local` file in the root of the project and add the following:
```env
NEXTAUTH_SECRET= MY_Secret

NEXTAUTH_URL=http://localhost:3000
```

| Variable           | Description                                             | Required |
|--------------------|---------------------------------------------------------|----------|
| NEXTAUTH_SECRET    | A random secret string used to encrypt JWT sessions     | Yes      |
| NEXTAUTH_URL       | The base URL of your app (use Vercel URL in production) | Yes      |

To generate a secure secret, run the following command in your terminal:
```bash
openssl rand -base64 32
```

Copy the output and paste it as the value of NEXTAUTH_SECRET in your `.env.local` file.

Note: Never commit your `.env.local` file to GitHub. Make sure it is listed in your `.gitignore` file.

---

## Demo Login Credentials
```
Username: emilys
Password: emilyspass
```

---

## Author

Name: Pravi Jain
GitHub: https://github.com/pravijain2004/Authentication-System
Email: pravi.jain12@gmail.com
