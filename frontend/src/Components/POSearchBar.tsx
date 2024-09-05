// src/Components/POSearchBar.tsx
import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

interface POSearchBarProps {
  onSearch: (orderId: string) => void;
}

const POSearchBar: React.FC<POSearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      onSearch(searchTerm.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Box display="flex" alignItems="center" mb={2}>
      <TextField
        label="Search PO by ID"
        variant="outlined"
        size="small"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={handleKeyPress}
        sx={{ marginRight: 1, flex: 1 }}
      />
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Search
      </Button>
    </Box>
  );
};

export default POSearchBar;
