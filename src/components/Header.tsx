import { AppBar, Box, Toolbar, Typography } from "@mui/material";

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
    )
}

export default Header