import React, { useEffect, useState } from 'react';
import { Container, Typography, Card, CardContent, Button, Grid, alpha } from '@mui/material';
import Navbar from '../components/Navbar';
import ShaderBackground from '../components/ShaderBackground';
import PageTitle from '../components/PageTitle';
import { useThemeContext } from '../context/ThemeContext';
import Link from 'next/link'; // Import Link for navigation
import { makeStyles } from '@mui/styles';

interface BlogPost {
    id: number;
    title: string;
    content: string;
    created_at: string; // Add created_at field
    thumbnail: string; // Add thumbnail field
}

// Styles for the thumbnail image
const useStyles = makeStyles({
    thumbnail: {
        width: '100%', // Full width of the post
        maxHeight: '150px', // Initial max height
        overflow: 'hidden', // Hide overflow
        objectFit: 'cover', // Maintain aspect ratio
        transition: 'max-height 0.3s ease-in-out', // Smooth transition for height
    },
    cardContainer: {
        '&:hover $thumbnail': {
            maxHeight: '300px', // Set max height on hover
        },
    },
});

const Blog: React.FC = () => {
    const classes = useStyles();
    const { theme } = useThemeContext();
    const [blogs, setBlogs] = useState<BlogPost[]>([]);

    useEffect(() => {
        // Fetch blog data from the backend
        const fetchBlogs = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs`);
            const data = await response.json();
            setBlogs(data.results);
        };

        fetchBlogs();
    }, []);

    return (
        <ShaderBackground>
            <Navbar />
            <Container style={{ paddingTop: '3rem' }}>
                <PageTitle title="Blog" />
                <Grid container spacing={2}>
                    {blogs.map((post) => (
                        <Grid item xs={12} sm={4} key={post.id}>
                            <Card className={classes.cardContainer} style={{ backdropFilter: 'blur(10px)', backgroundColor: alpha(theme.palette.background.paper, 0.8)}}>
                                <img
                                    src={post.thumbnail} // Display thumbnail
                                    alt={post.title}
                                    className={classes.thumbnail} // Apply styles
                                />
                                <CardContent>
                                    <Typography variant="h5">{post.title}</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {new Date(post.created_at).toLocaleDateString()} {/* Format the created_at date */}
                                    </Typography>
                                    <Typography>{post.content.substring(0, 44)}...</Typography>
                                    <Link href={`/blog/${post.id}`} passHref>
                                        <Button variant="contained" style={{ backgroundColor: alpha(theme.palette.primary.main, 0.8) }}>Read More</Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </ShaderBackground>
    );
};

export default Blog;
