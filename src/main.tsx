import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Helmet } from 'react-helmet-async';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Helmet>
      <App />
    </Helmet>
    
  </StrictMode>
);
