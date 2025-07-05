
### 📦 Express.js + TypeScript + Prisma Boilerplate

A scalable, production-ready backend starter kit built with **Express.js**, **TypeScript**, and **PostgreSQL** using **Prisma ORM**. It includes **JWT Authentication**, **Swagger API docs**, and **Winston logging** out of the box.

----------

### 🚀 Features

-   ✅ **Express.js** for routing & middleware
    
-   ✅ **TypeScript** for type-safe development
    
-   ✅ **Prisma ORM** with PostgreSQL
    
-   ✅ **JWT Authentication** (login/register)
    
-   ✅ **Swagger (OpenAPI)** docs at `/docs`
    
-   ✅ **Winston Logger** with file + console transports
    
-   ✅ **Modular structure** for scalability
    
-   ✅ **Environment configuration** via `.env`
    
-   ✅ **Error handling middleware**
    

----------

### 📁 Folder Structure

```
/src
 ├── config/         # Environment, logger, DB
 ├── controllers/    # Route handlers
 ├── middlewares/    # Auth, error, logger
 ├── routes/         # Route definitions
 ├── services/       # Business logic
 ├── prisma/         # Prisma schema and migrations
 ├── utils/          # Helpers (hashing, tokens, etc.)
 ├── docs/           # Swagger config
 ├── types/          # TypeScript custom types
 ├── app.ts          # Express app setup
 └── server.ts       # Entry point

```

----------

### 🛠️ Getting Started

```bash
git clone https://github.com/yourusername/express-ts-prisma-boilerplate
cd express-ts-prisma-boilerplate

cp .env.example .env
npm install

npx prisma migrate dev --name init
npm run dev

```

----------

### 📘 API Docs

-   Swagger UI: [http://localhost:3000/docs](http://localhost:3000/docs)
    

----------

### 🔐 Auth Routes

-   `POST /api/auth/register` – Register new user
    
-   `POST /api/auth/login` – Get JWT token
    
