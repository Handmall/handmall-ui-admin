import { AppBar, Toolbar, Typography } from "@mui/material";

const Header = () => {
    return (
            <AppBar position="absolute">
                <Toolbar variant="dense">
                    <Typography variant="h6" color="inherit" component="div">
                        Handmall
                    </Typography>
                </Toolbar>
            </AppBar>
    )
}

export default Header