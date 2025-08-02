import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import PrintQueue from './pages/PrintQueue';
import EarningInventory from './pages/EarningInventory';
import History from './pages/History';
import { Toaster } from './components/Toaster';

export type Page = 'dashboard' | 'print-queue' | 'earning-inventory' | 'history';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'print-queue':
        return <PrintQueue />;
      case 'earning-inventory':
        return <EarningInventory />;
      case 'history':
        return <History />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        {renderPage()}
      </main>
      <Toaster />
    </div>
  );
}

export default App;