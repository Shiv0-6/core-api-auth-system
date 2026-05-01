# Backend API - Auth System

A scalable REST API with authentication and role-based access control built with Node.js, Express, and MySQL.

## Features

- ✅ User registration & login with JWT authentication
- ✅ Password hashing with bcryptjs
- ✅ Role-based access control (user vs admin)
- ✅ CRUD APIs for tasks
- ✅ Swagger/OpenAPI documentation
- ✅ Input validation
- ✅ Error handling
- ✅ API versioning

## Tech Stack

- **Backend**: Node.js + Express.js
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **API Documentation**: Swagger/OpenAPI

## Setup Instructions

### Prerequisites

- Node.js (v14+)
- MySQL server running
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create MySQL database:
```bash
mysql -u root -p < database.sql
```

3. Update `.env` file with your MySQL credentials:
```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=auth_system
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
```

4. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login user
- `GET /api/v1/auth/me` - Get current user (requires JWT token)

### Tasks (CRUD)
- `POST /api/v1/tasks` - Create a new task (requires JWT token)
- `GET /api/v1/tasks` - Get all tasks (users see their own, admins see all)
- `GET /api/v1/tasks/:id` - Get task by ID
- `PUT /api/v1/tasks/:id` - Update a task
- `DELETE /api/v1/tasks/:id` - Delete a task

### Documentation
- `GET /api/v1/docs` - Swagger UI documentation
- `GET /api/v1/health` - Health check endpoint

## Example Usage

### Register
```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Create Task
```bash
curl -X POST http://localhost:5000/api/v1/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "My Task",
    "description": "Task description"
  }'
```

## Project Structure

```
backend/
├── config/
│   └── db.js          # Database configuration
├── controllers/
│   ├── authController.js    # Authentication logic
│   └── taskController.js    # Task CRUD logic
├── middleware/
│   └── auth.js        # JWT and role-based middleware
├── routes/
│   ├── authRoutes.js  # Authentication routes
│   └── taskRoutes.js  # Task routes
├── utils/             # Utility functions
├── .env               # Environment variables
├── database.sql       # Database schema
├── package.json
└── server.js          # Main server file
```

## Security Considerations

- Passwords are hashed using bcryptjs with salt rounds of 10
- JWT tokens are used for authentication
- Role-based access control for admin-only routes
- Input validation on all endpoints
- CORS enabled for frontend integration
- Environment variables for sensitive data

## Scalability

- Connection pooling for database
- Modular route structure for easy extension
- Middleware-based access control
- API versioning support
- Can be containerized with Docker

## License

ISC
