import React from 'react';
import {
    Drawer,
    Toolbar,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
} from '@mui/material';

const Sidebar = () => {
    return (
        <Drawer
            sx={{ width: 240, flexShrink: 0 }}
            variant="permanent"
            anchor="left"
        >
            <Toolbar />
            <Divider />
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map(
                    (text, index) => (
                        <ListItem key={index} disablePadding>
                            <ListItemButton>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ),
                )}
            </List>
        </Drawer>
    );
};

export default Sidebar;
