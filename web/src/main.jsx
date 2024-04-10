import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from "@/components/theme-provider";
import App from './App.jsx';
import './index.css';
import { VisibilityProvider } from './providers/VisibilityProvider.jsx';
import { StateProvider } from './providers/StateProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <VisibilityProvider>
        <StateProvider>
          <App />
        </StateProvider>
      </VisibilityProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
