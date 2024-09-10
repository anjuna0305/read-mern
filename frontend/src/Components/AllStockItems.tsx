import { Table, TableCell, TableContainer, TableRow, TableHead, TableBody } from "@mui/material"
import Paper from '@mui/material/Paper';
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getAllItems } from "../api/stockApi";
import { StockItem } from "../interfaces";

const AllStockItems = () => {
    const [items, setItems] = useState<StockItem[] | undefined>(undefined)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseData = await getAllItems()
                console.log(responseData)
                setItems(responseData)
            } catch (error) {
                setItems(undefined)
            }
        }
        fetchData()
    }, [])

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Item name</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">Prices</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items?.map((item) => (
                        <TableRow
                            key={item._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            hover
                            component={NavLink}
                            to={`/stock/item/${item._id}`}
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            <TableCell component="th" scope="row">{item.itemName}</TableCell>
                            <TableCell align="right">{item.quantity}</TableCell>
                            <TableCell align="right">{item.price}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default AllStockItems
