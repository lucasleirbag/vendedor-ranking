import React, { useState, useEffect } from 'react';
import VendedorList from '../components/VendedorList';
import SearchBar from '../components/SearchBar';
import { Box, Container } from '@mui/material';
import { getVendedores } from '../services/idbService';
import CompradoresModal from '../components/CompradoresModal';  // Certifique-se de importar o modal

function PublicPage() {
    const [vendedores, setVendedores] = useState([]);
    const [selectedVendedor, setSelectedVendedor] = useState(null);

    useEffect(() => {
        async function fetchVendedores() {
            const data = await getVendedores();
            setVendedores(data);
        }

        fetchVendedores();
    }, []);

    const handleShowCompradores = (vendedor) => {
        setSelectedVendedor(vendedor);
    };

    return (
        <Container maxWidth="sm" sx={{ padding: 2 }}>
            <SearchBar onSearch={(query) => { /* Lógica de busca */ }} />
            <VendedorList
                vendedores={vendedores}
                onUpdateQuantidade={null}  // Não permite adicionar quantidade na página pública
                onDelete={null}            // Não permite deletar vendedores na página pública
                onShowCompradores={handleShowCompradores}
            />
            {selectedVendedor && (
                <CompradoresModal 
                    open={Boolean(selectedVendedor)} 
                    onClose={() => setSelectedVendedor(null)} 
                    vendedor={selectedVendedor} 
                />
            )}
        </Container>
    );
}

export default PublicPage;
