import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AllStockItems from "./Components/AllStockItems";
import CreateNewStockItem from "./Components/CreateNewStockItem";
import PrivateRoute from "./Components/PrivateRoute"; // Import PrivateRoute
import StockSearch from "./Containers/StockSearch";
import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider
import "./index.css";
import AddUserPage from "./pages/AddUser";
import HomePage from "./pages/HomePage";
import Orders from "./pages/Orders";
import StockPage from "./pages/StockPage";
import { default as LoginPage, default as TestPage } from "./pages/TestPage";

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
      </PrivateRoute>
    ),
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
    path: "/stock",
    element: <StockPage />,
    children: [
      {
        path: "search",
        element: <StockSearch />,
      },
      {
        path: "add-new",
        element: <CreateNewStockItem />,
      },
      {
        path: "all",
        element: <AllStockItems />,
      },
    ],
  },
  {
    path: "/login", // Add login route
    element: <LoginPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
