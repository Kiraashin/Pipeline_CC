import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/login-page-01";
import Register from "./components/register-01";
import DashboardShell from "./MainLayout"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/dashboard" element={<DashboardShell />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
