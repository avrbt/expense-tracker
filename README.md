# 💰 Expense Tracker Backend

A secure and scalable REST API for managing personal expenses, built with **Node.js**, **Express.js**, **PostgreSQL**, and **Prisma ORM**. The project includes JWT authentication, authorization, advanced filtering, pagination, sorting, expense analytics, and category-wise statistics.

---

## 🚀 Features

### 🔐 Authentication & Authorization

* User Registration
* User Login
* Password Hashing using **bcrypt**
* JWT Authentication
* Protected Routes
* User-specific Expense Management (Authorization)

### 💸 Expense Management

* Create Expense
* Get All Expenses
* Update Expense
* Delete Expense

### 📊 Analytics

* Total Expenses
* Total Transactions
* Average Expense
* Highest Expense
* Lowest Expense
* Category-wise Expense Statistics

### 🔍 Advanced Querying

* Search by Title or Category
* Filter by Category
* Filter by Minimum Amount
* Filter by Maximum Amount
* Sorting (Ascending & Descending)
* Pagination

### ✅ Validation

* Request Validation using **Zod**
* Validation Middleware

### ⚙️ Error Handling

* Centralized Error Handling Middleware

---

# 🛠 Tech Stack

* Node.js
* Express.js
* PostgreSQL
* Prisma ORM
* JWT (jsonwebtoken)
* bcryptjs
* Zod
* dotenv

---

# 📁 Project Structure

```text
expense-tracker/
│
├── config/
│   └── prisma.js
│
├── controllers/
│   ├── authController.js
│   └── expenseController.js
│
├── middleware/
│   ├── authMiddleware.js
│   ├── validate.js
│   └── errorHandler.js
│
├── prisma/
│   ├── migrations/
│   └── schema.prisma
│
├── routes/
│   ├── authRoutes.js
│   └── expenseRoutes.js
│
├── validators/
│   ├── authValidator.js
│   └── expenseValidator.js
│
├── .env
├── index.js
├── package.json
└── README.md
```

---

# 📦 Installation

## Clone Repository

```bash
git clone https://github.com/avrbt/expense-tracker.git
cd expense-tracker
```

## Install Dependencies

```bash
npm install
```

## Configure Environment Variables

Create a `.env` file:

```env
DATABASE_URL="your_postgresql_connection_string"
JWT_SECRET="your_secret_key"
```

---

## Run Database Migrations

```bash
npx prisma migrate dev
```

Generate Prisma Client:

```bash
npx prisma generate
```

---

## Start Server

```bash
node index.js
```

Server will run on:

```text
http://localhost:3000
```

---

# 🔑 Authentication APIs

## Register

```http
POST /auth/register
```

Request Body

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

---

## Login

```http
POST /auth/login
```

Request Body

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Returns:

```json
{
  "token": "JWT_TOKEN"
}
```

---

# 💸 Expense APIs

All expense routes require:

```http
Authorization: Bearer <JWT_TOKEN>
```

## Create Expense

```http
POST /expenses
```

```json
{
  "title": "Pizza",
  "amount": 300,
  "category": "Food"
}
```

---

## Get Expenses

```http
GET /expenses
```

Supports:

```text
?category=Food
?search=pizza
?minAmount=100
?maxAmount=1000
?sort=amount
?sort=-amount
?page=1
?limit=10
```

---

## Update Expense

```http
PUT /expenses/:id
```

---

## Delete Expense

```http
DELETE /expenses/:id
```

---

# 📈 Statistics APIs

## Overall Statistics

```http
GET /expenses/stats
```

Example Response

```json
{
  "totalTransactions": 8,
  "totalSpent": 5200,
  "averageExpense": 650,
  "highestExpense": 1500,
  "lowestExpense": 100
}
```

---

## Category Statistics

```http
GET /expenses/category-stats
```

Example Response

```json
[
  {
    "category": "Food",
    "totalSpent": 2500,
    "transactions": 4
  },
  {
    "category": "Travel",
    "totalSpent": 1800,
    "transactions": 2
  }
]
```

---

# 🗄 Database

The application uses **PostgreSQL** with **Prisma ORM**.

### User

* id
* email
* password
* createdAt

### Expense

* id
* title
* amount
* category
* createdAt
* userId

Relationship:

```
User (1) -------- (Many) Expense
```

---

# 🧪 Testing

Use **Postman** or **Bruno** to test all API endpoints.

Remember to include the JWT token in the Authorization header for protected routes.

---

# 🚀 Future Improvements

* Swagger API Documentation
* Docker Support
* Deployment (Render/Railway)
* Unit & Integration Testing
* File Uploads (Expense Receipts)
* Rate Limiting
* Logging
* Email Verification
* Password Reset

---

# 👨‍💻 Author

**Aviral Bajpai**

GitHub: https://github.com/avrbt
