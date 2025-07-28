import React from 'react';
import { createRoot } from 'react-dom/client';
import OptionsPage from './OptionsPage';
import '../popup/index.css';
 
const container = document.getElementById('root');
if (container) {
  createRoot(container).render(<OptionsPage />);
} 