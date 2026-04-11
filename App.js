import React from 'react';
import { AppProvider } from './src/context/AppContext';
import AppNavigation from './src/navigation/AppNavigation';

export default function App() {
  return (
    <AppProvider>
      <AppNavigation />
    </AppProvider>
  );
}