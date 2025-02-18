import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { HomePageProvider } from './contexts/HomePageContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HomePageProvider>
      <App />
    </HomePageProvider>
  </StrictMode>
);