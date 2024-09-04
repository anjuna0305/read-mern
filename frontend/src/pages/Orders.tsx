import { Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreatePO from "../Components/CreatePO";
import POSearchBar from "../Components/POSearchBar";
import PurchaseOrderCard from '../Components/PurchaseOrderCard';
import PurchaseOrderReview from "../Components/PurchaseOrderReview";
import Left from "../Containers/Left";
import Middle from "../Containers/Middle";
import Right from "../Containers/Right";


// const dummyPOs = [
//     {
//       "orderId": "PO12345",
//       "orderDate": "2024-08-20",
//       "customerName": "John Doe",
//       "totalValue": 2500,
//       "status": "draft" // "active" or "completed"
//     },
//     {
//       "orderId": "PO12346",
//       "orderDate": "2024-08-21",
//       "customerName": "Jane Smith",
//       "totalValue": 3400,
//       "status": "draft"
//     },
//     {
//       "orderId": "PO12347",
//       "orderDate": "2024-08-22",
//       "customerName": "Michael Brown",
//       "totalValue": 1200,
//       "status": "completed"
//     },
//     {
//       "orderId": "PO12348",
//       "orderDate": "2024-08-23",
//       "customerName": "Maria Garcia",
//       "totalValue": 5000,
//       "status": "active"
//     },
//     {
//       "orderId": "PO12349",
//       "orderDate": "2024-08-24",
//       "customerName": "David Rodriguez",
//       "totalValue": 800,
//       "status": "completed"
//     },
//     {
//       "orderId": "PO12350",
//       "orderDate": "2024-08-25",
//       "customerName": "Jennifer Wilson",
//       "totalValue": 10000,
//       "status": "active"
//     },
//     {
//       "orderId": "PO12351",
//       "orderDate": "2024-08-26",
//       "customerName": "James Martinez",
//       "totalValue": 2000,
//       "status": "completed"
//     },
//     {
//       "orderId": "PO12352",
//       "orderDate": "2024-08-27",
//       "customerName": "Patricia Hernandez",
//       "totalValue": 3000,
//       "status": "active"
//     },
//     {
//       "orderId": "PO12353",
//       "orderDate": "2024-08-28",
//       "customerName": "Richard Lopez",
//       "totalValue": 4000,
//       "status": "completed"
//     },
//     {
//       "orderId": "PO12354",
//       "orderDate": "2024-08-29",
//       "customerName": "Linda Gonzalez",
//       "totalValue": 5000,
//       "status": "active"
//     }
//   ]

type PurchaseOrder = {
  orderId: string;
  orderDate: string;
  customerName: string;
  totalValue: number;
  status: string;
  // include other properties as needed
};

  
  const dummyPOPreview = {
    orderId: "PO12345",
    orderDate: "2024-08-27",
    customerName: "John Doe",
    customerMobile: "555-1234",
    items: [
      { itemId: "001", description: "Item 1", quantity: 2,unitPrice:250, taxRate: 0.18, discountRate: 0.05, totalPrice: 190.00 },
      { itemId: "002", description: "Item 2", quantity: 1,unitPrice:280, taxRate: 0.18, discountRate: 0.05, totalPrice: 95.00 },
      { itemId: "003", description: "Item 3", quantity: 1,unitPrice:320, taxRate: 0.18, discountRate: 0.05, totalPrice: 0.00 },
      { itemId: "004", description: "Item 4", quantity: 1,unitPrice:810, taxRate: 0.18, discountRate: 0.05, totalPrice: 0.00 },
    ],
    totalValue: 285.00,
    status: "draft"
  };
  
  




const Orders:React.FC = () => {

  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([]);

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

  const [selectedPO, setSelectedPO] = useState<string | null>(null); 
  const [poData, setPoData] = useState<any | null>(null); 

  const handlePOCardClick = (orderId: string) => {
    console.log('PO card clicked', orderId);
    const fetchedPO = purchaseOrders.find(po => po.orderId === orderId);
    if (fetchedPO) {
      setPoData(dummyPOPreview);
      setSelectedPO(orderId);
    }
  };
  return (
    <div>
      <Left>
        <h1>Ordersasfdwaesfeawsfwefweafawef</h1>
      </Left>
      <Middle>
        {!selectedPO ? (
          <CreatePO  />
        ) : (
          <PurchaseOrderReview
            // style={{ marginTop: '200px' }}
            orderId={poData.orderId}
            orderDate={poData.orderDate}
            customerName={poData.customerName}
            customerMobile={poData.customerMobile}
            items={poData.items}
            totalValue={poData.totalValue}
            status={poData.status}
            onModify={() => console.log('Modify clicked')}
            onSubmit={() => console.log('Submit clicked')}
            onDelete={() => {
              console.log('Delete clicked');
              setSelectedPO(null); 
            }}
          />
        )}
      </Middle>
      <Right>
        <POSearchBar onSearch={(poId: string) => console.log(poId)} />
        <Container sx={{
          overflow: 'auto',
          maxHeight: 'calc(100vh - 150px)',
        }}>
            {purchaseOrders.map((po) => (
              <PurchaseOrderCard
                key={po.orderId}
                orderId={po.orderId}
                orderDate={po.orderDate}
                customerName={po.customerName}
                totalValue={po.totalValue}
                status={po.status}
                onClick={() => handlePOCardClick(po.orderId)} 
              />
            ))}
        </Container>

      </Right>
    </div>
  );
};

export default Orders;