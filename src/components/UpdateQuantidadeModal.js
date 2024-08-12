import React, { useState } from 'react';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { updateVendedor, getVendedores } from '../services/idbService';
import '../styles/styles.css';

function UpdateQuantidadeModal({ open, onClose, vendedor }) {
    const [quantidade, setQuantidade] = useState('');
    const [comprador, setComprador] = useState('');
    const [numeroComprador, setNumeroComprador] = useState('');

    const handleSubmit = async () => {
        if (!quantidade || !comprador || !numeroComprador) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        const vendedores = await getVendedores();
        const numeroExistente = vendedores.some(v => v.numeroComprador === numeroComprador);

        if (numeroExistente) {
            alert('Este número de comprador já foi usado por outro vendedor.');
            return;
        }

        vendedor.quantidade += parseInt(quantidade);
        vendedor.compradores.push({ nome: comprador, numero: numeroComprador });
        vendedor.numeroComprador = numeroComprador;

        await updateVendedor(vendedor.id, vendedor);
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box className="modal-content">
                <Typography className="modal-header">Adicionar Vendas</Typography>
                <Box className="modal-body">
                    <TextField
                        fullWidth
                        label="Quantidade Adicional"
                        value={quantidade}
                        onChange={(e) => setQuantidade(e.target.value)}
                        type="number"
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Nome do Comprador"
                        value={comprador}
                        onChange={(e) => setComprador(e.target.value)}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Número do Comprador"
                        value={numeroComprador}
                        onChange={(e) => setNumeroComprador(e.target.value)}
                        margin="dense"
                    />
                </Box>
                <Box className="modal-footer">
                    <Button className="primary" onClick={handleSubmit}>Atualizar</Button>
                    <Button className="secondary" onClick={onClose}>Cancelar</Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default UpdateQuantidadeModal;
