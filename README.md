# Job Platform Backend

A comprehensive backend API for a job platform built with **TypeScript**, **Express.js**, **Prisma ORM**, and **PostgreSQL**. This backend powers user authentication, job postings, applications, payments, and AI-powered interview preparation.

---

## Tech Stack

| Category         | Technology                                                              |
| ---------------- | ----------------------------------------------------------------------- |
| **Runtime**      | Node.js                                                                 |
| **Language**     | TypeScript                                                              |
| **Framework**    | Express.js                                                              |
| **Database**     | PostgreSQL                                                              |
| **ORM**          | Prisma                                                                  |
| **Cache**        | Redis (email verification codes)                                        |
| **Auth**         | JWT (JSON Web Tokens) + bcryptjs                                        |
| **Payments**     | Stripe (Checkout Sessions & Webhooks)                                   |
| **File Storage** | Cloudinary                                                              |
| **AI**           | Google Gemini API (interview question generation)                       |
| **Email**        | Nodemailer (Gmail SMTP)                                                 |

---

## Features

### 👤 Authentication & Authorization
- User registration with role selection (`USER`, `RECRUITER`, `ADMIN`)
- JWT-based login with access tokens
- Email verification flow (6-digit code sent via email, stored in Redis with 10min TTL)
- Protected routes via auth middleware with role-based access control

### 👥 User Management
- User profiles with personal info (about, image, links, resume)
- Recruiter profiles with company details (name, image, about, website, location)
- Profile status tracking (Active / Inactive / Banned)

### 💼 Job Management
- **Recruiters** can create, update, and delete job postings
- Jobs include title, description, skills, salary range, location, job type (Remote/Onsite), contract type (Full-time/Part-time/Internship), experience level, and expiry date
- Advanced filtering: search by title, location, category, job type, contract type, experience level, salary range, and date posted
- Job status workflow: `PENDING_PAYMENT` → `ACTIVE` / `HOLD` / `EXPIRED`
- Users can bookmark jobs for later reference

### 📋 Applications
- Users can apply to jobs (one application per job per user enforced)
- Recruiters can view applications for their jobs
- Application status tracking: `APPLIED` → `SHORTLISTED` / `REJECTED`
- Paginated, searchable, and filterable application listings

### 💳 Payments (Stripe)
- Recruiters pay to activate job postings
- Stripe Checkout Session integration for secure payments
- Webhook handling for `checkout.session.completed` events
- Payment status tracking (`PENDING` / `SUCCESS` / `FAILED`)
- Revenue aggregation endpoint

### 🤖 AI-Powered Interview Preparation
- Generates personalized interview questions using **Google Gemini AI**
- Falls back to rule-based question generation if no API key is configured
- Provides preparation tips and key study topics
- Questions are tailored to job title, skills, experience level, and category
- Caches results per user-job combination; regenerates on repeat requests

### 🏠 Dashboard & Analytics
- Job status breakdown (active, pending, hold, expired counts)
- Top recruiters listing (sorted by job count)
- Total revenue from successful payments

---

## Project Structure

```
src/
├── app.ts                     # Express app setup, middleware, routes
├── server.ts                  # Server entry point (DB connect + listen)
├── config/
│   ├── prisma.ts              # Prisma client instance
│   ├── redis.ts               # Redis client connection
│   ├── stripe.ts              # Stripe SDK initialization
│   ├── cloudinary.ts          # Cloudinary configuration
│   └── index.d.ts             # Global type declarations (Express Request)
├── modules/
│   ├── auth/                  # Authentication (register, login, verify email)
│   ├── user/                  # User & Recruiter profile management
│   ├── job/                   # Job CRUD, applications, bookmarks
│   ├── category/              # Job categories
│   ├── payment/               # Stripe payments & webhooks
│   └── interview/             # AI-powered interview preparation
├── middlewares/
│   ├── checkAuth.ts           # JWT verification + role guard
│   ├── globalErrorHandler.ts  # Unified error handling (Prisma errors, etc.)
│   └── notFound.ts            # 404 catch-all
├── helper/
│   ├── appError.ts            # Custom error class
│   ├── jwtToken.ts            # Token generation & verification
│   └── emailSender.ts         # Nodemailer email sender
├── interfaces/
│   └── error.types.ts         # TypeScript interfaces for error responses
├── shared/
│   └── sendResponse.ts        # Unified response formatter
└── utils/
    └── index.ts               # Utility functions (contract normalizer)

prisma/
├── schema/
│   ├── schema.prisma          # User, Recruiter, UserInfo models + enums
│   ├── job.prisma             # Job & Category models
│   ├── application.prisma     # Application model
│   ├── interview.prisma       # InterviewPreparation model
│   └── payment.prisma         # Payment model
└── migrations/                # Database migrations
```

---

## Data Models

### User & Roles
- **User** — id, name, email, password (hashed), role (`USER`, `RECRUITER`, `ADMIN`), status, verified flag
- **Recruiter** — extended profile for recruiters (company info, website, location)
- **UserInfo** — extended profile for regular users (about, image, resume, social links)

### Jobs
- **Job** — title, description, location, skills, salary range, job type, contract type, experience level, status, category, recruiter reference
- **Category** — job categories (e.g., Engineering, Marketing, Design)

### Applications
- **Application** — links a user to a job with status tracking (unique per user-job pair)

### Payments
- **Payment** — Stripe session tracking, amount, status, linked to job and recruiter

