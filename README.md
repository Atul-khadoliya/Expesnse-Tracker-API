# Expense Tracker API
project URl = https://roadmap.sh/projects/expense-tracker-api
A simple RESTful API for tracking expenses, built with Node.js, Express, and MongoDB.

## Features

- User authentication (JWT-based)
- Add, update, delete, and fetch expenses
- Filter expenses by week, month, 3 months, or custom date range
- Passwords securely hashed with bcrypt

## Getting Started

### Prerequisites

- Node.js
- MongoDB (Atlas or local)

### Installation

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Create a `.env` file in the root directory with the following variables:

    ```
    JWT_SECRET=your_jwt_secret
    MONGO_URI=your_mongodb_connection_string
    PORT=3000
    ```

4. Start the server:

    ```
    node server.js
    ```

## API Endpoints

### Auth

- `POST /auth/signup` — Register a new user
- `POST /auth/login` — Login and receive a JWT token

### Expenses

All expense routes require an `Authorization: Bearer <token>` header.

- `POST /expense` — Add a new expense
- `PUT /expense/:id` — Update an expense
- `DELETE /expense/:id` — Delete an expense
- `GET /expense` — Get expenses (supports filters: `filter=week|month|3months` or `start` & `end` query params)

## Example Request

```sh
curl -H "Authorization: Bearer <token>" http://localhost:3000/expense?filter=month
```

## License

MIT
