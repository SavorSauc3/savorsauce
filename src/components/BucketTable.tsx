import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, Container, Typography } from '@mui/material';

export interface BucketItem {
    Key: string;
    Size: number;
    LastModified: string; // or Date if you prefer to handle it as a Date object
}

interface BucketTableProps {
    bucketItems: BucketItem[]; // Specify the type for the input data
    onDelete: (key: string) => void; // Function to handle deletion
    onAdd: (file: File) => void; // Function to handle adding a file
}

const BucketTable: React.FC<BucketTableProps> = ({ bucketItems, onDelete, onAdd }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleAddFile = () => {
        if (selectedFile) {
            onAdd(selectedFile);
            setSelectedFile(null); // Reset the file input after adding
        }
    };

    return (
        <>
            <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Button variant="contained" component="label" style={{ marginBottom: '1rem' }}>
                    Add File
                    <input type="file" hidden onChange={handleFileChange} />
                </Button>
                <Typography variant="body1">Selected File: {selectedFile?.name}</Typography>
                <Button variant="contained" onClick={handleAddFile} disabled={!selectedFile}>
                    Upload
                </Button>
            </Container>
            <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Key</strong></TableCell>
                            <TableCell><strong>Last Modified</strong></TableCell>
                            <TableCell><strong>Actions</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {bucketItems.map((item) => (
                            <TableRow key={item.Key}>
                                <TableCell>{item.Key}</TableCell>
                                <TableCell>{new Date(item.LastModified).toLocaleString()}</TableCell>
                                <TableCell>
                                    <Button variant="outlined" color="secondary" onClick={() => onDelete(item.Key)}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    );
};

export default BucketTable;
