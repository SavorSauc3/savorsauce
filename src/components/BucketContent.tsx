import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Container, Paper, Typography, Box } from '@mui/material';
import BucketTable from './BucketTable'; // Ensure BucketTable is imported correctly
import PageTitle from './PageTitle'; // Ensure PageTitle is imported correctly

interface BucketItem {
    Key: string;
    Size: number;
    LastModified: string;
}

const BucketContent: React.FC = () => {
    const router = useRouter();
    const [bucketItems, setBucketItems] = useState<BucketItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const handleDelete = async (key: string) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/delete-image`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ key }),
            });

            if (!response.ok) throw new Error('Failed to delete item');
            setBucketItems((prevItems) => prevItems.filter((item) => item.Key !== key));
        } catch (error) {
            console.error('Error deleting item:', error);
            setError('Failed to delete item');
        }
    };

    const handleAdd = async (file: File) => {
        const formData = new FormData();
        formData.append('image', file);

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/upload-image`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body: formData,
            });

            if (!response.ok) throw new Error('Failed to upload file');
            const newItem = await response.json();
            setBucketItems((prevItems) => [...prevItems, newItem]);
        } catch (error) {
            console.error('Error uploading file:', error);
            setError('Failed to upload file');
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/admin-login');
            return;
        }

        const fetchBucketContent = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/images`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) throw new Error('Failed to fetch bucket content');
                const data = await response.json();
                setBucketItems(data.results);
            } catch (error) {
                setError('Failed to load bucket content');
            } finally {
                setLoading(false);
            }
        };

        fetchBucketContent();
    }, [router]);

    if (loading) {
        return (
            <Box textAlign="center">
                <Typography variant="h5">Loading...</Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Box textAlign="center">
                <Typography variant="h5" color="error">{error}</Typography>
            </Box>
        );
    }

    return (
        <Paper elevation={3} style={{ padding: '2rem' }}>
            <PageTitle title="Bucket Content" />
            <BucketTable bucketItems={bucketItems} onDelete={handleDelete} onAdd={handleAdd} />
        </Paper>
    );
};

export default BucketContent;
