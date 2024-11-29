import React, { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import { useThemeContext } from '../context/ThemeContext';
import BlogEditor from './BlogEditor';
import Link from 'next/link';

interface BlogPost {
    id: number;
    title: string;
    content: string;
    created_at: string;
    thumbnail: string;
}

const BlogContent: React.FC = () => {
    const { theme } = useThemeContext();
    const [blogs, setBlogs] = useState<BlogPost[]>([]);
    const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null); // Tracks the blog being edited
    const [isCreating, setIsCreating] = useState(false); // Tracks if creating a new blog

    // Fetch blog data from the backend
    useEffect(() => {
        const fetchBlogs = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs`);
            const data = await response.json();
            setBlogs(data.results);
        };

        fetchBlogs();
    }, []);

    const handleCreateBlog = async (id: number, title: string, content: string, thumbnail: string) => {
        // Placeholder for creating a blog
        console.log('Create blog:', { title, content, thumbnail });
        const token = localStorage.getItem('token');
        if (!token) {
            alert('You must be logged in to create a blog post.');
            return;
        }

        // Ensure newlines in content are preserved
        const formattedContent = content.replace(/\n/g, '\n');

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Include the token in the request
            },
            body: JSON.stringify({ title, content: formattedContent, thumbnail }), // Include thumbnail
        });

        if (response.ok) {
            alert('Blog post created successfully!');
            console.log(formattedContent);
        } else {
            alert('Error creating blog post');
        }
        setIsCreating(false);
    };

    const handleDeleteBlog = async (id: number) => {
        // Placeholder for deleting a blog
        console.log('Delete blog:', id);
        const token = localStorage.getItem('token');
        if (!token) {
            alert('You must be logged in to delete a blog post.');
            return;
        }
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blog/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ id: id }),
        })
        if (!response.ok) {
            alert('Error deleting blog');
        }
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
    };

    const handleEditBlog = async (id: number, title: string, content: string, thumbnail: string) => {
        // Placeholder for editing a blog
        console.log('Edit blog:', { title, content, thumbnail });
        const token = localStorage.getItem('token');
        if (!token) {
            alert('You must be logged in to create a blog post.');
            return;
        }

        // Ensure newlines in content are preserved
        const formattedContent = content.replace(/\n/g, '\n');

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Include the token in the request
            },
            body: JSON.stringify({ id, title, content: formattedContent, thumbnail }), // Include thumbnail
        });

        if (response.ok) {
            alert('Blog post updated successfully!');
            console.log(formattedContent);
        } else {
            alert('Error updating blog post');
        }
        setEditingBlog(null);
    };

    const handleCancel = () => {
        setIsCreating(false);
        setEditingBlog(null);
    };

    return (
        <>
            <Container style={{ marginTop: '3rem' }}>
                <Typography variant="h4" gutterBottom style={{ color: theme.palette.primary.main, textAlign: 'center' }}>
                    Blog Posts
                </Typography>

                {/* Render BlogEditor for creating or editing */}
                {isCreating && (
                    <BlogEditor 
                        onSubmit={handleCreateBlog} 
                        onCancel={handleCancel} 
                    />
                )}
                {editingBlog && (
                    <BlogEditor 
                        onSubmit={handleEditBlog} 
                        onCancel={handleCancel} 
                        data={editingBlog} 
                    />
                )}

                {/* Show blog list if not creating or editing */}
                {!isCreating && !editingBlog && (
                    <>
                        <Button
                            variant="contained"
                            color={theme.palette.primary.main}
                            onClick={() => setIsCreating(true)}
                            style={{ marginBottom: '1rem', float: 'left' }}
                        >
                            Create Blog
                        </Button>
                        <TableContainer>
                            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Thumbnail</TableCell>
                                            <TableCell>Title</TableCell>
                                            <TableCell>Created At</TableCell>
                                            <TableCell>Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {blogs.map((post) => (
                                            <TableRow key={post.id}>
                                                <TableCell>
                                                    <img
                                                        src={post.thumbnail}
                                                        alt={post.title}
                                                        style={{ width: '100px', height: 'auto', objectFit: 'cover' }}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Link href={`/blog/${post.id}`} passHref>
                                                        <Typography style={{ color: theme.palette.primary.main, cursor: 'pointer' }}>
                                                            {post.title}
                                                        </Typography>
                                                    </Link>
                                                </TableCell>
                                                <TableCell>
                                                    {new Date(post.created_at).toLocaleDateString()}
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        variant="outlined"
                                                        color={theme.palette.primary.main}
                                                        onClick={() => setEditingBlog(post)}
                                                        style={{ marginRight: '0.5rem' }}
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        variant="outlined"
                                                        color={theme.palette.error.main}
                                                        onClick={() => handleDeleteBlog(post.id)}
                                                    >
                                                        Delete
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </TableContainer>
                    </>
                )}
            </Container>
        </>
    );
};

export default BlogContent;
