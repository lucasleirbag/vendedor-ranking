import React, { useState, useEffect } from 'react';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { updateVendedor, getVendedores } from '../services/idbService';
import '../styles/styles.css';

function UpdateQuantidadeModal({ open, onClose, vendedor }) {
    const [quantidade, setQuantidade] = useState('');
    const [comprador, setComprador] = useState('');
    const [numerosComprador, setNumerosComprador] = useState('');

    useEffect(() => {
        if (!open) {
            // Limpar os campos quando o modal for fechado
            setQuantidade('');
            setComprador('');
            setNumerosComprador('');
        }
    }, [open]);

    const handleSubmit = async () => {
        if (!quantidade || !comprador || !numerosComprador) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        const numerosArray = numerosComprador.split(',').map(num => num.trim());

        const vendedores = await getVendedores();
        const numerosExistentes = vendedores.flatMap(v => v.compradores.flatMap(c => c.numeros || []));

        const numerosRepetidos = numerosArray.filter(num => numerosExistentes.includes(num));
        if (numerosRepetidos.length > 0) {
            alert(`Os números ${numerosRepetidos.join(', ')} já foram escolhidos por outro comprador.`);
            return;
        }

        vendedor.quantidade += parseInt(quantidade);
        vendedor.compradores.push({ nome: comprador, numeros: numerosArray });

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
                        label="Números do Comprador (separados por vírgula)"
                        value={numerosComprador}
                        onChange={(e) => setNumerosComprador(e.target.value)}
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
