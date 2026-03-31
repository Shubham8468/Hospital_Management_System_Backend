# Hospital Management System — Backend API

A RESTful backend API for a hospital management system built with Node.js, Express, and MongoDB. It handles patient appointments, user authentication, messaging, and media uploads via Cloudinary.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [File Uploads](#file-uploads)
- [Error Handling](#error-handling)
- [Database](#database)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [Author](#author)
- [License](#license)

---

## Overview

This project serves as the backend for a full-stack hospital management application. It provides secure REST APIs for managing users (patients and doctors), booking and managing appointments, sending messages, and uploading files such as profile images to Cloudinary.

The server is designed with a modular router-based architecture, centralized error handling, and secure cookie-based JWT authentication.

---

## Tech Stack

| Technology         | Purpose                              |
|--------------------|--------------------------------------|
| Node.js            | JavaScript runtime                   |
| Express.js v5      | Web framework and routing            |
| MongoDB            | NoSQL database                       |
| Mongoose           | MongoDB object modeling (ODM)        |
| Cloudinary         | Cloud-based media/image storage      |
| JSON Web Token     | Stateless authentication             |
| bcrypt             | Password hashing                     |
| express-fileupload | Multipart file upload handling       |
| cookie-parser      | Cookie parsing middleware            |
| cors               | Cross-Origin Resource Sharing        |
| dotenv             | Environment variable management      |
| validator          | Input validation                     |
| nodemon            | Development auto-reload              |

---

## Project Structure

```
backend/
├── config/
│   └── .env                    # Environment variables (not committed)
├── middlewares/
│   └── error.middleware.js     # Global error handling middleware
├── router/
│   ├── message.router.js       # Message routes
│   ├── user.router.js          # User routes
│   └── appointment.router.js   # Appointment routes
├── app.js                      # Express app configuration
├── database.js                 # MongoDB connection logic
├── server.js                   # Server entry point and Cloudinary config
├── package.json
└── .gitignore
```

---

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- Node.js (v18 or higher recommended)
- npm (v9 or higher)
- MongoDB Atlas account or a local MongoDB instance
- Cloudinary account

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/hospital-management-backend.git
cd hospital-management-backend
```

2. Install dependencies:

```bash
npm install
```

### Environment Variables

Create a `config/` directory in the project root and add a `.env` file inside it:

```
config/
└── .env
```

Add the following variables to `config/.env`:

```env
# Server
PORT=3600

# MongoDB
MONGODB_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/

# Frontend URLs (comma-separated or individual)
FRONTEND_URL=http://localhost:5173
DASHBORD_URL=http://localhost:5174

# JWT
JWT_SECRET_KEY=your_jwt_secret
JWT_EXPIRES=7d

# Cloudinary
CLOUDINSRY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINSRY_API_SECRET=your_api_secret
```

> Note: If your MongoDB password contains special characters (such as `@`, `#`, `$`), URL-encode them. For example, `@` becomes `%40`.

### Running the Server

Start the development server with auto-reload:

```bash
npm test
```

The server will start at:

```
http://localhost:3600
```

---

## API Endpoints

All routes are prefixed with `/api/v1`.

### Message Routes

| Method | Endpoint              | Description         |
|--------|-----------------------|---------------------|
| POST   | /api/v1/message       | Send a new message  |
| GET    | /api/v1/message       | Get all messages    |

### User Routes

| Method | Endpoint                    | Description                     |
|--------|-----------------------------|---------------------------------|
| POST   | /api/v1/user/register       | Register a new user             |
| POST   | /api/v1/user/login          | Login and receive JWT cookie    |
| GET    | /api/v1/user/me             | Get logged-in user profile      |
| POST   | /api/v1/user/logout         | Logout and clear cookie         |
| GET    | /api/v1/user/doctors        | Get all registered doctors      |

### Appointment Routes

| Method | Endpoint                        | Description                    |
|--------|---------------------------------|--------------------------------|
| POST   | /api/v1/appointment             | Book a new appointment         |
| GET    | /api/v1/appointment             | Get all appointments (admin)   |
| PUT    | /api/v1/appointment/:id         | Update appointment status      |
| DELETE | /api/v1/appointment/:id         | Delete an appointment          |

> Actual routes may vary based on your router implementations. Update this table to reflect your exact route definitions.

---

## Authentication

This application uses **JSON Web Tokens (JWT)** for authentication. Upon successful login, a signed token is stored in an HTTP-only cookie and sent with every subsequent request.

- Passwords are hashed using **bcrypt** before being stored in the database.
- Protected routes validate the JWT from the cookie before granting access.
- Roles such as `patient`, `doctor`, and `admin` can be used to restrict access to specific endpoints.

---

## File Uploads

File uploads are handled using `express-fileupload`. Uploaded files are temporarily stored in the `/tmp/` directory on the server, then uploaded to **Cloudinary** for persistent cloud storage.

Cloudinary credentials are configured in `server.js` using environment variables.

---

## Error Handling

A centralized error handling middleware (`ErrorMiddleware`) is registered at the end of the Express middleware chain in `app.js`. All errors thrown from routes or controllers are caught and forwarded to this middleware, which sends a consistent JSON error response to the client.

Example error response format:

```json
{
  "success": false,
  "message": "Resource not found",
  "statusCode": 404
}
```

---

## Database

MongoDB is used as the primary database. The connection is managed through Mongoose in `database.js`.

- **Database name:** `hospital-management`
- The connection URL is loaded from the environment variable `MONGODB_URL`.
- Authentication errors are explicitly caught and logged with a descriptive message to aid debugging.

---

## Scripts

| Script       | Command       | Description                           |
|--------------|---------------|---------------------------------------|
| Development  | `npm test`    | Starts the server using nodemon       |

> The `test` script is mapped to `nodemon ./server.js` for development convenience. Consider adding a separate `start` script for production: `"start": "node ./server.js"`.

---

## Contributing

Contributions are welcome. To contribute:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push to your branch: `git push origin feature/your-feature-name`
5. Open a Pull Request.

Please ensure your code follows consistent formatting and that all existing functionality remains unaffected.

---

## Author

**Shubham**

---

## License

This project is licensed under the ISC License.
