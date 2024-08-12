import React from 'react';
import { Box, TextField } from '@mui/material';

function SearchBar({ onSearch }) {
    return (
        <Box className="search-bar-fixed">
            <TextField
                fullWidth
                variant="outlined"
                placeholder="Pesquisar..."
                onChange={(e) => onSearch(e.target.value)}
            />
        </Box>
    );
}

export default SearchBar;
