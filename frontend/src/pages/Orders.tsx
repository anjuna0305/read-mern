import React from "react";
import CreatePO from "../Components/CreatePO";
import Middle from "../Containers/Middle";
import Left from "../Containers/Left";
import Right from "../Containers/Right";
import POSearchBar from "../Components/POSearchBar";
import { Container } from '@mui/material';
import PurchaseOrderCard from '../Components/PurchaseOrderCard';


const dummyPOs = [
    {
      "orderId": "PO12345",
      "orderDate": "2024-08-20",
      "customerName": "John Doe",
      "totalValue": 2500,
      "status": "draft" // "active" or "completed"
    },
    {
      "orderId": "PO12346",
      "orderDate": "2024-08-21",
      "customerName": "Jane Smith",
      "totalValue": 3400,
      "status": "active"
    },
    {
      "orderId": "PO12347",
      "orderDate": "2024-08-22",
      "customerName": "Michael Brown",
      "totalValue": 1200,
      "status": "completed"
    },
    {
      "orderId": "PO12348",
      "orderDate": "2024-08-23",
      "customerName": "Maria Garcia",
      "totalValue": 5000,
      "status": "active"
    },
    {
      "orderId": "PO12349",
      "orderDate": "2024-08-24",
      "customerName": "David Rodriguez",
      "totalValue": 800,
      "status": "completed"
    },
    {
      "orderId": "PO12350",
      "orderDate": "2024-08-25",
      "customerName": "Jennifer Wilson",
      "totalValue": 10000,
      "status": "active"
    },
    {
      "orderId": "PO12351",
      "orderDate": "2024-08-26",
      "customerName": "James Martinez",
      "totalValue": 2000,
      "status": "completed"
    },
    {
      "orderId": "PO12352",
      "orderDate": "2024-08-27",
      "customerName": "Patricia Hernandez",
      "totalValue": 3000,
      "status": "active"
    },
    {
      "orderId": "PO12353",
      "orderDate": "2024-08-28",
      "customerName": "Richard Lopez",
      "totalValue": 4000,
      "status": "completed"
    },
    {
      "orderId": "PO12354",
      "orderDate": "2024-08-29",
      "customerName": "Linda Gonzalez",
      "totalValue": 5000,
      "status": "active"
    }
  ]
  



const Orders = () => {
  return (
    <div>
      <Left>
        <h1>Ordersasfdwaesfeawsfwefweafawef</h1>
      </Left>
      <Middle>
        <CreatePO />
      </Middle>
      <Right>
        <POSearchBar/>
        <Container sx={{
          overflow: 'auto',
          maxHeight: 'calc(100vh - 150px)',
        }}>
          {dummyPOs.map((po) => (
            <PurchaseOrderCard
              key={po.orderId}
              orderId={po.orderId}
              orderDate={po.orderDate}
              customerName={po.customerName}
              totalValue={po.totalValue}
              status={po.status}
            />
          ))}
        </Container>

      </Right>
    </div>
  );
};

export default Orders;