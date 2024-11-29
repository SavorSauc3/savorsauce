import React, { useState } from 'react';
import { Container, Tabs, Tab, Box } from '@mui/material';
import BucketContent from '../components/BucketContent'; // Ensure correct path
import BlogContent from '../components/BlogContent'; // Ensure correct path
import StoreContent from '../components/StoreContent';
import AdminNavbar from '../components/AdminNavbar';
import { useThemeContext } from '../context/ThemeContext';

const MainPage: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const { theme } = useThemeContext();

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue);
    };

    return (
        <>
            <AdminNavbar />
            {/* Centered Tabs in a Box */}
            <Box 
                sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    backgroundColor: theme.palette.background.main, 
                    paddingTop: '4.5rem',
                }}
            >
                <Tabs 
                    value={selectedTab} 
                    onChange={handleTabChange} 
                    centered 
                    textColor={theme.palette.primary.main} 
                    indicatorColor={theme.palette.primary.main}
                >
                    <Tab label="Store" />
                    <Tab label="Blog" />
                    <Tab label="Bucket" />
                </Tabs>
            </Box>
            {/* Main Content */}
            <Container maxWidth="md" style={{ marginTop: '2rem' }}>
                {selectedTab === 0 && <StoreContent />}
                {selectedTab === 1 && <BlogContent />}
                {selectedTab === 2 && <BucketContent />}
            </Container>
        </>
    );
};

export default MainPage;
