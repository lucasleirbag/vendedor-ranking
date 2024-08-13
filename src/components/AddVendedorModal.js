import React, { useState, useEffect } from 'react';
import { Box, Button, Modal, TextField, Select, MenuItem, Typography } from '@mui/material';
import { getVendedores } from '../services/idbService';
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
    const [numerosComprador, setNumerosComprador] = useState('');

    useEffect(() => {
        if (!open) {
            // Limpar os campos quando o modal for fechado
            setNome('');
            setCongregacao('');
            setQuantidade('');
            setComprador('');
            setNumerosComprador('');
        }
    }, [open]);

    const handleSubmit = async () => {
        if (!nome || !congregacao || !quantidade) {
            alert('Por favor, preencha os campos obrigatórios: Nome, Congregação e Quantidade.');
            return;
        }

        let numerosArray = [];
        if (numerosComprador) {
            numerosArray = numerosComprador.split(',').map(num => num.trim());

            const vendedores = await getVendedores();
            const numerosExistentes = vendedores.flatMap(v => v.compradores.flatMap(c => c.numeros || []));

            const numerosRepetidos = numerosArray.filter(num => numerosExistentes.includes(num));
            if (numerosRepetidos.length > 0) {
                alert(`Os números ${numerosRepetidos.join(', ')} já foram escolhidos por outro comprador.`);
                return;
            }
        }

        const novoVendedor = {
            nome,
            congregacao,
            quantidade: parseInt(quantidade),
            compradores: comprador ? [{ nome: comprador, numeros: numerosArray }] : [] // Adiciona comprador somente se preenchido
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
                        label="Nome do Comprador (Opcional)"
                        value={comprador}
                        onChange={(e) => setComprador(e.target.value)}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Números do Comprador (Opcional, separados por vírgula)"
                        value={numerosComprador}
                        onChange={(e) => setNumerosComprador(e.target.value)}
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
