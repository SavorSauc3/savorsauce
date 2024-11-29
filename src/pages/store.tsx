import React, { useEffect, useState } from 'react';
import { Container, Typography, Card, CardContent, Grid } from '@mui/material';
import Navbar from '../components/Navbar';
import ShaderBackground from '../components/ShaderBackground';
import PageTitle from '../components/PageTitle';
import Link from 'next/link'; // Import Link from Next.js for redirection
import { useThemeContext } from '../context/ThemeContext';

interface StoreItem {
    id: number;
    item_name: string;
    price: number;
    images: string; // Keep images as a string for splitting
}

const Store: React.FC = () => {
    const [storeItems, setStoreItems] = useState<StoreItem[]>([]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {toggleTheme, theme} = useThemeContext();

    useEffect(() => {
        // Fetch store items from the backend
        const fetchStoreItems = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/store`);
            const data = await response.json();

            // Split the images string into an array for each item
            const updatedStoreItems = data.results.map((item: StoreItem) => ({
                ...item,
                images: item.images.split(','), // Split the comma-separated string into an array
            }));

            setStoreItems(updatedStoreItems);
        };

        fetchStoreItems();
    }, []);

    return (
        <ShaderBackground>
            <Navbar />
            <Container style={{ paddingTop: '3rem', paddingBottom: '3rem', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
                <PageTitle title="Store" />
                <Grid container spacing={2}>
                    {storeItems.map((product) => (
                        <Grid item xs={12} sm={4} key={product.id}>
                            <Link href={`/store/${product.id}`} passHref>
                                <Card style={{ cursor: 'pointer', backgroundColor: theme.palette.background.paper }}> {/* Make the whole card clickable */}
                                    <CardContent>
                                        {/* Show only the first image */}
                                        {product.images && product.images.length > 0 && (
                                            <img
                                                src={product.images[0]} // Display the first image
                                                alt={product.item_name}
                                                style={{
                                                    width: '100%', // Full width of the card
                                                    height: 'auto', // Maintain aspect ratio
                                                    maxHeight: '150px', // Limit max height
                                                    objectFit: 'cover', // Cover to prevent distortion
                                                    transition: 'max-height 0.3s ease-in-out', // Smooth transition
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.maxHeight = '200px'; // Set to maximum height on hover
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.maxHeight = '150px'; // Reset to original height
                                                }}
                                            />
                                        )}
                                        <Typography variant="h5">{product.item_name}</Typography>
                                        <Typography>${product.price}</Typography>
                                    </CardContent>
                                </Card>
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </ ShaderBackground>
    );
};

export default Store;
