import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { createTheme, ThemeProvider, CssBaseline, alpha } from '@mui/material';
import { Theme } from '@mui/system';

interface ThemeContextType {
  toggleTheme: () => void;
  theme: Theme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: darkMode ? '#ffffff' : '#000000', // White for dark mode, black for light mode
      },
      secondary: {
        main: darkMode ? '#cccccc' : '#333333', // Light gray for dark mode, darker gray for light mode
      },
      background: {
        default: darkMode ? alpha('#0d0d0d', 0.8) : alpha('#f5f5f5', 0.8), // Dark gray for dark mode, light gray for light mode
        paper: darkMode ? alpha('#1a1a1a', 0.8) : alpha('#ffffff', 0.8), // Darker gray for dark mode, white for light mode
      },
      text: {
        primary: darkMode ? '#ffffff' : '#000000', // White text for dark mode, black text for light mode
        secondary: darkMode ? '#cccccc' : '#333333', // Light gray text for dark mode, darker gray for light mode
      },
    },
  });
  

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.style.setProperty('--foreground', 'var(--foreground-dark)');
      root.style.setProperty('--background', 'var(--background-dark)');
      root.style.setProperty('--button-primary-hover', 'var(--button-primary-dark)');
      root.style.setProperty('--button-secondary-hover', 'var(--button-secondary-dark)');
    } else {
      root.style.setProperty('--foreground', 'var(--foreground-light)');
      root.style.setProperty('--background', 'var(--background-light)');
      root.style.setProperty('--button-primary-hover', 'var(--button-primary-light)');
      root.style.setProperty('--button-secondary-hover', 'var(--button-secondary-light)');
    }
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ toggleTheme, theme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
