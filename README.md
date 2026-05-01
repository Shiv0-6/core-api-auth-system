# Core API Auth System - Full Stack Project

A complete full-stack implementation of a scalable REST API with authentication and role-based access control, including a modern React.js frontend.

## Project Overview

This project demonstrates:
- Secure authentication with JWT tokens
- Password hashing with bcryptjs
- Role-based access control (RBAC)
- RESTful API design
- Frontend-backend integration
- API documentation with Swagger

## Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **API Documentation**: Swagger/OpenAPI

### Frontend
- **Library**: React.js v19
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Styling**: CSS3

## Quick Start

### Backend Setup

1. Navigate to backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up MySQL database:
```bash
mysql -u root -p < database.sql
```

4. Update `.env` file with your credentials:
```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=auth_system
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
```

5. Start the server:
```bash
npm start
```

Server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm start
```

Frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `GET /api/v1/auth/me` - Get current user (requires JWT)

### Tasks (CRUD)
- `POST /api/v1/tasks` - Create task
- `GET /api/v1/tasks` - Get all tasks (users see own, admins see all)
- `GET /api/v1/tasks/:id` - Get task by ID
- `PUT /api/v1/tasks/:id` - Update task
- `DELETE /api/v1/tasks/:id` - Delete task

### Documentation & Health
- `GET /api/v1/docs` - Swagger UI documentation
- `GET /api/v1/health` - API health check

## Project Structure

```
Core-api-auth-system/
├── backend/
│   ├── config/
│   │   └── db.js                 # MySQL connection pool
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic
│   │   └── taskController.js     # Task CRUD logic
│   ├── middleware/
│   │   └── auth.js               # JWT & role-based middleware
│   ├── routes/
│   │   ├── authRoutes.js         # Auth endpoints
│   │   └── taskRoutes.js         # Task endpoints
│   ├── .env                      # Environment variables
│   ├── database.sql              # Database schema
│   ├── package.json
│   ├── server.js                 # Express server entry
│   └── README.md
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── PrivateRoute.js
│   │   │   ├── TaskForm.js
│   │   │   ├── TaskList.js
│   │   │   └── TaskItem.js
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── AuthPages.css
│   │   │   ├── Dashboard.js
│   │   │   └── Dashboard.css
│   │   ├── api.js                # Axios configuration
│   │   ├── App.js                # Main component
│   │   ├── App.css
│   │   └── index.js
│   ├── package.json
│   ├── README.md
│   └── .gitignore
│
└── README.md (this file)
```

## Key Features

### Security
- ✅ Password hashing with bcryptjs (10 salt rounds)
- ✅ JWT token authentication
- ✅ Role-based access control (user/admin)
- ✅ Protected routes
- ✅ Input validation and sanitization
- ✅ CORS configuration
- ✅ Secure token storage (localStorage)

### Scalability
- ✅ Connection pooling for database
- ✅ Modular architecture (controllers, routes, middleware)
- ✅ API versioning (/api/v1)
- ✅ Error handling middleware
- ✅ Responsive frontend
- ✅ Can be containerized with Docker

### Development Features
- ✅ Environment variable configuration
- ✅ API documentation with Swagger
- ✅ Modern React patterns (hooks, context)
- ✅ Error messages and success notifications
- ✅ Loading states
- ✅ Form validation

## User Roles

### User Role
- Register and login
- Create, read, update, delete own tasks
- View own profile
- Cannot see other users' tasks

### Admin Role
- All user permissions
- View all tasks
- View all users (future enhancement)

## Database Schema

### Users Table
```sql
- id (PK)
- name
- email (UNIQUE)
- password (hashed)
- role (user/admin)
- created_at
- updated_at
```

### Tasks Table
```sql
- id (PK)
- user_id (FK)
- title
- description
- status (pending/in_progress/completed)
- created_at
- updated_at
```

## Example Usage

### Register User
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

### Response
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### Create Task
```bash
curl -X POST http://localhost:5000/api/v1/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Build API",
    "description": "Complete the REST API implementation"
  }'
```

## Testing

### Using Swagger UI
1. Start backend: `npm start`
2. Visit: `http://localhost:5000/api/v1/docs`
3. Use the interactive UI to test endpoints

### Using Postman
1. Import the API endpoints
2. Add Bearer token in Authorization header
3. Test each endpoint

### Using Frontend
1. Start frontend: `npm start`
2. Register new account
3. Login to dashboard
4. Create, edit, and delete tasks

## Deployment

### Heroku / Railway
1. Set environment variables
2. Connect GitHub repository
3. Deploy automatically

### Docker
```bash
# Build
docker build -t auth-system .

# Run
docker run -p 5000:5000 auth-system
```

## Environment Variables

### Backend (.env)
```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=auth_system
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api/v1
```

## Security Best Practices

1. ✅ Never commit `.env` files
2. ✅ Use strong JWT_SECRET
3. ✅ Hash passwords with salt
4. ✅ Validate all inputs
5. ✅ Use HTTPS in production
6. ✅ Set secure CORS origins
7. ✅ Implement rate limiting (optional)
8. ✅ Add logging and monitoring

## Performance Optimizations

1. Database connection pooling
2. Index on frequently queried columns
3. React memo for component optimization
4. Lazy loading routes
5. Code splitting

## Future Enhancements

- [ ] Email verification
- [ ] Password reset functionality
- [ ] Two-factor authentication
- [ ] Redis caching
- [ ] Rate limiting
- [ ] Request logging
- [ ] File uploads
- [ ] Pagination
- [ ] Search functionality
- [ ] Task categories/tags
- [ ] Task priorities
- [ ] Notifications
- [ ] Real-time updates (Socket.io)

## Troubleshooting

### Backend won't start
- Check MySQL is running
- Verify `.env` credentials
- Check port 5000 is available

### Frontend won't connect to API
- Verify backend is running on port 5000
- Check CORS is enabled
- Check API URL in frontend

### Database connection error
- Verify MySQL is running
- Check credentials in `.env`
- Ensure database exists

## Contributors

- Created as part of Backend Developer Intern assignment

## License

ISC

## Support

For issues or questions, please create an issue in the repository.

---

**Happy Coding!** 🚀
