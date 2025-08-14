import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const toggleCollapse = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };
  
   return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar is now a standalone fixed element */}
      <Sidebar 
        isOpen={sidebarOpen} 
        toggleSidebar={toggleSidebar} 
        isCollapsed={sidebarCollapsed}
        toggleCollapse={toggleCollapse}
      />
      
      {/* Main content area, pushed over by the sidebar's width */}
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'}`}>
        {/* Navbar is now inside the main content flow */}
        <Navbar toggleSidebar={toggleSidebar} />
        
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;