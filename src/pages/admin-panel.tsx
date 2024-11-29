import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Container, Typography, Paper, Box } from '@mui/material';
import PageTitle from '../components/PageTitle';
import AdminNavbar from '../components/AdminNavbar';

const AdminPanel: React.FC = () => {
    const router = useRouter();

    // Check authentication status
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/admin-login'); // Redirect to login if token is not present
            return;
        }

        // Optionally, verify token with the server to ensure it's valid
        const verifyToken = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/verify-token`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({}) // Send an empty JSON body
                });

                if (!response.ok) {
                    // If token is invalid, redirect to login
                    localStorage.removeItem('token');
                    router.push('/admin-login');
                }
            } catch (error) {
                console.error('Token verification error:', error);
                localStorage.removeItem('token');
                router.push('/admin-login');
            }
        };

        verifyToken();
    }, [router]);

    return (
        <>
            <AdminNavbar />
            <Container maxWidth="sm" style={{ marginTop: '5rem', paddingTop: '2rem' }}>
                <Paper elevation={3} style={{ padding: '2rem' }}>
                    <PageTitle title="Admin Panel" />
                    <Box textAlign="center">
                        <Typography variant="h4" gutterBottom>
                            Welcome to the Admin Panel
                        </Typography>
                        <Typography variant="body1">
                            Here you can manage your application settings and data.
                        </Typography>
                    </Box>
                </Paper>
            </Container>
        </>
    );
};

export default AdminPanel;
