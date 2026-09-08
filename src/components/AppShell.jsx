'use client';

import { useState } from 'react';
import Navbar from './Navbar';
import Preloader from './Preloader';

export default function AppShell({ children }) {
  const [showPreloader, setShowPreloader] = useState(true);

  return (
    <>
      <Navbar />
      {children}
      {showPreloader && <Preloader onVideoEnd={() => setShowPreloader(false)} />}
    </>
  );
}