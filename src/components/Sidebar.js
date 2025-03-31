import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import dashboardIcon from '../Assets/dashboard.png';
import portfolioIcon from '../Assets/portfolio.png';
import notificationsIcon from '../Assets/notifications.png';
import noticesIcon from '../Assets/notices.png';
import auctionIcon from '../Assets/auction.png';
import dataUploadIcon from '../Assets/data-upload.png';
import controlPanelIcon from '../Assets/control-panel.png';
import userManagementIcon from '../Assets/user-management.png';
import permissionsIcon from '../Assets/permissions.png';
import logo from '../Assets/resollect_logo.jpeg'; 

function Sidebar({ onUploadClick }) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { icon: dashboardIcon, label: 'Dashboard', path: '/' },
    { icon: portfolioIcon, label: 'Portfolio', path: '/portfolio' },
    { icon: notificationsIcon, label: 'Notifications', path: '/notifications' },
    { icon: noticesIcon, label: 'Notices', path: '/notices' },
    { icon: auctionIcon, label: 'Auction', path: '/auction' },
    { icon: dataUploadIcon, label: 'Data Upload', path: null, onClick: onUploadClick },
    { icon: controlPanelIcon, label: 'Control Panel', path: '/control-panel' },
    { icon: userManagementIcon, label: 'User Management', path: '/users' },
    { icon: permissionsIcon, label: 'Permissions', path: '/permissions' },
  ];

  return (
    <div className={`bg-white shadow-lg h-screen fixed left-0 top-0 flex flex-col justify-between transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'}`}>
      {/* Sidebar Content */}
      <div>
        {/* Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute -right-3 top-10 bg-white rounded-full p-1 shadow-md hover:bg-gray-50"
        >
          <svg
            className={`w-4 h-4 text-gray-600 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Menu Items */}
        <div className="pt-16">
          {menuItems.map((item, index) => (
            item.path ? (
              <Link
                key={index}
                to={item.path}
                className={`flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 transition-colors duration-200 ${
                  location.pathname === item.path ? 'bg-blue-600 text-white hover:bg-blue-700' : ''
                }`}
              >
                <img src={item.icon} alt={item.label} className="w-6 h-6 mr-4 filter brightness-0 invert-20" />
                {isOpen && <span className="font-medium">{item.label}</span>}
              </Link>
            ) : (
              <button
                key={index}
                onClick={item.onClick}
                className="w-full flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 transition-colors duration-200"
              >
                <img src={item.icon} alt={item.label} className="w-6 h-6 mr-4 filter brightness-0 invert-20" />
                {isOpen && <span className="font-medium">{item.label}</span>}
              </button>
            )
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-center border-t pt-4 pb-4">
        <span className="text-gray-500 text-sm">Powered by </span>
        <img src={logo} alt="Resollect Logo" className="w-6 h-6 ml-1 " />
      </div>
    </div>
  );
}

export default Sidebar;
