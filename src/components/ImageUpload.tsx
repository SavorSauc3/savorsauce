import React, { useState } from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select, Box } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
interface ImageUploadProps {
    onImagesUploaded: (imageUrls: string[]) => void; // Callback to pass uploaded image URLs
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImagesUploaded }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [images, setImages] = useState<File[]>([]);
    const [imageUrls, setImageUrls] = useState<string[]>([]); // Store the uploaded image URLs
    const [selectedImageUrl, setSelectedImageUrl] = useState<string>(''); // Track the selected URL

    const isValidImage = (file: File) => {
        const validExtensions = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        return validExtensions.includes(file.type);
    };

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
          const uploadedFiles = Array.from(event.target.files);
          const validImages = uploadedFiles.filter(isValidImage);
  
          if (validImages.length > 0) {
              const uploadedImageUrls: string[] = [];
  
              // Retrieve the token from localStorage or sessionStorage
              const token = localStorage.getItem('token');
  
              for (const image of validImages) {
                  // Send the image to the backend
                  const formData = new FormData();
                  formData.append('image', image);
  
                  try {
                      // Send image to backend with Authorization header
                      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/upload-image`, {
                          method: 'POST',
                          headers: {
                              'Authorization': `Bearer ${token}`, // Include the token in the header
                          },
                          body: formData,
                      });
  
                      if (response.ok) {
                          const { imageUrl } = await response.json();
                          uploadedImageUrls.push(imageUrl);
                      } else {
                          alert('Failed to upload image');
                      }
                  } catch (error) {
                      console.error('Error uploading image:', error);
                  }
              }
  
              // Call onImagesUploaded with the uploaded image URLs
              if (uploadedImageUrls.length > 0) {
                  onImagesUploaded(uploadedImageUrls);
                  setImageUrls(uploadedImageUrls); // Update the imageUrls state
              }
          }
      }
  };

    const handleCopyImageUrl = () => {
        if (selectedImageUrl) {
            navigator.clipboard.writeText(selectedImageUrl).then(() => {
                alert('Image URL copied to clipboard!');
            }).catch((err) => {
                console.error('Failed to copy image URL: ', err);
            });
        }
    };

    return (
        <Box
            sx={{
                padding: 0.5,
                backgroundColor: 'inherit',
                borderRadius: 2,
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                marginTop: 2,
            }}
        >
            {/* Image Upload Button */}
            <Button
                variant="contained"
                component="label"
                color="primary"
                sx={{ mb: 0.5, fontSize: '0.8rem', padding: '12px 8px' }}
            >
                Choose Images
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    hidden
                    onChange={handleImageUpload}
                />
            </Button>
    
            {/* Dropdown and Copy Button aligned side by side */}
            {imageUrls.length > 0 && (  // Fixed condition here
                <Box mt={0.5} display="flex" alignItems="center" gap={0.5}>
                    {/* Dropdown for uploaded image URLs */}
                    <FormControl sx={{ minWidth: 180, maxWidth: '300px' }}> {/* Set min and max width */}
                        <InputLabel id="image-url-select-label">Uploaded Images</InputLabel>
                        <Select
                            labelId="image-url-select-label"
                            value={selectedImageUrl}
                            label="Uploaded Images"
                            onChange={(e) => setSelectedImageUrl(e.target.value as string)}
                            sx={{ backgroundColor: 'inherit', borderRadius: 1, fontSize: '0.8rem' }} // Adjust font size
                        >
                            {imageUrls.map((url, index) => (
                                <MenuItem key={index} value={url} sx={{ fontSize: '0.8rem' }}> {/* Adjust font size */}
                                    {url}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
    
                    {/* Copy Image URL Button */}
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleCopyImageUrl}
                        sx={{ fontSize: '0.8rem', padding: '16px 12px' }} // Adjust font size and padding
                    >
                        <ContentCopyIcon sx={{ fontSize: '1rem', color: 'inherit' }} /> {/* Adjust icon size */}
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default ImageUpload;

