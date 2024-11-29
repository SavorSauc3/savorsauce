import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import Link from 'next/link';
import { useThemeContext } from '../context/ThemeContext';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const Navbar: React.FC = () => {
    const { toggleTheme, theme } = useThemeContext();

    return (
        <AppBar
            position="fixed"
            style={{
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                backdropFilter: 'blur(5px)',
            }}
        >
            <Toolbar
                sx={{
                    justifyContent: 'center', // Center the content horizontally
                    paddingLeft: '40px', // Add padding to the left side
                    paddingRight: '40px', // Add padding to the right side
                }}
            >
                <Typography variant="h6" sx={{ flexGrow: 1, color: 'inherit', marginLeft: '5vw' }}>
                    Nathaniel Lybrand
                </Typography>
                <Button color="inherit" sx={{ marginLeft: '10px', marginRight: '10px' }}>
                    <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
                </Button>
                <Button color="inherit" sx={{ marginLeft: '10px', marginRight: '10px' }}>
                    <Link href="/blog" style={{ color: 'inherit', textDecoration: 'none' }}>Blog</Link>
                </Button>
                <Button color="inherit" sx={{ marginLeft: '10px', marginRight: '10px' }}>
                    <Link href="/store" style={{ color: 'inherit', textDecoration: 'none' }}>Store</Link>
                </Button>
                <IconButton color="inherit" onClick={toggleTheme} sx={{ marginRight: '5vw' }}>
                    {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
