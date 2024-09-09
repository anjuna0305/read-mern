import { List, ListItemText, TextField, Typography } from "@mui/material"
import React, { useState } from 'react';
import ListItemButton from '@mui/material/ListItemButton';

const StockSearch = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchResults, setSearchResults] = useState<string[]>([]);

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleSearch = () => {
        const results = mockSearch(searchTerm);  // Replace with actual search function/API call
        setSearchResults(results);
    };

    const mockSearch = (term: string): string[] => {
        const data = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
        return data.filter((item) => item.toLowerCase().includes(term.toLowerCase()));
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
                            >
                                <ListItemText primary={result} />
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
