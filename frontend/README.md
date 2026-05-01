# Frontend UI - Task Manager

A modern React.js frontend for the Auth System API with authentication, dashboard, and task management.

## Features

- ✅ User registration and login
- ✅ JWT token management
- ✅ Protected routes (Private Route)
- ✅ Task CRUD operations
- ✅ Task filtering by status
- ✅ Responsive UI
- ✅ Error handling and success notifications
- ✅ Modern styling with gradients and animations

## Tech Stack

- **Frontend**: React.js v19
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Styling**: CSS3

## Setup Instructions

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file (optional, API defaults to localhost:5000):
```
REACT_APP_API_URL=http://localhost:5000/api/v1
```

3. Start the development server:
```bash
npm start
```

The app will open at `http://localhost:3000`

## Available Scripts

- `npm start` - Run development server
- `npm build` - Create production build
- `npm test` - Run tests

## Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── PrivateRoute.js       # Route protection component
│   │   ├── TaskForm.js           # Task creation form
│   │   ├── TaskList.js           # Task list display
│   │   └── TaskItem.js           # Individual task display
│   ├── context/
│   │   └── AuthContext.js        # Authentication context
│   ├── pages/
│   │   ├── Login.js              # Login page
│   │   ├── Register.js           # Registration page
│   │   └── Dashboard.js          # Main dashboard
│   ├── api.js                    # API client configuration
│   ├── App.js                    # Main App component
│   └── index.js                  # React entry point
├── package.json
└── README.md
```

## Workflow

### 1. Authentication Flow
- User registers → API creates user
- User logs in → API returns JWT token
- Token stored in localStorage
- Token automatically added to API requests

### 2. Dashboard
- Protected route (requires login)
- Display current user info
- Create new tasks
- View tasks with filtering
- Edit tasks inline
- Delete tasks

### 3. API Integration
- All API calls go through `src/api.js`
- JWT token automatically added to headers
- Error handling with user feedback

## Environment Variables

```
REACT_APP_API_URL=http://localhost:5000/api/v1
```

If not set, defaults to `http://localhost:5000/api/v1`

## Styling

- Responsive design (mobile-first)
- Modern gradients and shadows
- Hover effects and transitions
- Status badges with color coding
- Smooth animations

## Key Components

### AuthContext
Manages:
- User authentication state
- JWT token storage
- Login/Register/Logout functions
- Error messages

### PrivateRoute
- Protects `/dashboard` route
- Redirects to login if not authenticated
- Shows loading state while checking auth

### TaskForm
- Create new tasks
- Validation
- Loading and error states

### TaskList
- Display tasks
- Filter by status
- Shows count for each status

### TaskItem
- Display task details
- Edit inline
- Delete with confirmation
- Status selector

## Notes

- CORS is enabled on backend for frontend requests
- Token expires after 7 days (configurable)
- localStorage used for token persistence
- All timestamps displayed in local timezone

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

ISC
