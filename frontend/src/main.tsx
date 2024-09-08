import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import HomePage from './pages/HomePage'
import Orders from './pages/Orders'
import TestPage from './pages/TestPage'
import AddUserPage from './pages/AddUser'

const router = createBrowserRouter([
    {
        path: "/1",
        element: <HomePage />,

    },
    {
        path: "/orders",
        element: <Orders />,
    },
    {
        path: "/test",
        element: <TestPage />,
    },
    {
        path: "/adduser",
        element: <AddUserPage />,
    },
])

console.log('Hello, world!')

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
)