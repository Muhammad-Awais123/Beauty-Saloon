import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import PortfolioAgencyBar from './PortfolioAgencyBar';

export default function PublicLayout() {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-surface-soft text-charcoal-900 selection:bg-clinic-200 selection:text-clinic-900">
      <PortfolioAgencyBar />
      <Navbar />
      <main key={pathname} className="flex-1 animate-fade-in">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
