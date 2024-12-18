
## Overview
The backend of this project is built using **Express.js** and **MongoDB Atlas**. It provides RESTful APIs for managing the blog content, including users, posts, and comments.

---

## Project Structure
```plaintext
src/
├── config/            # Configuration files (e.g., MongoDB connection)
├── controllers/       # Request handlers
├── middlewares/       # Custom middleware
├── models/            # MongoDB models
├── routes/            # API routes
├── utils/             # Helper functions
├── server.js          # Entry point for the backend application
```

---

## Setup and Installation

1. **Clone the Repository:**
   ```bash
   git clone <repository_url>
   cd backend
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Environment Variables:**
   Create a `.env` file in the root directory and add the following variables:
   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<database>?retryWrites=true&w=majority
   JWT_SECRET=your_jwt_secret
   ```

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```

   The server will run at `http://localhost:5000` by default.

---

## API Endpoints
### **Authentication**
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user

### **Posts**
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create a new post
- `GET /api/posts/:id` - Get a single post
- `PUT /api/posts/:id` - Update a post
- `DELETE /api/posts/:id` - Delete a post

### **Comments**
- `GET /api/posts/:id/comments` - Get comments for a post
- `POST /api/posts/:id/comments` - Add a comment to a post

---

## Dependencies
- Express.js
- Mongoose
- dotenv
- cors
- bcryptjs
- jsonwebtoken

---

## Notes
- Ensure MongoDB Atlas is properly configured and accessible.
- Use Postman or a similar tool to test the API endpoints.
- Keep the `JWT_SECRET` secure for authentication.

---

