// components/PageTitle.tsx
import React from 'react';
import { Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';

interface PageTitleProps {
    title: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
    const theme = useTheme();

    return (
        <Box
            textAlign="center"
            marginY={2}
            padding={2} // Increased padding for better spacing
            paddingY={4}
            bgcolor={alpha(theme.palette.background.paper, 0.8)} // Slightly adjusted background color
            color={theme.palette.primary.main}
            marginTop={'3rem'}
            borderRadius={1} // Increased border radius for smoother corners
            boxShadow={4} // Increased box shadow for better depth
        >
            <Typography 
                variant="h3" 
                style={{ 
                    fontWeight: 'bold', 
                    letterSpacing: '1.8x', // Added letter spacing for better readability
                }} 
            >
                {title}
            </Typography>
        </Box>
    );
};

export default PageTitle;
