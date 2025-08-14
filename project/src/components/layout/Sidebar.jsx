import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FolderOpen, 
  Users, 
  Calendar,
  BarChart3,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const Sidebar = ({ isOpen, toggleSidebar, isCollapsed, toggleCollapse }) => {
  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Projects', href: '/projects', icon: FolderOpen },
    { name: 'Interns', href: '/interns', icon: Users },
    { name: 'Deadlines', href: '/deadlines', icon: Calendar },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  ];
  
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleSidebar}></div>
      )}
      
      {/* Sidebar */}
        <div className={`fixed top-0 left-0 z-30 h-16 lg:h-screen ${isCollapsed ? 'lg:w-20' : 'lg:w-64'} w-64 bg-gray-900 transform transition-all duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}>
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <LayoutDashboard size={20} className="text-white" />
            </div>
            {!isCollapsed && <span className="ml-3 text-white font-semibold text-lg">Admin</span>}
          </div>
          <div className="flex items-center">
            <button
              onClick={toggleCollapse}
              className="hidden lg:block text-gray-400 hover:text-white mr-2"
            >
              {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </button>
            <button
              onClick={toggleSidebar}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>
        </div>
        
        <nav className="hidden lg:block mt-6 px-3">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center ${isCollapsed ? 'justify-center' : ''} px-3 py-3 mb-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`
              }
              onClick={(e) => {
                console.log(`Desktop navigation clicked: ${item.name} - ${item.href}`);
                // Only toggle sidebar on mobile, don't prevent navigation on desktop
                if (window.innerWidth < 1024) {
                  toggleSidebar();
                }
              }}
              title={item.name}
            >
              <item.icon size={20} className={isCollapsed ? '' : 'mr-3'} />
              {!isCollapsed && item.name}
            </NavLink>
          ))}
        </nav>
        
        <div className="lg:hidden flex h-16 items-center justify-center">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center px-2 mx-1 h-10 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`
              }
              onClick={(e) => {
                console.log(`Mobile navigation clicked: ${item.name} - ${item.href}`);
                toggleSidebar();
              }}
            >
              <item.icon size={16} />
            </NavLink>
          ))}
        </div>
        
        {!isCollapsed && (
          <div className="hidden lg:block absolute bottom-6 left-6 right-6">
            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="text-white text-sm font-medium mb-2">Need Help?</h4>
              <p className="text-gray-400 text-xs mb-3">Contact support for assistance</p>
              <button className="w-full bg-blue-600 text-white text-sm py-2 px-3 rounded-md hover:bg-blue-700 transition-colors">
                Get Support
              </button>
            </div>
          </div>
        )}
        {isCollapsed && (
          <div className="hidden lg:flex absolute bottom-6 left-0 right-0 justify-center">
            <button className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors" title="Get Support">
              <Users size={16} />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;