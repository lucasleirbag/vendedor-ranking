import React, { useState } from 'react';
import { Box, IconButton, Typography, Pagination } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import '../styles/styles.css';

function VendedorList({ vendedores, onUpdateQuantidade, onDelete, onShowCompradores }) {
    const [page, setPage] = useState(1);
    const itemsPerPage = 20;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const paginatedVendedores = vendedores.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    const getTrophyColor = (index) => {
        if (index === 0) return 'gold';
        if (index === 1) return 'silver';
        if (index === 2) return '#cd7f32'; // Bronze
        return null;
    };

    return (
        <Box className="container">
            {paginatedVendedores.map((vendedor, index) => (
                <Box key={vendedor.id} className="vendedor-card">
                    <Box className="vendedor-title">
                        {index < 3 && (
                            <EmojiEventsIcon
                                style={{ color: getTrophyColor(index), marginRight: '8px' }}
                            />
                        )}
                        <Typography variant="h6" component="span">
                            {index + 1}° {vendedor.nome}
                        </Typography>
                    </Box>
                    <Box className="vendedor-info">
                        <span>Congregação: {vendedor.congregacao}</span>
                        <span>Quantidade Vendida: {vendedor.quantidade}</span>
                    </Box>
                    <Box className="vendedor-actions">
                        {onUpdateQuantidade && (
                            <IconButton className="add" onClick={() => onUpdateQuantidade(vendedor)}>
                                <AddIcon />
                            </IconButton>
                        )}
                        {onDelete && (
                            <IconButton className="delete" onClick={() => onDelete(vendedor.id)}>
                                <DeleteIcon />
                            </IconButton>
                        )}
                        <IconButton className="info" onClick={() => onShowCompradores(vendedor)}>
                            <RemoveRedEyeIcon />
                        </IconButton>
                    </Box>
                </Box>
            ))}
            <Pagination
                count={Math.ceil(vendedores.length / itemsPerPage)}
                page={page}
                onChange={handleChangePage}
                sx={{ marginTop: 2, marginBottom: 2 }}
                color="primary"
                shape="rounded"
                size="large"
            />
        </Box>
    );
}

export default VendedorList;
