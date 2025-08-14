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
      <div className="fixed top-0 w-full z-50 flex">
        <Sidebar 
          isOpen={sidebarOpen} 
          toggleSidebar={toggleSidebar} 
          isCollapsed={sidebarCollapsed}
          toggleCollapse={toggleCollapse}
        />
        <div className="flex-1">
          <Navbar toggleSidebar={toggleSidebar} />
        </div>
      </div>
      
      <div className={`pt-16 ${sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'} w-full transition-all duration-300`}>
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;