### Interview Preparation
- **InterviewPreparation** — AI-generated questions, tips, topics per user-job combination

---

## API Endpoints

### Authentication (`/api/v1/auth`)
| Method | Endpoint                       | Auth Required | Description                  |
| ------ | ------------------------------ | :-----------: | ---------------------------- |
| POST   | `/auth/register`               |       ❌      | Register a new user          |
| POST   | `/auth/login`                  |       ❌      | Login and receive JWT token  |
| POST   | `/auth/send-verification-email`|   ✅ (User)   | Send email verification code |
| POST   | `/auth/verify-email`           |   ✅ (User)   | Verify email with code       |

### Users (`/api/v1/user`)
| Method | Endpoint                       | Auth Required | Description                  |
| ------ | ------------------------------ | :-----------: | ---------------------------- |
| ...    | `/user/*`                      |   ✅ (Auth)   | User profile CRUD            |

### Jobs (`/api/v1/job`)
| Method | Endpoint                       | Auth Required | Description                        |
| ------ | ------------------------------ | :-----------: | ---------------------------------- |
| POST   | `/job`                         |✅ (Recruiter) | Create a new job posting           |
| GET    | `/job`                         |       ❌      | List all active jobs (with filters)|
| GET    | `/job/:id`                     |       ❌      | Get single job details             |
| PATCH  | `/job/:id`                     |✅ (Recruiter) | Update a job (owner only)          |
| DELETE | `/job/:id`                     |✅ (Recruiter) | Soft-delete a job                  |
| POST   | `/job/apply/:jobId`            |   ✅ (User)   | Apply for a job                    |
| POST   | `/job/bookmark/:jobId`         |   ✅ (User)   | Bookmark a job                     |
| GET    | `/job/my-applications`         |   ✅ (User)   | Get user's applications            |
| GET    | `/job/bookmarked`              |   ✅ (User)   | Get user's bookmarked jobs         |
| ...    | Additional endpoints for recruiters, admin analytics, etc. | | |

### Payments (`/api/v1/payment`)
| Method | Endpoint                       | Auth Required | Description                   |
| ------ | ------------------------------ | :-----------: | ----------------------------- |
| POST   | `/payment/create-payment`      |   ✅ (Auth)   | Create Stripe checkout session|
| POST   | `/payment/webhook`             |       ❌      | Stripe webhook (raw body)     |
| GET    | `/payment/revenue`             |   ✅ (Admin)  | Get total revenue             |

### Categories (`/api/v1/category`)
| Method | Endpoint                       | Auth Required | Description                   |
| ------ | ------------------------------ | :-----------: | ----------------------------- |
| ...    | `/category/*`                  |       ❌      | Category CRUD                 |

### Interview Preparation (`/api/v1/interview`)
| Method | Endpoint                       | Auth Required | Description                          |
| ------ | ------------------------------ | :-----------: | ------------------------------------ |
| POST   | `/interview/generate/:jobId`   |   ✅ (User)   | Generate or refresh interview prep   |
| GET    | `/interview/:jobId`            |   ✅ (User)   | Get interview prep for a job         |
| GET    | `/interview`                   |   ✅ (User)   | Get all interview preps for user     |
| DELETE | `/interview/:jobId`            |   ✅ (User)   | Delete interview prep                |

---

## Getting Started

### Prerequisites
- Node.js >= 18
- PostgreSQL database
- Redis server (for email verification codes)
- Stripe account (for payment features)
- Google Gemini API key (optional, for AI interview features)
- Cloudinary account (optional, for file uploads)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YeasinWebDev/job-platform-backend.git
   cd job-platform-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   # Server
   PORT=5000
   NODE_ENV=development

   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/job-platform"

   # JWT
   JWT_SECRET_KEY="your-secret-key"

   # Redis
   redisHost="localhost"
   redisPort=6379
   redisPassword=""

   # Email (Gmail SMTP)
   emailSender_email="your-email@gmail.com"
   emailSender_app_pass="your-app-password"

   # Stripe
   STRIPE_SECRET_KEY="sk_test_..."
   FRONTEND_URL="http://localhost:5000"

   # Cloudinary
   CLOUDINARY_CLOUD_NAME="your-cloud-name"
   CLOUDINARY_API_KEY="your-api-key"
   CLOUDINARY_API_SECRET="your-api-secret"

   # Google Gemini AI (optional)
   GEMINI_API_KEY="your-gemini-api-key"
   ```

4. **Run database migrations**
   ```bash
   npx prisma migrate dev
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

   Server runs at `http://localhost:5000`.

---

## Available Scripts

| Command          | Description                          |
| ---------------- | ------------------------------------ |
| `npm run dev`    | Start dev server with hot reload     |
| `npm run build`  | Compile TypeScript to `./dist`       |
| `npm start`      | Run compiled JavaScript              |
| `npx prisma studio` | Open Prisma Studio (DB GUI)      |

---

## Architecture Notes

- **Modular monolith**: Each feature (auth, job, payment, interview) is self-contained with its own controller, route, and service.
- **Prisma multi-file schema**: Models are split across multiple `.prisma` files under `prisma/schema/` for better organization.
- **Error handling**: Centralized `globalErrorHandler` middleware that catches Prisma errors (unique constraint violations, validation errors, connection issues) and returns consistent JSON responses.
- **Response format**: Uniform response structure via `sendResponse` helper — all responses include `success`, `message`, `meta` (for pagination), and `data` fields.

---


## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

---

## License

This project is licensed under the ISC License.
