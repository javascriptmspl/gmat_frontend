import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer: React.FC = () => {
    return (
        <Box sx={{ textAlign: 'center', py: 2, backgroundColor: '#1f2937', color:'white' }}>
            <Typography variant="body2" >
                © 2025 GMAT智能解題助手 | 專為GMAT考生打造的AI解題平台
            </Typography>
        </Box>
    );
};

export default Footer;