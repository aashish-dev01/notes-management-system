import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from "./context/Authcontext";
import { ThemeProvider } from './context/ThemeContext.jsx';
import { BrowserRouter } from "react-router-dom"
import './index.css'
import App from './App.jsx'
import App2 from './App2.jsx'

createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    <AuthProvider>
      <ThemeProvider>

        <App />

      </ThemeProvider>
    </AuthProvider>
  </BrowserRouter>
)
