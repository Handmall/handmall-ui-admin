import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

import Box from '@mui/material/Box';

const App = () => {
    return (
        <>
            <Box sx={{ display: 'flex', width: '100%' }}>
                <Header />
                <Sidebar />
                <Outlet />
            </Box>
        </>
    );
};

export default App;
