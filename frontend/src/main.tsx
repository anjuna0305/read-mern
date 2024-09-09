import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import HomePage from './pages/HomePage'
import Orders from './pages/Orders'
import TestPage from './pages/TestPage'
import StockPage from './pages/StockPage'
import StockSearch from './Containers/StockSearch'
import CreateNewStockItem from './Components/CreateNewStockItem'
import AllStockItems from './Components/AllStockItems'
import ItemInfo from './pages/ItemInfo'

const dummyItem = {
    itemName: "Wooden Chair",
    quantity: 50,
    price: 2500,
    description: "A comfortable wooden chair with a smooth finish.",
};

const router = createBrowserRouter([
    {
        path: "/",
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
        path: "/stock",
        element: <StockPage />,
        children: [
            {
                path: "search",
                element: <StockSearch />
            },
            {
                path: "add-new",
                element: <CreateNewStockItem />
            },
            {
                path: "all",
                element: <AllStockItems />
            },
            {
                path: "item",
                element: <ItemInfo item={dummyItem} />
            }
        ]
    }
])

console.log('Hello, world!')

ReactDOM.createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router} />
)