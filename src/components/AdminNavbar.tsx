import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import Link from 'next/link';
import { useThemeContext } from '../context/ThemeContext';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const AdminNavbar: React.FC = () => {
    const { toggleTheme, theme } = useThemeContext();

    return (
        <AppBar
            position="fixed"
            style={{
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
            }}
        >
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1, paddingRight: '2.5vw', paddingLeft: '5vw' }}>
                    Admin Panel
                </Typography>
                <Button color="inherit">
                    <Link href="/contentBrowser" style={{ color: 'inherit', textDecoration: 'none' }}>Content</Link>
                </Button>
                <IconButton color="inherit" onClick={toggleTheme} style={{ marginRight: '5vw', marginLeft: '2.5vw' }}>
                    {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default AdminNavbar;
