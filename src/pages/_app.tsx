// pages/_app.tsx
import React from 'react';
import { AppProps } from 'next/app';
import { ThemeContextProvider } from '../context/ThemeContext';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <ThemeContextProvider>
            <Component {...pageProps} />
        </ThemeContextProvider>
    );
};

export default MyApp;
