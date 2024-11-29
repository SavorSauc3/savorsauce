import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { FaCopy } from 'react-icons/fa';
import { useRouter } from 'next/router';

export interface BucketItem {
    Key: string;
    Size: number;
    LastModified: string; // or Date if you prefer to handle it as a Date object
}

const BucketView = () => {
    const router = useRouter();
    const [bucketItems, setBucketItems] = useState<BucketItem[]>([]);

    // Check authentication and fetch content
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/admin-login'); // Redirect to login if token is not present
            return;
        }

        // Function to fetch bucket content from the /content endpoint
        const fetchBucketContent = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/images`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch bucket content');
                }

                const data = await response.json();
                console.log(data);
                setBucketItems(data.results);
            } catch (error) {
                console.error('Error fetching content:', error);
            } finally {
                
            }
        };

        fetchBucketContent();
    }, [router]);

    // Function to copy text to clipboard
    const copyToClipboard = (key: string) => {
        navigator.clipboard.writeText(key).then(() => {
            // alert('Key copied to clipboard!'); // Optional: Show a success message
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    };

    return (
        <>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell><strong>Key</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {bucketItems.map((item) => {
                        const truncatedKey = item.Key.length > 30 ? '...' + item.Key.slice(-30) : item.Key;
                        return (
                            <TableRow key={item.Key}>
                                <TableCell>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <span>{truncatedKey}</span>
                                        <FaCopy 
                                            style={{ marginLeft: '8px', cursor: 'pointer' }} 
                                            onClick={() => copyToClipboard(item.Key)} 
                                            title="Copy to clipboard"
                                        />
                                    </div>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </>
    );
};

export default BucketView;
