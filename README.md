
# Task Manager Project

A simple task management application built using React for the frontend and Express.js with MongoDB for the backend.

## Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/try/download/community) (running locally or using a cloud provider like MongoDB Atlas)

## Project Structure

- `frontend`: The React frontend of the application.
- `backend`: The Express.js backend that interacts with the MongoDB database.

## Getting Started

Follow these steps to get the project running locally.

### Backend Setup

1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```

2. Install the necessary dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   node index.js
   ```

   This will start the backend on `http://localhost:3000`.

### Frontend Setup

1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```

2. Install the necessary dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   This will start the frontend on `http://localhost:3000`. You should be able to access the task manager web application in your browser.

## API Endpoints

The backend exposes the following API endpoints:

- **GET `/tasks`**: Fetch all tasks (can be filtered by search and completed status).
- **POST `/tasks`**: Create a new task.
- **GET `/tasks/:id`**: Get a specific task by ID.
- **PUT `/tasks/:id`**: Update a task by ID.
- **DELETE `/tasks/:id`**: Delete a task by ID.
- **PATCH `/tasks/:id/complete`**: Mark a task as completed.

## Features

- Add new tasks with a title, description, due date, and priority.
- View tasks in a list and search/filter them based on completion status.
- Mark tasks as completed or delete them.
- View task statistics (priority distribution and completion rate) in the form of charts.

## Dependencies

### Backend
- `express`: Web framework for Node.js.
- `mongoose`: MongoDB ORM for interacting with the database.
- `cors`: Middleware to allow cross-origin requests.

### Frontend
- `react`: Frontend framework for building the user interface.
- `axios`: Promise-based HTTP client for making API requests.
- `chart.js`: A charting library for displaying task statistics.
- `react-chartjs-2`: React wrapper for Chart.js.

## License

This project is open-source and available under the [MIT License](LICENSE).
