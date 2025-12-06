import React from "react"
import Signup from "./signup/Signup"
import LoginAlt from "./login/LoginAlt"
import Dashboard from "./dashboard/Dashboard"
import Settings from "./settings/Settings"
import AddExpense from "./expense/AddExpense"
import ProtectedRoute from "./components/ProtectedRoute"
import { Routes, Route } from "react-router-dom"

function App() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LoginAlt />} />
        <Route path="/login" element={<LoginAlt />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes - only accessible if logged in */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/add-expense" element={<AddExpense />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
