import React, { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import Navbar from '../components/Navbar';
import Link from 'next/link';
import { useThemeContext } from '../context/ThemeContext';
import EditStoreItem from './StoreItemEditor';

interface StoreItem {
    id: number;
    item_name: string;
    description: string;
    price: number;
    images: string;
}

const StoreContent: React.FC = () => {
    const [storeItems, setStoreItems] = useState<StoreItem[]>([]);
    const { theme } = useThemeContext();
    const [isEditing, setIsEditing] = useState(false);
    const [editingItem, setEditingItem] = useState<StoreItem | null>(null);

    // Fetch store items from the backend
    useEffect(() => {
        const fetchStoreItems = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/store`);
            const data = await response.json();

            const updatedStoreItems = data.results.map((item: StoreItem) => ({
                ...item,
                images: item.images.split(','),
            }));

            setStoreItems(updatedStoreItems);
        };

        fetchStoreItems();
    }, []);

    const handleEdit = (item: StoreItem) => {
        setEditingItem(item);
        setIsEditing(true);
    };

    const handleCreate = () => {
        setEditingItem(null);
        setIsEditing(true);
    };


    const handleDelete = async (id: number) => {
        console.log('Delete item:', id);
        const token = localStorage.getItem('token');
        if (!token) {
            alert('You must be logged in to delete a store item.');
            return;
        }
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/store/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ id: id }),
        })
        if (!response.ok) {
            alert('Error deleting item');
        }
        setStoreItems((prevItems) => prevItems.filter((item) => item.id !== id));
        alert('Item deleted successfully!');
    
    };

    const handleSubmit = async (data: StoreItem) => {
        console.log('Submit item:', data);
        const token = localStorage.getItem('token');
        if (!token) {
            alert('You must be logged in to create a store item.');
            return;
        }
        if (editingItem == null) {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/store`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ item_name: data.item_name, price: data.price, description: data.description, images: data.images.split(',') }),
            });
    
            if (response.ok) {
                alert('Item added to store successfully!');
                // Optionally, you can reset the form or redirect
            } else {
                alert('Error adding item to store');
            }
        } else if (editingItem != null) {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/store`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ id: editingItem.id, item_name: data.item_name, price: data.price, description: data.description, images: data.images }),
            });

            if (response.ok) {
                alert('Item updated successfully!');
                // Optionally, you can reset the form or redirect
            } else {
                alert('Error updating item');
            }
        }
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditingItem(null);
        setIsEditing(false);
    };

    return (
        <Container style={{ marginTop: '3rem' }}>
            {isEditing ? (
                // Render EditStoreItem component when editing/creating
                <EditStoreItem handleSubmit={handleSubmit} handleCancel={handleCancel} itemData={editingItem || undefined} />
            ) : (
                // Render the table when not editing/creating
                <>
                    <Button
                        variant="contained"
                        color={theme.palette.primary.main}
                        onClick={handleCreate}
                        style={{ marginBottom: '1rem' }}
                    >
                        Create Item
                    </Button>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Image</TableCell>
                                    <TableCell>Item Name</TableCell>
                                    <TableCell>Price</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {storeItems.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>
                                            {item.images && item.images.length > 0 && (
                                                <img
                                                    src={item.images[0]}
                                                    alt={item.item_name}
                                                    style={{
                                                        width: '100px',
                                                        height: 'auto',
                                                        objectFit: 'cover',
                                                    }}
                                                />
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <Link href={`/store/${item.id}`} passHref>
                                                <Typography
                                                    style={{ color: theme.palette.primary.main, cursor: 'pointer' }}
                                                >
                                                    {item.item_name}
                                                </Typography>
                                            </Link>
                                        </TableCell>
                                        <TableCell>${item.price.toFixed(2)}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="outlined"
                                                color="primary"
                                                onClick={() => handleEdit(item)}
                                                style={{ marginRight: '0.5rem' }}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                color="secondary"
                                                onClick={() => handleDelete(item.id)}
                                            >
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
            )}
        </Container>
    );
};
export default StoreContent;