# Task Manager API

A RESTful API for managing tasks, built with Node.js and Express.js. This project is part of the Backend Engineering Launchpad program by Airtribe.

## Table of Contents
- [Description](#description)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Request/Response Examples](#requestresponse-examples)
- [Running Tests](#running-tests)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Error Handling](#error-handling)
- [Troubleshooting](#troubleshooting)

## Description

This is a simple Task Manager API that allows you to perform CRUD (Create, Read, Update, Delete) operations on tasks. The API provides endpoints to manage tasks with features like creating, reading, updating, and deleting tasks. It uses an in-memory data store for task persistence during runtime.

## Prerequisites

- **Node.js**: Version 18.0.0 or higher (required)
- **npm**: Node Package Manager (comes with Node.js)
- **Operating System**: Windows, macOS, or Linux

To check your Node.js version:
```bash
node --version
```

## Installation

1. **Clone or download the repository**
   ```bash
   git clone <repository-url>
   ```

2. **Navigate to the project directory**
   ```bash
   cd task-manager-api-anusha16-debug
   ```

3. **Install all dependencies**
   ```bash
   npm install
   ```

   This will install:
   - express: Web framework
   - nodemon: Development server with auto-reload
   - tap: Testing framework
   - supertest: HTTP assertion library

## Running the Application

### Option 1: Production Mode
Start the server using Node.js directly:
```bash
npm start
```

### Option 2: Development Mode (Recommended)
Start the server with auto-reload on file changes:
```bash
npm run dev
```

### Option 3: Using npx
```bash
npx nodemon app.js
```

**Server Output:**
```
Server is listening on 3000
```

The API will be available at: `http://localhost:3000`

## API Endpoints

### Base URL
```
http://localhost:3000/tasks
```

### Endpoints Overview

| Method | Endpoint | Description | Status Codes |
|--------|----------|-------------|--------------|
| GET | `/tasks` | Retrieve all tasks | 200, 500 |
| GET | `/tasks/:id` | Retrieve a specific task by ID | 200, 404, 500 |
| POST | `/tasks` | Create a new task | 201, 500 |
| PUT | `/tasks/:id` | Update an existing task | 200, 404, 500 |
| DELETE | `/tasks/:id` | Delete a task | 204, 404, 500 |

## Request/Response Examples

### 1. Get All Tasks
**Request:**
```http
GET http://localhost:3000/tasks
```

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "title": "Complete assignment",
    "description": "Finish the task manager API",
    "completed": false
  },
  {
    "id": 2,
    "title": "Review code",
    "description": "Review pull requests",
    "completed": true
  }
]
```

### 2. Get a Specific Task
**Request:**
```http
GET http://localhost:3000/tasks/1
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "title": "Complete assignment",
  "description": "Finish the task manager API",
  "completed": false
}
```

**Error Response:** `404 Not Found`
```json
{
  "error": "Task not found"
}
```

### 3. Create a New Task
**Request:**
```http
POST http://localhost:3000/tasks
Content-Type: application/json

{
  "title": "Write documentation",
  "description": "Create README file",
  "completed": false
}
```

**Response:** `201 Created`
```json
{
  "id": 3,
  "title": "Write documentation",
  "description": "Create README file",
  "completed": false
}
```

### 4. Update a Task
**Request:**
```http
PUT http://localhost:3000/tasks/1
Content-Type: application/json

