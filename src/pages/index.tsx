// components/Home.tsx
import { useState, useEffect } from 'react';
import React from 'react';
import { Container, Grid, Card, CardContent, Typography, Button } from '@mui/material';
import Link from 'next/link'; // Import Link for navigation
import Navbar from '../components/Navbar';
import ShaderBackground from '../components/ShaderBackground';
import PageTitle from '../components/PageTitle'; // Import the new PageTitle component
import { useThemeContext } from '../context/ThemeContext'; // Import your theme context
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

const Home: React.FC = () => {
    const { theme } = useThemeContext(); // Get the theme from the context
    const classes = useStyles();
    const [blog, setBlog] = useState<BlogPost | null>(null);

    useEffect(() => {
        // Fetch blog data from the backend
        const fetchBlogs = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/newest-blog`);
            if (!response.ok) {
                throw new Error('Failed to fetch blog data');
            } else {
                const data = await response.json();
                console.log(data);
                setBlog(data.results[0]);
            }
       };

        fetchBlogs();
    }, []);


    return (
        <ShaderBackground>
            <Navbar />
            <Container style={{ paddingTop: '3rem', paddingBottom: '3rem'}}>
              <PageTitle title="Welcome to My Portfolio" />
      
              <Grid container spacing={3} style={{ height: '110%' }}>
                <Grid item xs={12} sm={8}>
                  <Card style={{ backgroundColor: theme.palette.background.paper, backdropFilter: 'blur(8px)' }}>
                    <CardContent className="home-card-content">
                      <Typography variant="h5" style={styles.typography}>
                        My Newest Youtube Video
                      </Typography>
                      <Container style={{ textAlign: 'center', marginTop: '2rem', marginBottom: '2rem' }}>
                        <iframe
                          src="https://www.youtube-nocookie.com/embed?listType=playlist&list=UUHChdE1CU1xzONQMevxfvcw"
                          width="80%"
                          height="300vh"
                          allowFullScreen
                          style={{ border: 'none', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }}
                        >
                        </iframe>
                      </Container>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Card style={{ backgroundColor: theme.palette.background.paper, height: '100%', backdropFilter: 'blur(8px)' }}>
                    <CardContent>
                      <Typography variant="h5" style={styles.typography}>
                        Newest Blog Post
                      </Typography>
                      {blog ? (
                        <Card className={classes.cardContainer} style={{ top: '50%' }}>
                          <img
                            src={blog.thumbnail}
                            alt={blog.title}
                            className={classes.thumbnail}
                          />
                          <CardContent>
                            <Typography variant="h5">{blog.title}</Typography>
                            <Typography variant="body2" color="textSecondary">
                              {new Date(blog.created_at).toLocaleDateString()}
                            </Typography>
                            <Link href={`/blog/${blog.id}`} passHref>
                              <Button variant="contained" style={{ backgroundColor: theme.palette.background.paper, color: theme.palette.text.primary }}>Read More</Button>
                            </Link>
                          </CardContent>
                        </Card>
                      ) : (
                        <Typography variant="body2" color="textSecondary">
                          No blog post available.
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Card style={{ backgroundColor: theme.palette.background.paper, backdropFilter: 'blur(8px)' }}>
                    <CardContent>
                      <Typography variant="h5" style={styles.typography}>
                        Newest Project
                      </Typography>
                      <Typography style={styles.typography}>
                        No projects available at the moment!
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Container>
        </ShaderBackground>
      );
    };

const styles = {
    typography: {
        // Add any additional styles for your typography here
        color: 'inherit',
        textAlign: 'center',
        padding: '1rem', // Use inherit to respect the theme
    },
};

export default Home;
