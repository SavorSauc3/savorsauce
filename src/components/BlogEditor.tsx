import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Container, TextField, Button, Paper } from '@mui/material';
import AdminNavbar from './AdminNavbar';
import PageTitle from './PageTitle';
import BucketView from './BucketView';
import MarkdownRenderer from './MarkdownRenderer';

interface BlogEditorProps {
    onSubmit: (id: number, title: string, content: string, thumbnail: string) => void;
    onCancel: () => void;
    data?: {
        id: number;
        title: string;
        content: string;
        thumbnail: string;
    };
}

const BlogEditor: React.FC<BlogEditorProps> = ({ onSubmit, onCancel, data }) => {
    const [title, setTitle] = useState(data?.title || '');
    const [id] = useState(data?.id || 0);
    const [content, setContent] = useState(data?.content || '');
    const [thumbnail, setThumbnail] = useState(data?.thumbnail || '');
    const router = useRouter();

    // Check authentication status
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/admin-login'); // Redirect to login if token is not present
        }
    }, [router]);

    const handleFormSubmit = () => {
        onSubmit(id, title, content, thumbnail);
    };

    return (
        <>
            <AdminNavbar />
            <Container style={{ paddingTop: '3rem' }}>
                <PageTitle title={data ? 'Edit Blog Post' : 'Create Blog Post'} />
                <Box display="flex" justifyContent="space-between" marginTop="1rem">
                    {/* Bucket View on the left */}
                    <Box flex="0 0 25%" paddingRight="1rem">
                        <BucketView />
                    </Box>

                    {/* Markdown editor in the center */}
                    <Box flex="0 0 50%" padding="0 1rem">
                        <TextField
                            label="Title"
                            fullWidth
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            margin="normal"
                        />
                        <TextField
                            label="Content"
                            fullWidth
                            multiline
                            rows={8}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            margin="normal"
                        />
                        <TextField
                            label="Thumbnail URL"
                            fullWidth
                            value={thumbnail}
                            onChange={(e) => setThumbnail(e.target.value)}
                            margin="normal"
                        />

                        {/* Layout for Submit and Cancel Buttons */}
                        <Box display="flex" justifyContent="space-between" alignItems="center" marginTop="1rem">
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={onCancel}
                                sx={{ height: '56px', fontSize: '0.875rem', padding: '6px 12px' }}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleFormSubmit}
                                sx={{ height: '56px', fontSize: '0.875rem', padding: '6px 12px' }}
                            >
                                {data ? 'Update Blog Post' : 'Submit Blog Post'}
                            </Button>
                        </Box>
                    </Box>

                    {/* Preview on the right */}
                    <Box flex="0 0 25%" paddingLeft="1rem">
                        <Paper elevation={3} style={{ maxHeight: '400px', overflowY: 'auto' }}>
                            <h3 style={{ padding: '16px' }}>Preview</h3>
                            <MarkdownRenderer content={`# ${title}\n\n${content}`} />
                        </Paper>
                    </Box>
                </Box>
            </Container>
        </>
    );
};

export default BlogEditor;