{
  "title": "Complete assignment - Updated",
  "description": "Finish the task manager API with tests",
  "completed": true
}
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "title": "Complete assignment - Updated",
  "description": "Finish the task manager API with tests",
  "completed": true
}
```

**Error Response:** `404 Not Found`
```json
{
  "error": "Task not found"
}
```

### 5. Delete a Task
**Request:**
```http
DELETE http://localhost:3000/tasks/1
```

**Response:** `204 No Content`
```
(Empty response body)
```

**Error Response:** `404 Not Found`
```json
{
  "error": "Task not found"
}
```

## Running Tests

### Run all tests:
```bash
npm test
```

The test suite includes:
- Pre-test Node.js version check (must be >= 18)
- API endpoint tests using `tap` and `supertest`
- Coverage is disabled by default

**Test Output Example:**
```
Server is listening on 3000
✓ test/api.test.js > should get all tasks
✓ test/api.test.js > should get task by id
✓ test/api.test.js > should create a new task
✓ test/api.test.js > should update a task
✓ test/api.test.js > should delete a task
```

## Project Structure

```
task-manager-api-anusha16-debug/
│
├── app.js                      # Main application entry point
│   ├── Express app configuration
│   ├── Middleware setup (JSON, URL-encoded)
│   ├── Route mounting
│   └── Server startup
│
├── controllers/
│   └── taskController.js       # Business logic for task operations
│       ├── getAllTasks()       # Fetches all tasks
│       ├── getTaskById()       # Fetches task by ID
│       ├── createTask()        # Creates a new task
│       ├── updateTask()        # Updates existing task
│       └── deleteTask()        # Deletes a task
│
├── routes/
│   └── taskRoute.js            # API route definitions
│       └── Maps HTTP methods to controller functions
│
├── models/
│   └── courseModal.js          # In-memory data store (tasks array)
│
├── test/                       # Test files directory
│   └── *.js                    # Test cases for API endpoints
│
├── node_modules/               # Installed dependencies
│
├── package.json                # Project metadata and dependencies
├── package-lock.json           # Locked dependency versions
└── README.md                   # This file
```

## Technologies Used

- **Node.js** (v18+) - JavaScript runtime environment
- **Express.js** (v4.22.1) - Fast, minimalist web framework
- **Nodemon** (v3.1.11) - Auto-restart server on file changes
- **Tap** (v18.6.1) - Test Anything Protocol testing framework
- **Supertest** (v6.3.4) - HTTP assertions for testing APIs

## Error Handling

The API implements error handling for common scenarios:

### Client Errors (4xx)
- **404 Not Found**: Task with specified ID doesn't exist
  ```json
  { "error": "Task not found" }
  ```

### Server Errors (5xx)
- **500 Internal Server Error**: Unexpected server errors
  ```json
  { "error": "Internal server error" }
  ```

All errors are logged to the console for debugging purposes.

## Troubleshooting

### Problem: `nodemon: command not found`
**Solution:**
```bash
# Use npm scripts
npm run dev

# OR use npx
npx nodemon app.js

# OR install globally
npm install -g nodemon
```

### Problem: `Port 3000 is already in use`
**Solution:**
1. Find the process using port 3000:
   ```bash
   # Windows
   netstat -ano | findstr :3000
   taskkill /PID <PID> /F

   # Linux/Mac
   lsof -ti:3000 | xargs kill -9
   ```
2. Or change the port in `app.js`

### Problem: `Unsupported Node.js version`
**Solution:**
- Update Node.js to version 18 or higher
- Download from: https://nodejs.org/

### Problem: Module not found errors
**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Problem: Tests failing
**Solution:**
1. Ensure server is not already running on port 3000
2. Check Node.js version: `node --version`
3. Reinstall dependencies: `npm install`

## Development Workflow

1. **Start development server:**
   ```bash
   npm run dev
   ```

2. **Make code changes** - Server auto-restarts on save

3. **Test your changes:**
   ```bash
   npm test
   ```

4. **Use tools like Postman or curl** to test API endpoints

## API Testing Tools

### Using curl:
```bash
# Get all tasks
curl http://localhost:3000/tasks

# Create a task
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"New Task","description":"Task description","completed":false}'
```

### Using Postman:
1. Import the base URL: `http://localhost:3000/tasks`
2. Create requests for each endpoint
3. Test different scenarios

### Using VS Code REST Client:
Create a `.http` file:
```http
### Get all tasks
GET http://localhost:3000/tasks

### Create a task
POST http://localhost:3000/tasks
Content-Type: application/json

{
  "title": "Test Task",
  "description": "Testing",
  "completed": false
}
```

## License

ISC

## Author

**Airtribe** - Backend Engineering Launchpad Program

## Notes

- This API uses **in-memory storage** - all data is lost when the server restarts
- For production use, consider implementing a database (MongoDB, PostgreSQL, etc.)
- Add input validation for better error handling
- Implement authentication and authorization for security
- Add request logging middleware
- Consider adding rate limiting for production environments

---

**Happy Coding! 🚀**