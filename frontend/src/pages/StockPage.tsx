import { Box, Collapse, Container, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreatePO from "../Components/CreatePO";
import POSearchBar from "../Components/POSearchBar";
import PurchaseOrderCard from '../Components/PurchaseOrderCard';
import PurchaseOrderReview from "../Components/PurchaseOrderReview";
import Left from "../Containers/Left";
import Middle from "../Containers/Middle";
import Right from "../Containers/Right";
import FullRight from '../Containers/FullRight';
import Navbar from '../Components/Navbar';
import { ExpandLess, ExpandMore, StarBorder } from '@mui/icons-material';
import { NavLink, Outlet } from 'react-router-dom';

type PurchaseOrder = {
    orderId: string;
    orderDate: string;
    customerName: string;
    customerMobile: string;
    totalValue: number;
    status: 'draft' | 'completed';
    items: {
        itemId: string;
        description: string;
        quantity: number;
        unitPrice: number;
        taxRate: number;
        discountRate: number;
        totalPrice: number;
    }[];
};

// Fetch PO by orderId from the backend
const fetchPurchaseOrderById = async (orderId: string): Promise<PurchaseOrder | null> => {
    try {
        const response = await axios.get(`http://localhost:5000/api/purchase-orders/${orderId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching PO with ID ${orderId}:`, error);
        return null;
    }
};

const StockPage: React.FC = () => {
    const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([]);
    const [selectedPO, setSelectedPO] = useState<string | null>(null);
    const [poData, setPoData] = useState<PurchaseOrder | null>(null);

    useEffect(() => {
        const fetchPurchaseOrders = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/purchase-orders');
                setPurchaseOrders(response.data);
                console.log('Purchase Orders:', response.data);
            } catch (error) {
                console.error('Error fetching Purchase Orders:', error);
            }
        };

        fetchPurchaseOrders();
    }, []);

    // Function to handle clicking a PO card and fetching its details
    const handlePOCardClick = async (orderId: string) => {
        console.log('PO card clicked', orderId);
        const fetchedPO = await fetchPurchaseOrderById(orderId); // Fetch PO details
        if (fetchedPO) {
            setPoData(fetchedPO);
            setSelectedPO(orderId);
        } else {
            console.error('No PO found for ID:', orderId);
        }
    };

    return (
        <Box>
            <Navbar />
            <Stack direction={"row"} justifyContent={"space-between"}>
                {/* sidebar */}
                <Box flex={1} p={1} sx={{ display: { xs: "none", sm: "block" }, height: "100vh" }}>
                    <List
                        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                    >
                        <ListItemButton
                            component={NavLink}
                            to="search"
                            sx={{
                                // Styles applied to the active NavLink
                                '&.active': {
                                    backgroundColor: 'rgba(0, 0, 0, 0.08)',
                                },
                            }}
                        >
                            <ListItemText primary="Search" />
                        </ListItemButton>

                        <ListItemButton
                            component={NavLink}
                            to="add-new"
                            sx={{
                                '&.active': {
                                    backgroundColor: 'rgba(0, 0, 0, 0.08)',
                                },
                            }}
                        >
                            <ListItemText primary="Add new item" />
                        </ListItemButton>

                        <ListItemButton
                            component={NavLink}
                            to="all"
                            sx={{
                                '&.active': {
                                    backgroundColor: 'rgba(0, 0, 0, 0.08)',
                                },
                            }}
                        >
                            <ListItemText primary="All items" />
                        </ListItemButton>
                    </List>
                </Box>
                <Box flex={4} p={2}>
                    <Outlet />
                </Box>
            </Stack>
        </Box>
    );
};

export default StockPage;

