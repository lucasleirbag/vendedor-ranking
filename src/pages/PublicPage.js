import React, { useState, useEffect } from 'react';
import VendedorList from '../components/VendedorList';
import SearchBar from '../components/SearchBar';
import { Box, Container, Typography, IconButton } from '@mui/material';
import { getVendedores } from '../services/idbService';
import CompradoresModal from '../components/CompradoresModal';
import ShareIcon from '@mui/icons-material/Share';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import Signature from '../components/Signature';

function PublicPage() {
    const [vendedores, setVendedores] = useState([]);
    const [selectedVendedor, setSelectedVendedor] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

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

    const handleCopyLink = () => {
        const publicUrl = `${window.location.origin}/public`;
        navigator.clipboard.writeText(publicUrl).then(() => {
            alert('Link copiado para a área de transferência!');
        });
    };

    const filteredVendedores = vendedores.filter((vendedor) =>
        vendedor.nome.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
        <Container maxWidth="sm" sx={{ padding: 2, position: 'relative', minHeight: '100vh' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                <SearchBar onSearch={setSearchQuery} />
                <IconButton onClick={handleCopyLink} color="primary" aria-label="compartilhar link">
                    <ShareIcon />
                </IconButton>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginY: 2 }}>
                {congregacaoRankingSorted.map(([congregacao, total], index) => (
                    <Box key={congregacao} sx={{ textAlign: 'center', marginX: 2 }}>
                        <EmojiEventsIcon style={{ color: getTrophyColor(index), fontSize: '3rem' }} />
                        <Typography variant="h6">
                            {index + 1}° {congregacao}
                        </Typography>
                        <Typography variant="subtitle1">
                            {total} vendas
                        </Typography>
                    </Box>
                ))}
            </Box>
            <VendedorList
                vendedores={filteredVendedores}
                onUpdateQuantidade={null}
                onDelete={null}
                onShowCompradores={handleShowCompradores}
            />
            {selectedVendedor && (
                <CompradoresModal 
                    open={Boolean(selectedVendedor)} 
                    onClose={() => setSelectedVendedor(null)} 
                    vendedor={selectedVendedor} 
                />
            )}
            <Signature /> {/* Adiciona a assinatura fixada */}
        </Container>
    );
}

export default PublicPage;
