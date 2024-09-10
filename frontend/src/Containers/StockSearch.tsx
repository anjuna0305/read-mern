import { List, ListItemText, TextField, Typography } from "@mui/material"
import React, { useState } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import { searchStockItem } from "../api/stockApi";
import { StockItem } from "../interfaces";
import { NavLink } from "react-router-dom";

const StockSearch = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchResults, setSearchResults] = useState<StockItem[]>([]);

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleSearch = async () => {
        const results = await searchStockItem(searchTerm)
        setSearchResults(results);
    };

    return (
        <div style={{ padding: '20px' }}>
            <TextField
                label="Search"
                variant="outlined"
                fullWidth
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type and press Enter to search..."
            />

            <div style={{ marginTop: '20px' }}>
                <Typography variant="h6">Search Results:</Typography>
                {searchResults.length > 0 ? (
                    <List>
                        {searchResults.map((result, index) => (
                            <ListItemButton
                                key={index}
                                component={NavLink}
                                to={`/stock/item/${result._id}`}
                            >
                                <ListItemText primary={result.itemName} />
                            </ListItemButton>
                        ))}
                    </List>
                ) : (
                    <Typography>No results found</Typography>
                )}
            </div>
        </div>
    );
}

export default StockSearch
