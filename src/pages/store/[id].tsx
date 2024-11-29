import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Container, Typography, Card, CardContent, Button } from '@mui/material';
import Navbar from '../../components/Navbar';
import ShaderBackground from '../../components/ShaderBackground';
import PageTitle from '../../components/PageTitle';
import ImageViewer from '../../components/ImageViewer'; // Import ImageViewer

interface StoreItem {
    id: number;
    item_name: string;
    price: number;
    images: string[];
}

const StoreItemPage: React.FC = () => {
    const router = useRouter();
    const { id } = router.query; // Get the item ID from the URL
    const [storeItem, setStoreItem] = useState<StoreItem | null>(null);

    useEffect(() => {
        if (id) {
            // Fetch store item data by ID from the backend
            const fetchStoreItem = async () => {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/store/${id}`);
                const data = await response.json();
                console.log(data);
                setStoreItem({
                    ...data,
                    images: data.images.split(','), // Split the comma-separated string into an array
                });
            };

            fetchStoreItem();
        }
    }, [id]);

    if (!storeItem) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <ShaderBackground>
            <Navbar />
            <Container style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
                <PageTitle title={storeItem.item_name} />
                <Card>
                    <CardContent>
                        {/* Use the ImageViewer component to display images */}
                        {storeItem.images && storeItem.images.length > 0 && (
                            <ImageViewer images={storeItem.images} />
                        )}
                        <Typography variant="h5" style={{ marginTop: '1rem' }}>
                            {storeItem.item_name}
                        </Typography>
                        <Typography variant="h6">${storeItem.price}</Typography>
                        <Button variant="contained" color="primary" style={{ marginTop: '1rem' }}>
                            Add to Cart
                        </Button>
                    </CardContent>
                </Card>
            </Container>
        </ShaderBackground>
    );
};

export default StoreItemPage;
