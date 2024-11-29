import React, { useState } from 'react';
import Image from 'next/image';
import { Box, IconButton, Grid, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface ImageViewerProps {
    images: string[];
}

const ImageViewer: React.FC<ImageViewerProps> = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const selectImage = (index: number) => {
        setCurrentIndex(index);
        console.log(images[index]);
    };

    return (
        <Box textAlign="center">
            {/* Main Image Display */}
            <Box position="relative" width="100%" maxWidth="500px" margin="auto">
                <Image
                    src={images[currentIndex]}
                    alt={`Product Image ${currentIndex + 1}`}
                    layout="responsive" // Ensures the image is responsive
                    width={500} // Set the width of the image
                    height={400} // Set the height of the image
                    style={{
                        maxHeight: '200px',
                        objectFit: 'contain',
                    }}
                />
                {/* Navigation Arrows */}
                <IconButton
                    onClick={prevImage}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '0',
                        transform: 'translateY(-50%)',
                        background: 'rgba(0,0,0,0.5)',
                        color: '#fff',
                    }}
                >
                    <ArrowBackIosIcon />
                </IconButton>
                <IconButton
                    onClick={nextImage}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        right: '0',
                        transform: 'translateY(-50%)',
                        background: 'rgba(0,0,0,0.5)',
                        color: '#fff',
                    }}
                >
                    <ArrowForwardIosIcon />
                </IconButton>
            </Box>
    
            {/* Thumbnails */}
            <Grid container spacing={1} justifyContent="center" marginTop={2}>
                {images.map((image, index) => (
                    <Grid item key={index}>
                        <Image
                            src={image}
                            alt={`Thumbnail ${index + 1}`}
                            onClick={() => selectImage(index)}
                            width={60} // Set the width of the thumbnail
                            height={60} // Set the height of the thumbnail
                            style={{
                                cursor: 'pointer',
                                border: currentIndex === index ? '2px solid #3f51b5' : '2px solid transparent',
                                objectFit: 'cover',
                                transition: 'border 0.3s ease-in-out',
                            }}
                        />
                    </Grid>
                ))}
            </Grid>
            
            {/* Image count indicator */}
            <Typography variant="caption" display="block" marginTop={1}>
                {currentIndex + 1} / {images.length}
            </Typography>
        </Box>
    );
};

export default ImageViewer;
