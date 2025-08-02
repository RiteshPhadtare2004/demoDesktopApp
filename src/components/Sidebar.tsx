import React, { useState } from 'react';
import { 
  Home, 
  PrinterIcon, 
  TrendingUp, 
  History, 
  Search, 
  Bell, 
  User, 
  ChevronLeft,
  ChevronRight,
  Settings
} from 'lucide-react';
import { Page } from '../App';
import NotificationModal from './NotificationModal';
import ProfileModal from './ProfileModal';

interface SidebarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  currentPage, 
  setCurrentPage, 
  collapsed, 
  setCollapsed 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const menuItems = [
    { id: 'dashboard' as Page, icon: Home, label: 'Incoming Jobs' },
    { id: 'print-queue' as Page, icon: PrinterIcon, label: 'Print Queue' },
    { id: 'earning-inventory' as Page, icon: TrendingUp, label: 'Earning & Stock Management' },
    { id: 'history' as Page, icon: History, label: 'History' },
  ];

  const filteredItems = menuItems.filter(item =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className={`fixed left-0 top-0 h-full bg-white shadow-lg border-r border-gray-200 transition-all duration-300 z-40 ${
        collapsed ? 'w-16' : 'w-64'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <PrinterIcon className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-800">PrintHub</span>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {collapsed ? (
              <ChevronRight className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>

        {/* Search */}
        {!collapsed && (
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search menu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="mt-4">
          {filteredItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`w-full flex items-center px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                  isActive ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : 'text-gray-700'
                }`}
                title={collapsed ? item.label : undefined}
              >
                <Icon className={`w-5 h-5 ${collapsed ? 'mx-auto' : 'mr-3'} ${
                  isActive ? 'text-blue-600' : 'text-gray-500'
                }`} />
                {!collapsed && (
                  <span className="font-medium">{item.label}</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="absolute bottom-0 w-full border-t border-gray-200 bg-white">
          <div className="p-4 space-y-2">
            <button
              onClick={() => setShowNotifications(true)}
              className={`w-full flex items-center px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors ${
                collapsed ? 'justify-center' : ''
              }`}
              title={collapsed ? 'Notifications' : undefined}
            >
              <Bell className={`w-5 h-5 ${collapsed ? '' : 'mr-3'}`} />
              {!collapsed && <span>Notifications</span>}
              <div className="w-2 h-2 bg-red-500 rounded-full ml-auto"></div>
            </button>
            
            <button
              onClick={() => setShowProfile(true)}
              className={`w-full flex items-center px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors ${
                collapsed ? 'justify-center' : ''
              }`}
              title={collapsed ? 'Profile' : undefined}
            >
              <User className={`w-5 h-5 ${collapsed ? '' : 'mr-3'}`} />
              {!collapsed && <span>Profile</span>}
            </button>
          </div>
        </div>
      </div>

      <NotificationModal 
        isOpen={showNotifications} 
        onClose={() => setShowNotifications(false)} 
      />
      <ProfileModal 
        isOpen={showProfile} 
        onClose={() => setShowProfile(false)} 
      />
    </>
  );
};

export default Sidebar;