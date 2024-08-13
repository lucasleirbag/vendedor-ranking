import React from 'react';
import { Box, Typography } from '@mui/material';

function Signature() {
    return (
        <Box
            sx={{
                width: '100%',
                backgroundColor: '#f1f1f1',
                padding: '8px 0',
                textAlign: 'center',
                boxShadow: '0 -1px 5px rgba(0,0,0,0.1)',
                marginTop: 'auto',
            }}
        >
            <Typography variant="body2" color="textSecondary">
                Umadeb Setor 09 - Todos os direitos reservados.
            </Typography>
        </Box>
    );
}

export default Signature;
