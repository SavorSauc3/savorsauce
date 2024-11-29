import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Container, Paper, Box, Grid, TextField, Button } from '@mui/material';
import PageTitle from '../components/PageTitle'; // Adjust the import as per your actual file structure

const AdminLogin: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin-login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
    
            if (response.ok) {
                const { token } = await response.json();
                localStorage.setItem('token', token);
                router.push('/admin-panel');
            } else {
                const errorText = await response.text(); // Read response text
                console.error('Login failed:', errorText); // Log the error response
                alert('Invalid credentials');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('An error occurred during login');
        }
    };

    return (
        <Container maxWidth="sm" style={{ marginTop: '5rem' }}>
            <Paper elevation={3} style={{ padding: '2rem' }}>
                <PageTitle title="Admin Login" />
                <Box>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Username"
                                variant="outlined"
                                fullWidth
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Password"
                                type="password"
                                variant="outlined"
                                fullWidth
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={handleLogin}
                            >
                                Login
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Container>
    );
};

export default AdminLogin;
