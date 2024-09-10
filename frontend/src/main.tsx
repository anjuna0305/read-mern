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
import NoAccessPage from "./pages/NoAccess";
import { default as LoginPage, default as TestPage } from "./pages/TestPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/unauthorized",
    element: <NoAccessPage />,
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
    element: (
      <PrivateRoute requiredRole="stock_manager">
        <StockPage />
      </PrivateRoute>
    ),
    children: [
      {
        path: "search",
        element: (
          <PrivateRoute requiredRole="stock_manager">
            <StockSearch />
          </PrivateRoute>
        ),
      },
      {
        path: "add-new",
        element: (
          <PrivateRoute requiredRole="stock_manager">
            <CreateNewStockItem />
          </PrivateRoute>
        ),
      },
      {
        path: "all",
        element: (
          <PrivateRoute requiredRole="stock_manager">
            <AllStockItems />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
