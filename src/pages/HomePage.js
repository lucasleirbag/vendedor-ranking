import React, { useState, useEffect } from 'react';
import VendedorList from '../components/VendedorList';
import AddVendedorModal from '../components/AddVendedorModal';
import UpdateQuantidadeModal from '../components/UpdateQuantidadeModal';
import CompradoresModal from '../components/CompradoresModal';
import SearchBar from '../components/SearchBar';
import { Box, Button, Container } from '@mui/material';
import { getVendedores, deleteVendedor, addVendedor } from '../services/idbService';

function HomePage() {
    const [vendedores, setVendedores] = useState([]);
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
    const [isCompradoresModalOpen, setCompradoresModalOpen] = useState(false);
    const [vendedorToUpdate, setVendedorToUpdate] = useState(null);
    const [vendedorToShowCompradores, setVendedorToShowCompradores] = useState(null);

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

    return (
        <Container maxWidth="sm" sx={{ padding: 2 }}>
            <SearchBar onSearch={(query) => { /* Lógica de busca */ }} />
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
                vendedores={vendedores}
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
        </Container>
    );
}

export default HomePage;
