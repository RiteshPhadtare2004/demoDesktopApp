import React from 'react';
import { X, Bell, AlertCircle, CheckCircle, Clock } from 'lucide-react';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const notifications = [
    {
      id: 1,
      type: 'success',
      title: 'Print Job Completed',
      message: 'Job #12345 has been successfully printed',
      time: '2 minutes ago',
      icon: CheckCircle,
      color: 'text-green-600 bg-green-100'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Low Ink Warning',
      message: 'Color printer ink level is below 20%',
      time: '1 hour ago',
      icon: AlertCircle,
      color: 'text-yellow-600 bg-yellow-100'
    },
    {
      id: 3,
      type: 'info',
      title: 'New Print Job',
      message: 'New job received from customer John Doe',
      time: '3 hours ago',
      icon: Clock,
      color: 'text-blue-600 bg-blue-100'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-800">Notifications</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        <div className="max-h-96 overflow-y-auto">
          {notifications.map((notification) => {
            const Icon = notification.icon;
            return (
              <div key={notification.id} className="p-4 border-b border-gray-100 hover:bg-gray-50">
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-full ${notification.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">{notification.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                    <span className="text-xs text-gray-400 mt-2 block">{notification.time}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="p-4 border-t border-gray-200">
          <button className="w-full text-center text-blue-600 hover:text-blue-700 font-medium">
            Mark all as read
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;