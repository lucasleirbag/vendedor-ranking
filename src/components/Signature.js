import React from 'react';
import { Box, Typography } from '@mui/material';

function Signature() {
    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: 0,
                width: '100%',
                backgroundColor: '#f1f1f1',
                padding: '8px 0',
                textAlign: 'center',
                boxShadow: '0 -1px 5px rgba(0,0,0,0.1)',
                zIndex: 1000,
            }}
        >
            <Typography variant="body2" color="textSecondary">
                Desenvolvido por Lucas Gabriel - Todos os direitos reservados.
            </Typography>
        </Box>
    );
}

export default Signature;
