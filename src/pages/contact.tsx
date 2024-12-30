import React from 'react';
import { Container, Grid, Card, CardContent, Box, Typography } from '@mui/material';
import { Facebook, LinkedIn, YouTube } from '@mui/icons-material';
import Link from 'next/link'; // Import Link for navigation
import Navbar from '../components/Navbar';
import ShaderBackground from '../components/ShaderBackground';
import PageTitle from '../components/PageTitle'; // Import the new PageTitle component
import { useThemeContext } from '../context/ThemeContext'; // Import your theme context
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: any) => ({
    card: {
        backgroundColor: theme.palette.background.paper,
        backdropFilter: 'blur(8px)',
        textAlign: 'center',
        padding: '2rem',
    },
    icon: {
        fontSize: '4rem',
        margin: '1rem',
        cursor: 'pointer',
        color: theme.palette.text.primary,
        '&:hover': {
            color: theme.palette.secondary.main,
            transform: 'scale(1.2)',
            transition: 'color 0.3s ease-in-out, transform 0.3s ease-in-out',
        },
    },
}));

const Contact: React.FC = () => {
    const { theme } = useThemeContext();
    const classes = useStyles(theme);

    return (
        <ShaderBackground>
            <Navbar />
            <Container style={{ paddingTop: '2.5rem', paddingBottom: '3rem' }}>
                <PageTitle title="Get in Touch" />
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Card className={classes.card}>
                            <CardContent>
                                <Typography variant="h5">Connect with Me</Typography>
                                <div>
                                    <YouTube className={classes.icon} onClick={() => window.open('https://www.youtube.com/@savorsauce', '_blank')} />
                                    <LinkedIn className={classes.icon} onClick={() => window.open('https://www.linkedin.com/in/nathaniel-lybrand-4b7664276/', '_blank')} />
                                    <Facebook className={classes.icon} onClick={() => window.open('https://www.facebook.com/profile.php?id=100076576564396', '_blank')} />
                                </div>
                                <Typography variant="body2" color="textSecondary" style={{ marginTop: '1rem' }}>
                                    Follow me on social media for updates and more!
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Card className={classes.card}>
                            <CardContent>
                                <Typography variant="h5">Contact Me</Typography>
                                <Box>
                                    <Typography variant="body2" color="textSecondary" style={{ marginTop: '1rem' }}>
                                        <Link href="mailto:nathaniellybrand@gmail.com" style={{ color: theme.palette.text.primary, textDecoration: 'none', fontWeight: 'bold', fontSize: '1.2rem' }}>
                                            nathaniellybrand@gmail.com
                                        </Link>
                                        <br />
                                        <br />
                                        <Link href="mailto:nlybrand@email.sc.edu" style={{ color: theme.palette.text.primary, textDecoration: 'none', fontWeight: 'bold', fontSize: '1.2rem' }}>
                                            nlybrand@email.sc.edu
                                        </Link>
                                    </Typography>
                                </Box>
                                <Typography variant="body2" color="textSecondary" style={{ marginTop: '1rem' }}>
                                    For any business inquiries or collaboration opportunities.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </ShaderBackground>
    );
};

export default Contact;
