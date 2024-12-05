import React, { ReactNode } from 'react';
import { useThemeContext } from '../context/ThemeContext'; // Import your theme context
import Image from 'next/image';

interface ShaderBackgroundProps {
  children?: ReactNode;
}

const ShaderBackground: React.FC<ShaderBackgroundProps> = ({ children }) => {
  const { theme } = useThemeContext(); // Access theme context inside the component

  const imageUrl = theme.palette.mode === 'dark' 
    ? 'https://pub-8980b84e85064815a98217020b69d4c0.r2.dev/images/auckland-at-night-1179229.jpg' 
    : 'https://pub-8980b84e85064815a98217020b69d4c0.r2.dev/images/bamboo-leaf-elements-green.jpg';

  return (
    <div style={{ 
      position: 'relative', 
      width: '100%', 
      height: '100vh', // Ensure the div takes full viewport height
      overflow: 'hidden' // Hide any overflow
    }}>
      <Image 
        src={imageUrl} 
        alt="Background" 
        layout="fill" 
        objectFit="cover" 
        quality={100} 
        priority // Load the image eagerly
      />
      <div style={{ 
        position: 'relative', 
        zIndex: 1, 
        height: '100%', // Ensure this div takes full height
        overflowY: 'auto' // Allow vertical scrolling for children
      }}>
        {children}
      </div>
    </div>
  );
};

export default ShaderBackground;