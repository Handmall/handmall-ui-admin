import React from 'react';
import { Box, AppBar, Toolbar, Typography } from '@mui/material';

const Header = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <Typography variant="h6" color="inherit" component="div">
                        Handmall
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;

// box - 25.1 appbar - 32.7  toolbarr - material 28.9 || 28.9
