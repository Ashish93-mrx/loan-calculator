import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App'; 
import ThemeContextProvider from './context/ThemeContextProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
  
    <ThemeContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeContextProvider>
);