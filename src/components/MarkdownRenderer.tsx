import React from 'react';
import { useTheme } from '@mui/material/styles';
import Markdown from 'react-markdown';
import remarkBreaks from 'remark-breaks'; // Import the remark-breaks plugin

// Define the props types for the image renderer
interface ImageRendererProps {
    src: string;
    alt?: string;
}

// Custom Image renderer to restrict width
const ImageRenderer: React.FC<ImageRendererProps> = ({ src, alt }) => {
    return <img src={src} alt={alt} style={{ maxWidth: '100%', height: 'auto' }} />;
};

// Define the props types for the link renderer
interface LinkRendererProps {
    href: string;
    children: React.ReactNode;
}

// Custom Link renderer to style based on theme
const LinkRenderer: React.FC<LinkRendererProps> = ({ href, children }) => {
    const theme = useTheme();

    return (
        <a
            href={href}
            style={{
                color: theme.palette.mode === 'dark' ? '#edb926' : '#1976d2',
                textDecoration: 'underline',
            }}
            target="_blank"
            rel="noopener noreferrer"
        >
            {children}
        </a>
    );
};

const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
    return (
        <div
            style={{
                padding: '16px',
                height: '100%',
                overflow: 'auto',
                maxWidth: '800px', // Set a maximum width for the article
                margin: '0 auto',  // Center the article horizontally
                textAlign: 'center', // Center the text
            }}
        >
            <Markdown
                components={{
                    img: ImageRenderer,
                    a: LinkRenderer,
                }}
                remarkPlugins={[remarkBreaks]} // Add the remark-breaks plugin here
            >
                {content}
            </Markdown>
        </div>
    );
};

export default MarkdownRenderer;
