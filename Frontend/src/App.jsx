import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/protectedRoute";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster
  position="top-right"
  toastOptions={{
    duration: 3000,
    style: {
      background: "#1f2937",
      color: "#fff",
      borderRadius: "10px",
      padding: "16px",
    },
    success: {
      iconTheme: {
        primary: "#22c55e",
        secondary: "#fff",
      },
    },
    error: {
      iconTheme: {
        primary: "#ef4444",
        secondary: "#fff",
      },
    },
  }}
/>


      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/Dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

      </Routes>
    </>
  );
}

export default App;