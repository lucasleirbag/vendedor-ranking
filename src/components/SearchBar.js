import React from 'react';
import { TextField } from '@mui/material';

function SearchBar({ onSearch }) {
    return (
        <TextField
            fullWidth label="Pesquisar Vendedor"
            onChange={(e) => onSearch(e.target.value)}
            margin="normal"
        />
    );
}

export default SearchBar;
