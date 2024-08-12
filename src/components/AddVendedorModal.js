import React, { useState } from 'react';
import { Box, Button, Modal, TextField, Select, MenuItem, Typography } from '@mui/material';
import '../styles/styles.css';

const congregacoes = [
    'Arapoangas QD 05', 'Arapoangas QD 19', 'Buritis III', 'Buritis IV',
    'Condomínio Cachoeira', 'Estância III', 'Itiquira', 'Nova Planaltina',
    'Quadra 04', 'Rajadinhal', 'Sede Jardim Roriz', 'Terra Conquistada',
    'Vale do Amanhecer', 'Vila Taquari'
];

function AddVendedorModal({ open, onClose, onSubmit }) {
    const [nome, setNome] = useState('');
    const [congregacao, setCongregacao] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [comprador, setComprador] = useState('');
    const [numeroComprador, setNumeroComprador] = useState('');

    const handleSubmit = () => {
        if (!nome || !congregacao || !quantidade || !comprador || !numeroComprador) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        const novoVendedor = {
            nome,
            congregacao,
            quantidade: parseInt(quantidade),
            compradores: [{ nome: comprador, numero: numeroComprador }],
            numeroComprador
        };

        onSubmit(novoVendedor);
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box className="modal-content">
                <Typography className="modal-header">Adicionar Vendedor</Typography>
                <Box className="modal-body">
                    <TextField
                        fullWidth
                        label="Nome do Vendedor"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        margin="dense"
                    />
                    <Select
                        fullWidth
                        value={congregacao}
                        onChange={(e) => setCongregacao(e.target.value)}
                        displayEmpty
                        margin="dense"
                    >
                        <MenuItem value="" disabled>Selecione uma Congregação</MenuItem>
                        {congregacoes.map((cong, idx) => (
                            <MenuItem key={idx} value={cong}>{cong}</MenuItem>
                        ))}
                    </Select>
                    <TextField
                        fullWidth
                        label="Quantidade Vendida"
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
                    <Button className="primary" onClick={handleSubmit}>Adicionar</Button>
                    <Button className="secondary" onClick={onClose}>Cancelar</Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default AddVendedorModal;
