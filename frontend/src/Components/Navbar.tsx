import { AppBar, Box, Drawer, IconButton, List, ListItem, ListItemText, Toolbar, Typography } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu'
import { useState } from "react";

const Navbar = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    return (
        <Box sx={{ flexGrow: 1, display: { xs: "block", sm: "none" } }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={toggleMenu}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            {/* Drawer component for the menu */}
            <Drawer
                anchor="left"
                open={isMenuOpen}
                onClose={toggleMenu}
            >
                <Box
                    sx={{ width: 250 }}
                    role="presentation"
                    onClick={toggleMenu}
                    onKeyDown={toggleMenu}
                >
                    <List>
                        <ListItem button>
                            <ListItemText primary="Home" />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="About" />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="Contact" />
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </Box>
    )
}

export default Navbar
