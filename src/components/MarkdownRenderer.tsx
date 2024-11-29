import React from 'react';
import Markdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';

const ImageRenderer: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = (props) => (
    <img
        {...props}
        style={{
            maxWidth: '100%',
            height: 'auto',
            borderRadius: '8px',
        }}
    />
);

const LinkRenderer: React.FC<React.AnchorHTMLAttributes<HTMLAnchorElement>> = (props) => (
    <a
        {...props}
        target="_blank"
        rel="noopener noreferrer"
        style={{
            color: '#1a73e8',
            textDecoration: 'none',
            fontWeight: 'bold',
        }}
    />
);

const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
    return (
        <div
            style={{
                padding: '16px',
                height: '100%',
                overflow: 'auto',
                maxWidth: '800px',
                margin: '0 auto',
                textAlign: 'center',
            }}
        >
            <Markdown
                components={{
                    img: ImageRenderer,
                    a: LinkRenderer,
                } as any} // Bypass TypeScript's type checking
                remarkPlugins={[remarkBreaks]}
            >
                {content}
            </Markdown>
        </div>
    );
};

export default MarkdownRenderer;
