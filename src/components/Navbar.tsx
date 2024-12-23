import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Collapse } from '@mui/material';
import Link from 'next/link';
import { useThemeContext } from '../context/ThemeContext';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/system';

const MenuContainer = styled('div')<{ open: boolean }>(({ open }) => ({
    position: 'absolute',
    top: '64px', // Adjust based on your AppBar height
    right: open ? '0' : '-200px', // Move off-screen when closed
    transition: 'right 0.3s ease', // Smooth transition for the menu
    backgroundColor: 'white', // Background color for the menu
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', // Optional shadow for the menu
    zIndex: 1000, // Ensure it appears above other elements
}));

const Navbar: React.FC = () => {
    const { toggleTheme, theme } = useThemeContext();
    const [menuOpen, setMenuOpen] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    const handleMenuToggle = () => {
        setMenuOpen(!menuOpen);
    };

    useEffect(() => {
        // Check screen size on mount and whenever the window is resized
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 600); // Adjust the width threshold as needed
        };

        // Set initial screen size
        handleResize();

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);
        
        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

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
                    justifyContent: 'space-between',
                    paddingLeft: '40px',
                    paddingRight: '40px',
                }}
            >
                <Typography variant="h6" sx={{ flexGrow: 1, color: 'inherit', marginLeft: '5vw' }}>
                    Nathaniel Lybrand
                </Typography>
                {/* Hamburger Icon for small screens */}
                {isSmallScreen && (
                    <IconButton color="inherit" onClick={handleMenuToggle} sx={{ position: 'absolute', right: '20px' }}>
                        <MenuIcon />
                    </IconButton>
                )}
                {/* Menu Container with animation */}
                <MenuContainer open={menuOpen} style={{ backgroundColor: theme.palette.background.paper }}>
                    <Collapse in={menuOpen}>
                        <Button color="inherit" sx={{ marginLeft: '10px', marginRight: '10px' }}>
                            <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
                        </Button>
                        <Button color="inherit" sx={{ marginLeft: '10px', marginRight: '10px' }}>
                            <Link href="/blog" style={{ color: 'inherit', textDecoration: 'none' }}>Blog</Link>
                        </Button>
                        <Button color="inherit" sx={{ marginLeft: '10px', marginRight: '10px' }}>
                            <Link href="/contact" style={{ color: 'inherit', textDecoration: 'none' }}>Contact</Link>
                        </Button>
                    </Collapse>
                </MenuContainer>
                {/* Regular menu for larger screens */}
                {!isSmallScreen && (
                    <>
                        <Button color="inherit" sx={{ marginLeft: '10px', marginRight: '10px' }}>
                            <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
                        </Button>
                        <Button color="inherit" sx={{ marginLeft: '10px', marginRight: '10px' }}>
                            <Link href="/blog" style={{ color: 'inherit', textDecoration: 'none' }}>Blog</Link>
                        </Button>
                        <Button color="inherit" sx={{ marginLeft: '10px', marginRight: '10px' }}>
                            <Link href="/contact" style={{ color: 'inherit', textDecoration: 'none' }}>Contact</Link>
                        </Button>
                    </>
                )}
                {/* Theme toggle button */}
                <IconButton color="inherit" onClick={toggleTheme} sx={{ marginRight: '5vw' }}>
                    {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
