# 🚴‍♂️ Zero Bike Service – Backend API

A Bike Servicing Management System API built with Node.js, Express, TypeScript, Prisma ORM, and PostgreSQL. This system allows bike service centers to manage their customers, bikes, and service records efficiently.

🔗 **Live API URL**: [https://prisma-postgress-bike-curd.vercel.app/](https://prisma-postgress-bike-curd.vercel.app/)  
📁 **GitHub Repo**: [https://github.com/ProgrammerRashed/prisma-postress-curd-backend](https://github.com/ProgrammerRashed/prisma-postress-curd-backend)

---

## 📦 Technologies Used

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL

---

## 🧠 Features

### ✅ Customer Management
- `POST /api/customers` - Create a new customer
- `GET /api/customers` - Retrieve all customers
- `GET /api/customers/:id` - Retrieve a specific customer by ID
- `PUT /api/customers/:id` - Update customer details
- `DELETE /api/customers/:id` - Delete a customer

### ✅ Bike Management
- `POST /api/bikes` - Add a new bike
- `GET /api/bikes` - Retrieve all bikes
- `GET /api/bikes/:id` - Retrieve a specific bike by ID

### ✅ Service Record Management
- `POST /api/services` - Create a new service record
- `GET /api/services` - Retrieve all service records
- `GET /api/services/:id` - Retrieve a specific service record
- `PUT /api/services/:id/complete` - Mark a service as completed
- `GET /api/services/status` - Get all pending or overdue services (older than 7 days)

### 🧯 Added Global Error Handling
All errors follow a consistent format:
```json
{
  "success": false,
  "status": 404,
  "message": "Customer not found",
  "stack": "Optional stack trace"
}
```

---

# 🛠 Getting Started

To get started with the project, follow these steps:

## 1. Clone the Repository
Clone the repository using the following command:

```bash
git clone https://github.com/ProgrammerRashed/prisma-postress-curd-backend.git
cd prisma-postress-curd-backend
```

## 2. Install Dependencies
Install the required dependencies by running:

```bash
npm install
```

## 3. Setup Prisma and Migrate the Database
Generate the Prisma client and apply the database migrations:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

## 4. Start the Development Server
Run the development server using the following command:

```bash
npm run dev
```

---

# 🔐 Environment Variables

To configure the environment variables, create a `.env` file at the root of the project and add the following:

```env
DATABASE_URL=your_postgres_connection_string
```

### Example:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/zerobike
```

---

All done! Your server is up and running now. :)