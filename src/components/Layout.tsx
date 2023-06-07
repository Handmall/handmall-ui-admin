import { Outlet } from "react-router-dom"
import Header from "./Header"
import Sidebar from "./Sidebar"
import { Box, Container, Toolbar } from "@mui/material"
import "../assets/scss/common.scss"

const Layout = () => {

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <Header />
                <Sidebar />
                <Box 
                    component="main"           
                    sx={{
                        backgroundColor: 'gray',
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Outlet />
                    </Container>
                    
                </Box>
            </Box>       
        </>
    )
}

export default Layout