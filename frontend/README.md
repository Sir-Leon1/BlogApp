

## Overview
The frontend of this project is built using **React** and is responsible for rendering the user interface of the blog website. It communicates with the backend via API calls to fetch and manage data from the database.

---

## Project Structure
```plaintext
src/
├── assets/            # Static files (images, fonts, etc.)
├── components/        # Reusable React components
├── contexts/          # Context API for global state management
├── hooks/             # Custom React hooks
├── pages/             # Page-level components
├── services/          # API service files for interacting with the backend
├── App.js             # Main application component
├── index.js           # Entry point for the React application
├── routes.jsx          # Application routes
```

---

## Setup and Installation

1. **Clone the Repository:**
   ```bash
   git clone <repository_url>
   cd frontend
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Environment Variables:**
   Create a `.env` file in the root directory and add the following variables:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. **Run the Development Server:**
   ```bash
   npm start
   ```

   The application will run at `http://localhost:3000` by default.

---

## Build for Production
To create an optimized build for production, run:
```bash
npm run build
```

The build output will be available in the `build/` directory.

---

## Testing
To run tests:
```bash
npm test
```

---

## Dependencies
- React
- React Router
- Axios
- Context API

---

## Notes
- Ensure the backend is running and accessible via the `REACT_APP_API_URL`.
- Make sure to configure CORS appropriately on the backend.

---
