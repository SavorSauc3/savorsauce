// pages/blog/[id].tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Container, Card, CardContent } from '@mui/material';
import Navbar from '../../components/Navbar';
import ShaderBackground from '../../components/ShaderBackground';
import PageTitle from '../../components/PageTitle';
import MarkdownRenderer from '../../components/MarkdownRenderer'; // Import the MarkdownRenderer

interface BlogPost {
    id: number;
    title: string;
    content: string;
}

const BlogPostPage: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;
    const [blog, setBlog] = useState<BlogPost | null>(null);

    useEffect(() => {
        if (id) {
            // Fetch the blog post data by ID from the backend
            const fetchBlogPost = async () => {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs/${id}`);
                const data = await response.json();
                setBlog(data);
            };

            fetchBlogPost();
        }
    }, [id]);

    if (!blog) return <div>Loading...</div>;

    return (
        <>
            <ShaderBackground>
                <Navbar />
                <Container style={{ paddingTop: '3rem', paddingBottom: '3rem', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', borderRadius: '8px', overflow: 'auto' }}>
                    <PageTitle title={blog.title} />
                    <Card style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)', borderRadius: '8px' }}>
                        <CardContent>
                            {/* Use the MarkdownRenderer to display the blog content */}
                            <MarkdownRenderer content={blog.content} />
                        </CardContent>
                    </Card>
                </Container>
            </ShaderBackground>
        </>
    );
};

export default BlogPostPage;
