import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import HomePage from './pages/HomePage'
import Orders from './pages/Orders'
import TestPage from './pages/TestPage'
import AddUserPage from './pages/AddUser'
import LoginPage from './pages/TestPage' // Import LoginPage
import { AuthProvider } from './context/AuthContext' // Import AuthProvider
import PrivateRoute from './Components/PrivateRoute' // Import PrivateRoute

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "/orders",
        element: (
        <PrivateRoute requiredRole="cashier">
                <Orders />
        </PrivateRoute>),
    },
    {
        path: "/test",
        element: <TestPage />,
    },
    {
        path: "/adduser",
        element: (
            <PrivateRoute requiredRole="admin">
                <AddUserPage />
            </PrivateRoute>
        ), 
    },

    {
        path: "/login", // Add login route
        element: <LoginPage />,
    },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </React.StrictMode>,
)
