import { Drawer, Toolbar, Divider, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import menuItems from "../constants/menu";

const Sidebar = () => {
    return (
        <Drawer
            sx={{ width: 240, flexShrink: 0 }}
            variant="permanent"
        >
            <Toolbar 
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    px: [1],
                }} 
            />
            <Divider />
            <List>
                {
                    menuItems.map(
                        (menu, index) => (
                            <ListItem key={index} disablePadding>
                                 <ListItemButton>
                                    <Link to={menu.url}>
                                        <ListItemText primary={menu.name} />
                                    </Link>
                                 </ListItemButton>
                            </ListItem>
                        )
                    )
                }
            </List>
        </Drawer>
    )
}

export default Sidebar