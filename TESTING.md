# Testing Guide

Comprehensive testing guide for the Auth System API and Frontend.

## Testing Environment Setup

### Prerequisites

- Backend running on http://localhost:5000
- Frontend running on http://localhost:3000
- MySQL database running
- Postman (optional, for API testing)

### Start Services

```bash
# Terminal 1: Backend
cd backend
npm start

# Terminal 2: Frontend
cd frontend
npm start
```

## API Testing

### Using Postman

1. **Download Postman** from https://www.postman.com/downloads/

2. **Create Collection** named "Auth System API"

3. **Add Requests**:

#### Register User

```
Method: POST
URL: http://localhost:5000/api/v1/auth/register
Headers: Content-Type: application/json
Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

Expected Response (201):
```json
{
  "message": "User registered successfully"
}
```

#### Login

```
Method: POST
URL: http://localhost:5000/api/v1/auth/login
Headers: Content-Type: application/json
Body:
{
  "email": "john@example.com",
  "password": "password123"
}
```

Expected Response (200):
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

#### Get Current User

```
Method: GET
URL: http://localhost:5000/api/v1/auth/me
Headers: 
  Authorization: Bearer <your_token_here>
  Content-Type: application/json
```

Expected Response (200):
```json
{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

#### Create Task

```
Method: POST
URL: http://localhost:5000/api/v1/tasks
Headers: 
  Authorization: Bearer <your_token_here>
  Content-Type: application/json
Body:
{
  "title": "Build API",
  "description": "Complete the REST API implementation"
}
```

Expected Response (201):
```json
{
  "message": "Task created successfully"
}
```

#### Get All Tasks

```
Method: GET
URL: http://localhost:5000/api/v1/tasks
Headers: 
  Authorization: Bearer <your_token_here>
  Content-Type: application/json
```

Expected Response (200):
```json
{
  "tasks": [
    {
      "id": 1,
      "user_id": 1,
      "title": "Build API",
      "description": "Complete the REST API implementation",
      "status": "pending",
      "created_at": "2024-05-01T10:30:00Z",
      "updated_at": "2024-05-01T10:30:00Z"
    }
  ]
}
```

#### Update Task

```
Method: PUT
URL: http://localhost:5000/api/v1/tasks/1
Headers: 
  Authorization: Bearer <your_token_here>
  Content-Type: application/json
Body:
{
  "title": "Build API (Updated)",
  "description": "Complete the REST API implementation with testing",
  "status": "in_progress"
}
```

Expected Response (200):
```json
{
  "message": "Task updated successfully"
}
```

#### Delete Task

```
Method: DELETE
URL: http://localhost:5000/api/v1/tasks/1
Headers: 
  Authorization: Bearer <your_token_here>
```

Expected Response (200):
```json
{
  "message": "Task deleted successfully"
}
```

### Using curl

```bash
# Register
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'

# Login
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'

# Get current user (replace TOKEN)
curl -X GET http://localhost:5000/api/v1/auth/me \
  -H "Authorization: Bearer TOKEN"

# Create task
curl -X POST http://localhost:5000/api/v1/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{
    "title": "Test Task",
    "description": "This is a test"
  }'

# Get all tasks
curl -X GET http://localhost:5000/api/v1/tasks \
  -H "Authorization: Bearer TOKEN"
```

### Using Swagger UI

1. Visit: http://localhost:5000/api/v1/docs
2. Use the interactive Swagger interface
3. Click "Authorize" to add JWT token
4. Test all endpoints

## Frontend Testing

### Manual Testing Workflow

#### 1. Registration Flow

- [ ] Visit http://localhost:3000
- [ ] Click "Register here"
- [ ] Fill in form with:
  - Name: John Doe
  - Email: john@example.com
  - Password: password123
  - Confirm Password: password123
- [ ] Click Register button
- [ ] Should redirect to Login page

#### 2. Login Flow

- [ ] Visit http://localhost:3000/login
- [ ] Enter credentials from registration
- [ ] Click Login button
- [ ] Should redirect to Dashboard
- [ ] User name should display in header

#### 3. Task Creation

- [ ] In Dashboard, fill task form:
  - Title: "Test Task"
  - Description: "This is a test task"
- [ ] Click "Create Task"
- [ ] Success message should appear
- [ ] Task should appear in task list

#### 4. Task Filtering

- [ ] Create 3 tasks with different statuses
- [ ] Click on status filter buttons
- [ ] Verify only matching tasks display

#### 5. Task Editing

- [ ] Click "Edit" on a task
- [ ] Change title, description, and status
- [ ] Click "Save"
- [ ] Changes should reflect immediately

#### 6. Task Deletion

- [ ] Click "Delete" on a task
- [ ] Confirm deletion in dialog
- [ ] Task should disappear from list

#### 7. Logout

- [ ] Click "Logout" button
- [ ] Should redirect to Login page
- [ ] Token should be removed from localStorage

### Browser DevTools Testing

```javascript
// Check localStorage
localStorage.getItem('token')

// Clear storage
localStorage.clear()

// Check network requests
// Go to DevTools > Network tab
// Perform actions and observe requests
```

## Error Handling Testing

### Test Invalid Credentials

```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "nonexistent@example.com",
    "password": "wrongpassword"
  }'
```

Expected Response (401):
```json
{
  "message": "Invalid email or password"
}
```

### Test Missing Required Fields

```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com"
  }'
```

Expected Response (400):
```json
{
  "message": "Name, email, and password are required"
}
```

### Test Invalid Token

```bash
curl -X GET http://localhost:5000/api/v1/tasks \
  -H "Authorization: Bearer invalid_token_here"
```

Expected Response (401):
```json
{
  "message": "Invalid or expired token"
}
```

### Test Unauthorized Access

```bash
# Try to access another user's task (as different user)
curl -X GET http://localhost:5000/api/v1/tasks/999 \
  -H "Authorization: Bearer TOKEN"
```

Expected Response (404):
```json
{
  "message": "Task not found"
}
```

## Performance Testing

### Load Testing with ApacheBench

```bash
# Install
apt-get install apache2-utils

# Test endpoint
ab -n 1000 -c 10 http://localhost:5000/api/v1/health
```

### Response Time Check

```bash
curl -w "Response time: %{time_total}s\n" \
  -o /dev/null -s http://localhost:5000/api/v1/health
```

## Database Testing

### Verify Data

```bash
mysql -u root -p auth_system

# Check users
SELECT * FROM users;

# Check tasks
SELECT * FROM tasks;

# Verify foreign key
SELECT t.id, t.title, t.user_id, u.name 
FROM tasks t 
JOIN users u ON t.user_id = u.id;
```

## Security Testing

### Test CORS

```bash
curl -H "Origin: http://evil.com" \
  -H "Access-Control-Request-Method: GET" \
  -X OPTIONS http://localhost:5000/api/v1/health -v
```

### Test SQL Injection

```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin' OR '1'='1",
    "password": "anything"
  }'
```

Should be safe (return error, not bypass)

### Test XSS Prevention

In frontend, try creating task with:
```
Title: <script>alert("XSS")</script>
```

Should display as text, not execute script

## Test Scenarios Checklist

### Authentication
- [ ] Register with valid data
- [ ] Register with duplicate email (should fail)
- [ ] Register with missing fields (should fail)
- [ ] Login with correct credentials
- [ ] Login with wrong password (should fail)
- [ ] Token persistence after page refresh
- [ ] Logout clears token

### Task Management
- [ ] Create task as user
- [ ] Create task without title (should fail)
- [ ] View own tasks
- [ ] Update own task
- [ ] Update another user's task (should fail)
- [ ] Delete own task
- [ ] Delete another user's task (should fail)
- [ ] Filter tasks by status

### Role-Based Access
- [ ] Admin can see all tasks
- [ ] User can only see own tasks
- [ ] Admin can update any task
- [ ] User cannot update other's task

### Frontend UI
- [ ] Responsive on mobile
- [ ] Responsive on tablet
- [ ] Responsive on desktop
- [ ] Loading states display
- [ ] Error messages display
- [ ] Success messages display
- [ ] Forms validate input

## Continuous Integration Testing

### Using GitHub Actions

Create `.github/workflows/test.yml`:

```yaml
name: Tests

on: [push, pull_request]

jobs:
  backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: cd backend && npm install
      - run: cd backend && npm test

  frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: cd frontend && npm install
      - run: cd frontend && npm test
```

## Test Results

After completing all tests, document:
- [ ] All endpoints working correctly
- [ ] Authentication working
- [ ] Database operations successful
- [ ] Frontend displaying properly
- [ ] Error handling working
- [ ] Responsive design working
- [ ] No console errors
- [ ] No security vulnerabilities

## Common Issues and Solutions

### Issue: "Cannot GET /api/v1/tasks"
**Solution**: Check backend is running and token is provided

### Issue: "CORS error"
**Solution**: Verify CORS is enabled in backend server.js

### Issue: "Database connection failed"
**Solution**: Check MySQL is running and credentials are correct

### Issue: "Invalid token"
**Solution**: Re-login to get new token

### Issue: "Task not found"
**Solution**: Verify task ID and ownership

---

**Testing is complete when all scenarios pass!** ✅
