import React from 'react';
import { IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useThemeMode } from '../context/ThemeContextProvider';
import { useTheme } from '@mui/material/styles';

const ThemeToggle = () => {
  const theme = useTheme();
  const { toggleTheme } = useThemeMode();

  return (
    <IconButton onClick={toggleTheme} color="inherit">
      {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
    </IconButton>
  );
};

export default ThemeToggle;