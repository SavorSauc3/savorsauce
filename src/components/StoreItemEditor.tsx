import React, { useState, useEffect } from 'react';
import { Container, TextField, Button } from '@mui/material';
import AdminNavbar from '../components/AdminNavbar';
import PageTitle from '../components/PageTitle';
import BucketView from '../components/BucketView';
import { useRouter } from 'next/router';

interface StoreItemData {
    id: number;
    item_name: string;
    price: number;
    description: string;
    images: string;
}

interface EditStoreItemProps {
    itemData?: StoreItemData; // Optional, used for editing
    handleSubmit: (data: StoreItemData) => void; // Function to handle form submission
    handleCancel: () => void; // Function to handle cancel action
}

const EditStoreItem: React.FC<EditStoreItemProps> = ({ itemData, handleSubmit, handleCancel }) => {
    const [itemName, setItemName] = useState(itemData?.item_name || '');
    const [price, setPrice] = useState(itemData?.price || 0);
    const [description, setDescription] = useState(itemData?.description || '');
    const [imageLinks, setImageLinks] = useState(itemData?.images || '');
    const [validLinks, setValidLinks] = useState(true);
    const router = useRouter();

    // Check authentication status
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/admin-login'); // Redirect to login if token is not present
        }
    }, [router]);

    const handleImageLinksChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const links = e.target.value;
        setImageLinks(links);

        // Check if links are properly separated by commas
        setValidLinks(links.split(',').every(link => link.trim() !== '') || links.length === 0);
    };

    return (
        <>
            <AdminNavbar />
            <Container style={{ paddingTop: '3rem', paddingBottom: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Container style={{ flex: '1', display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <BucketView />
                </Container>
                <Container style={{ flex: '2', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
                    <div style={{ textAlign: 'center', width: '100%', marginBottom: '1rem' }}>
                        <PageTitle title={itemData ? 'Edit Store Item' : 'Create Store Item'} />
                    </div>
                    <TextField
                        label="Item Name"
                        fullWidth
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                        margin="normal"
                    />
                    <TextField
                        label="Price"
                        type="number"
                        fullWidth
                        value={price}
                        onChange={(e) => setPrice(parseFloat(e.target.value))}
                        margin="normal"
                    />
                    <TextField
                        label="Description"
                        fullWidth
                        multiline
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        margin="normal"
                    />
                    <TextField
                        label="Image Links (separate with commas)"
                        fullWidth
                        value={imageLinks}
                        onChange={handleImageLinksChange}
                        margin="normal"
                        error={!validLinks}
                        helperText={!validLinks ? 'Please ensure links are properly separated with commas.' : ''}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                        <Button variant="contained" style={{ marginRight: '1rem' }} color="primary" onClick={() => handleSubmit({ id: itemData?.id || 0, item_name: itemName, price, description, images: imageLinks })}>
                            {itemData ? 'Save' : 'Submit'}
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={handleCancel}>
                            Cancel
                        </Button>
                    </div>
                </Container>
            </Container>
        </>
    );
};

export default EditStoreItem;
