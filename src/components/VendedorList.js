import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import '../styles/styles.css';  // Importando os estilos

function VendedorList({ vendedores, onUpdateQuantidade, onDelete, onShowCompradores }) {
    return (
        <Box className="container">
            {vendedores.map((vendedor, index) => (
                <Box key={vendedor.id} className="vendedor-card">
                    <Typography variant="h3" className="vendedor-title">
                        {index + 1}. {vendedor.nome}
                    </Typography>
                    <Box className="vendedor-info">
                        <span>Congregação: {vendedor.congregacao}</span>
                        <span>Quantidade Vendida: {vendedor.quantidade}</span>
                    </Box>
                    <Box className="vendedor-actions">
                        <IconButton className="add" onClick={() => onUpdateQuantidade(vendedor)}>
                            <AddIcon />
                        </IconButton>
                        <IconButton className="delete" onClick={() => onDelete(vendedor.id)}>
                            <DeleteIcon />
                        </IconButton>
                        <IconButton className="info" onClick={() => onShowCompradores(vendedor)}>
                            <RemoveRedEyeIcon />
                        </IconButton>
                    </Box>
                </Box>
            ))}
        </Box>
    );
}

export default VendedorList;
