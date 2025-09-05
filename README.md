### Live preview
You can see live preview of this by clicking : [StayFinder](https://stayfinder-4zh4.onrender.com/)

# StayFinder

StayFinder is a full-stack web application built with the MERN stack (MongoDB, Express.js, React, Node.js) that allows users to find, book, and manage accommodation listings. It serves as a comprehensive platform for both property owners to list their places and for travelers to find a place to stay.

## About The Project

This project is a clone of a popular accommodation booking website, designed to demonstrate a wide range of modern web development practices. It includes features like user authentication, property listing management, booking, and image handling.

## Built With

This project utilizes a variety of modern technologies:

### Frontend
*   **React:** A JavaScript library for building user interfaces.
*   **Vite:** A fast build tool and development server for modern web projects.
*   **React Router:** For declarative routing in the React application.
*   **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
*   **Axios:** A promise-based HTTP client for making requests to the backend.
*   **React Toastify:** For adding notifications to the app.


### Backend
*   **Node.js:** A JavaScript runtime for the server-side.
*   **Express.js:** A minimal and flexible Node.js web application framework.
*   **MongoDB:** A NoSQL database for storing application data.
*   **Mongoose:** An ODM (Object Data Modeling) library for MongoDB and Node.js.
*   **JSON Web Tokens (JWT):** For securing the application and authenticating users.
*   **Cloudinary:** A cloud-based service for image and video management.
*   **Multer:** A middleware for handling `multipart/form-data`, used for uploading files.
*   **CORS:** A package for enabling Cross-Origin Resource Sharing.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You need to have Node.js and npm (or yarn) installed on your machine.
*   npm
    ```sh
    npm install npm@latest -g
    ```

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/damodara2006/StayFinder.git
    cd StayFinder
    ```

2.  **Install Backend Dependencies:**
    Navigate to the `backend` directory and install the required packages.
    ```sh
    cd backend
    npm install
    ```

3.  **Install Frontend Dependencies:**
    Navigate to the `frontend` directory and install the required packages.
    ```sh
    cd ../frontend
    npm install
    ```

4.  **Set up Environment Variables:**
    In the `backend` directory, create a `.env` file and add the following environment variables. Replace the placeholder values with your actual credentials.
    ```
    PORT=8000
    MONGODB_URI=your_mongodb_connection_string
    CORS_ORIGIN=*
    ACCESS_TOKEN_SECRET=your_access_token_secret
    ACCESS_TOKEN_EXPIRY=1d
    REFRESH_TOKEN_SECRET=your_refresh_token_secret
    REFRESH_TOKEN_EXPIRY=10d
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    ```

## Usage

To run the application, you need to start both the backend and frontend servers.

1.  **Start the Backend Server:**
    From the `backend` directory, run:
    ```sh
    npm run dev
    ```
    The server will start on the port specified in your `.env` file (e.g., `http://localhost:8000`).

2.  **Start the Frontend Development Server:**
    From the `frontend` directory, run:
    ```sh
    npm run dev
    ```
    The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

## Contact

Project Link: [https://github.com/damodara2006/StayFinder](https://github.com/damodara2006/StayFinder)
