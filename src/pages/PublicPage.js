import React, { useState, useEffect } from 'react';
import VendedorList from '../components/VendedorList';
import SearchBar from '../components/SearchBar';
import { Box, Container, Typography, IconButton, Collapse } from '@mui/material';
import { getVendedores } from '../services/firestoreService';
import CompradoresModal from '../components/CompradoresModal';
import ShareIcon from '@mui/icons-material/Share';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import Signature from '../components/Signature';
import '../styles/styles.css';

function PublicPage() {
    const [vendedores, setVendedores] = useState([]);
    const [selectedVendedor, setSelectedVendedor] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [showSearch, setShowSearch] = useState(false);

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

    // Filtragem e ordenação dos vendedores por quantidade
    const filteredVendedores = vendedores
        .filter((vendedor) =>
            vendedor.nome.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => b.quantidade - a.quantidade); // Ordena por quantidade de vendas

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
        <div className="parallax-container">
            <div className="fixed-header">
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px' }}>
                    <IconButton onClick={() => setShowSearch(!showSearch)} color="primary" aria-label="abrir barra de pesquisa">
                        {showSearch ? <CloseIcon /> : <SearchIcon />}
                    </IconButton>
                    <IconButton onClick={handleCopyLink} color="primary" aria-label="compartilhar link">
                        <ShareIcon />
                    </IconButton>
                </Box>

                <Collapse in={showSearch}>
                    <SearchBar onSearch={setSearchQuery} />
                </Collapse>
            </div>

            <Container maxWidth="sm" sx={{ padding: 2, position: 'relative', minHeight: '100vh', marginTop: '80px' }}>
                <Collapse in={!showSearch}>
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
                </Collapse>

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

                <Signature />
            </Container>
        </div>
    );
}

export default PublicPage;
