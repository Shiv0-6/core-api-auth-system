# Quick Start Guide

Get the Auth System API up and running in 5 minutes!

## Prerequisites

- Node.js v14+
- MySQL server
- npm or yarn

## 1️⃣ Clone & Setup

```bash
cd Core-api-auth-system
```

## 2️⃣ Backend Setup (Terminal 1)

```bash
cd backend

# Install dependencies
npm install

# Create database
mysql -u root < database.sql

# Update .env with your MySQL credentials
# DB_PASSWORD=your_mysql_password

# Start server
npm start
```

✅ Backend running on http://localhost:5000

## 3️⃣ Frontend Setup (Terminal 2)

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

✅ Frontend running on http://localhost:3000

## 4️⃣ Test It Out

### Option A: Frontend (Recommended)

1. Visit http://localhost:3000
2. Click "Register"
3. Fill in the form and create account
4. Login with your credentials
5. Create, edit, and delete tasks

### Option B: Swagger API Docs

1. Visit http://localhost:5000/api/v1/docs
2. Use Swagger UI to test endpoints
3. Click "Authorize" to add JWT token

### Option C: curl Commands

```bash
# 1. Register
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'

# 2. Login (save token)
TOKEN=$(curl -s -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }' | grep -o '"token":"[^"]*' | cut -d'"' -f4)

# 3. Create Task
curl -X POST http://localhost:5000/api/v1/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "title": "My First Task",
    "description": "This is awesome!"
  }'

# 4. Get Tasks
curl -X GET http://localhost:5000/api/v1/tasks \
  -H "Authorization: Bearer $TOKEN"
```

## File Structure

```
Core-api-auth-system/
├── backend/
│   ├── controllers/       # Business logic
│   ├── routes/           # API endpoints
│   ├── middleware/       # Authentication
│   ├── config/           # Database config
│   ├── .env              # Environment variables
│   ├── database.sql      # Database schema
│   ├── server.js         # Express server
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── pages/        # Login, Register, Dashboard
│   │   ├── components/   # UI components
│   │   ├── context/      # Auth state management
│   │   ├── api.js        # API client
│   │   └── App.js        # Main component
│   └── package.json
│
├── README.md             # Full documentation
├── TESTING.md            # Testing guide
├── DEPLOYMENT.md         # Deployment guide
└── setup.sh              # Automated setup script
```

## Key Features

✅ User registration & login
✅ JWT authentication
✅ Role-based access control
✅ Task management (CRUD)
✅ Responsive React UI
✅ API documentation (Swagger)
✅ Password hashing
✅ Error handling

## API Endpoints

### Auth
- `POST /api/v1/auth/register` - Register
- `POST /api/v1/auth/login` - Login
- `GET /api/v1/auth/me` - Get current user

### Tasks
- `POST /api/v1/tasks` - Create task
- `GET /api/v1/tasks` - Get all tasks
- `GET /api/v1/tasks/:id` - Get task
- `PUT /api/v1/tasks/:id` - Update task
- `DELETE /api/v1/tasks/:id` - Delete task

### Info
- `GET /api/v1/health` - Health check
- `GET /api/v1/docs` - Swagger docs

## Environment Variables

### Backend (.env)

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=auth_system
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
```

## Troubleshooting

| Problem | Solution |
|---------|----------|
| "MySQL not running" | Start MySQL: `sudo service mysql start` |
| "Port 5000 in use" | Kill process: `lsof -i :5000 \| kill -9` |
| "Module not found" | Run `npm install` in that directory |
| "Cannot connect to API" | Check backend is running and CORS enabled |
| "Login failed" | Check database credentials in .env |

## Default Login Credentials

After setup, you can create an account directly in the app.

For testing, create one via:
- Frontend register form, OR
- curl command above

## Next Steps

📚 **Read Full Docs**: See [README.md](README.md)

🧪 **Testing Guide**: See [TESTING.md](TESTING.md)

🚀 **Deploy**: See [DEPLOYMENT.md](DEPLOYMENT.md)

## Scripts

```bash
# Backend
cd backend
npm start          # Start server
npm run dev        # Start with auto-reload (need nodemon)

# Frontend
cd frontend
npm start          # Start dev server
npm build          # Build for production
npm test           # Run tests
```

## Database Check

```bash
mysql -u root -p auth_system
SHOW TABLES;
SELECT * FROM users;
SELECT * FROM tasks;
```

## API Response Examples

### Success (200)
```json
{
  "message": "Operation successful",
  "data": {}
}
```

### Error (400/401/403/500)
```json
{
  "message": "Error description"
}
```

## Security Notes

⚠️ **Important for Production:**
- Change JWT_SECRET to strong random string
- Use strong database password
- Enable HTTPS
- Add rate limiting
- Setup logging
- Backup database regularly

## Performance Tips

💡 Use `npm run dev` for backend to enable auto-reload
💡 Clear browser cache if UI doesn't update
💡 Check Network tab in DevTools for API issues

## Getting Help

1. Check [TESTING.md](TESTING.md) for test scenarios
2. Review [DEPLOYMENT.md](DEPLOYMENT.md) for deployment help
3. Check backend console for errors
4. Check browser console for frontend errors
5. Check database with MySQL client

## What You Built

✨ A complete full-stack application with:
- Secure backend API
- JWT authentication
- Role-based access control
- Modern React frontend
- Production-ready code
- Comprehensive documentation

**Congratulations! Your application is ready!** 🎉

---

**Need more details?** Read the full [README.md](README.md)
