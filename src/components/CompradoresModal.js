import React from 'react';
import { Box, Modal, Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import '../styles/styles.css';

function CompradoresModal({ open, onClose, vendedor }) {
    return (
        <Modal open={open} onClose={onClose}>
            <Box className="modal-content" sx={{ maxWidth: 400, maxHeight: 500, overflow: 'hidden' }}>
                <Typography variant="h6" className="modal-header">{vendedor?.nome} - Compradores</Typography>
                <List 
                    className="modal-body" 
                    sx={{ maxHeight: 300, overflowY: 'auto', marginBottom: 2 }}
                >
                    {vendedor?.compradores.map((comprador, idx) => (
                        <ListItem key={idx}>
                            <ListItemText
                                primary={`${comprador.nome}`}
                                secondary={`Números: ${comprador.numeros ? comprador.numeros.join(', ') : 'Nenhum número informado'}`}
                            />
                        </ListItem>
                    ))}
                </List>
                <Box className="modal-footer">
                    <Button className="secondary" onClick={onClose}>Fechar</Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default CompradoresModal;
