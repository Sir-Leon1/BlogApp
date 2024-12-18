import React, { useEffect, useState } from 'react';
import './index.css';
import axios from 'axios';
import AppRoutes from "./routes.jsx";

/**function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000')
      .then((response) => setMessage(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>Test React App</h1>
      <h1>{message.message}</h1>
    </div>
  );
}

export default App;

*/
function App() {
  return (
    <div>
      <AppRoutes />
    </div>
  );
}

export default App;
