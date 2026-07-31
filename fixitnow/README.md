
# FixItNow 

#### FixItNow is a backend API for a home services marketplace. 

#### Uses **Prisma-Next** , which is latest cutting edge prisma api which is still in early access.
---
##  Tech Stack

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js + Express | REST API |
| TypeScript | Type safety  |
| Postgres + **Prisma-Next** | Database + ORM |
| JWT | Authentication |


## API Endpoints

### Authentication

| Method | Endpoint             | Description                             |
| ------ | -------------------- | --------------------------------------- |
| POST   | `/api/auth/register` | Register new user (customer/technician) |
| POST   | `/api/auth/login`    | Login user, return JWT                  |
| GET    | `/api/auth/me`       | Get current authenticated user          |

### Services & Technicians (Public)

| Method | Endpoint               | Description                                            |
| ------ | ---------------------- | ------------------------------------------------------ |
| GET    | `/api/services`        | Get all services with filters (type, location, rating) |
| GET    | `/api/technicians`     | Get all technicians with filters                       |
| GET    | `/api/technicians/:id` | Get technician profile with reviews                    |
| GET    | `/api/categories`      | Get all service categories                             |

### Bookings

| Method | Endpoint            | Description                   |
| ------ | ------------------- | ----------------------------- |
| POST   | `/api/bookings`     | Create new booking (customer) |
| GET    | `/api/bookings`     | Get user's bookings           |
| GET    | `/api/bookings/:id` | Get booking details           |

### Payments (Stripe / SSLCommerz)

| Method | Endpoint                | Description                                             |
| ------ | ----------------------- | ------------------------------------------------------- |
| POST   | `/api/payments/create`  | Create a payment intent/session for an accepted booking |
| POST   | `/api/payments/confirm` | Confirm/verify payment (webhook or callback)            |
| GET    | `/api/payments`         | Get user's payment history                              |

### Technician Management

| Method | Endpoint                       | Description                                     |
| ------ | ------------------------------ | ----------------------------------------------- |
| PUT    | `/api/technician/profile`      | Update technician profile                       |
| PUT    | `/api/technician/availability` | Update availability slots                       |
| GET    | `/api/technician/bookings`     | Get technician's bookings                       |
| PATCH  | `/api/technician/bookings/:id` | Update booking status (accept/decline/complete) |

### Reviews

| Method | Endpoint       | Description                          |
| ------ | -------------- | ------------------------------------ |
| POST   | `/api/reviews` | Create review (after job completion) |
| Get   | `/api/reviews/:id` | Get reviews for a particular technician |

### Admin

| Method | Endpoint                | Description                    |
| ------ | ----------------------- | ------------------------------ |
| GET    | `/api/admin/users`      | Get all users                  |
| PATCH  | `/api/admin/users/:id`  | Update user status (ban/unban) |
| GET    | `/api/admin/bookings`   | Get all bookings               |
| GET    | `/api/admin/categories` | Get all categories             |
| POST   | `/api/admin/categories` | Create new service category    |

---