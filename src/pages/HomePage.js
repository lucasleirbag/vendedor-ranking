import React, { useState, useEffect } from 'react';
import VendedorList from '../components/VendedorList';
import AddVendedorModal from '../components/AddVendedorModal';
import UpdateQuantidadeModal from '../components/UpdateQuantidadeModal';
import CompradoresModal from '../components/CompradoresModal';
import SearchBar from '../components/SearchBar';
import { Box, Button, Container, Typography } from '@mui/material';
import { getVendedores, deleteVendedor, addVendedor } from '../services/idbService';
import { useAuth } from '../context/AuthContext';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

function HomePage() {
    const [vendedores, setVendedores] = useState([]);
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
    const [isCompradoresModalOpen, setCompradoresModalOpen] = useState(false);
    const [vendedorToUpdate, setVendedorToUpdate] = useState(null);
    const [vendedorToShowCompradores, setVendedorToShowCompradores] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const { logout } = useAuth();

    useEffect(() => {
        loadVendedores();
    }, []);

    const loadVendedores = async () => {
        const data = await getVendedores();
        setVendedores(data);
    };

    const handleAddVendedor = () => setAddModalOpen(true);

    const handleUpdateQuantidade = (vendedor) => {
        setVendedorToUpdate(vendedor);
        setUpdateModalOpen(true);
    };

    const handleDeleteVendedor = async (vendedorId) => {
        const senha = prompt('Digite a senha para excluir o vendedor:');
        if (senha === 'senhaCorreta') {
            await deleteVendedor(vendedorId);
            loadVendedores(); // Recarregar a lista após a exclusão
        } else {
            alert('Senha incorreta!');
        }
    };

    const handleAddVendedorSubmit = async (novoVendedor) => {
        await addVendedor(novoVendedor);
        loadVendedores(); // Recarregar a lista após adicionar um novo vendedor
        setAddModalOpen(false); // Fechar o modal após a adição
    };

    const handleShowCompradores = (vendedor) => {
        setVendedorToShowCompradores(vendedor);
        setCompradoresModalOpen(true);
    };

    const filteredVendedores = vendedores.filter((vendedor) =>
        vendedor.nome.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Calcula o ranking das congregações
    const congregacaoRanking = vendedores.reduce((acc, vendedor) => {
        acc[vendedor.congregacao] = (acc[vendedor.congregacao] || 0) + vendedor.quantidade;
        return acc;
    }, {});

    const congregacaoRankingSorted = Object.entries(congregacaoRanking)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3);

    const getTrophyColor = (index) => {
        if (index === 0) return 'gold';
        if (index === 1) return 'silver';
        if (index === 2) return '#cd7f32'; // Bronze
        return null;
    };

    return (
        <Container maxWidth="sm" sx={{ padding: 2 }}>
            <SearchBar onSearch={setSearchQuery} />
            <Box sx={{ display: 'flex', justifyContent: 'space-around', marginY: 2 }}>
                {congregacaoRankingSorted.map(([congregacao, total], index) => (
                    <Box key={congregacao} sx={{ textAlign: 'center' }}>
                        <EmojiEventsIcon style={{ color: getTrophyColor(index), fontSize: '2rem' }} />
                        <Typography variant="h6">
                            {index + 1}° {congregacao}
                        </Typography>
                        <Typography variant="subtitle1">
                            {total} vendas
                        </Typography>
                    </Box>
                ))}
            </Box>
            <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ marginTop: 2, marginBottom: 2 }}
                onClick={handleAddVendedor}
            >
                Adicionar Vendedor
            </Button>
            <VendedorList 
                vendedores={filteredVendedores}
                onUpdateQuantidade={handleUpdateQuantidade} 
                onDelete={handleDeleteVendedor} 
                onShowCompradores={handleShowCompradores}
            />
            <AddVendedorModal 
                open={isAddModalOpen} 
                onClose={() => setAddModalOpen(false)} 
                onSubmit={handleAddVendedorSubmit}
            />
            <UpdateQuantidadeModal 
                open={isUpdateModalOpen} 
                onClose={() => setUpdateModalOpen(false)} 
                vendedor={vendedorToUpdate} 
            />
            <CompradoresModal
                open={isCompradoresModalOpen}
                onClose={() => setCompradoresModalOpen(false)}
                vendedor={vendedorToShowCompradores}
            />
            <Button
                variant="outlined"
                color="secondary"
                fullWidth
                sx={{ marginTop: 2 }}
                onClick={logout}
            >
                Sair
            </Button>
        </Container>
    );
}

export default HomePage;
