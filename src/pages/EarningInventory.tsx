import React, { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  Package, 
  Wrench, 
  Calendar,
  Plus,
  Edit,
  FileText,
  Printer,
  Droplets,
  History
} from 'lucide-react';
import ServicingModal from '../components/ServicingModal';
import RestockModal from '../components/RestockModal';

const EarningInventory: React.FC = () => {
  const [showServicingModal, setShowServicingModal] = useState(false);
  const [showRestockModal, setShowRestockModal] = useState(false);
  const [restockType, setRestockType] = useState<'paper' | 'ink'>('paper');

  // Sample data
  const earningsData = {
    totalRevenue: 15247.80,
    monthlyGrowth: 8.5,
    topServices: [
      { name: 'Color Printing', revenue: 8540.20, percentage: 56 },
      { name: 'B/W Printing', revenue: 4230.45, percentage: 28 },
      { name: 'Binding Services', revenue: 1876.30, percentage: 12 },
      { name: 'Large Format', revenue: 600.85, percentage: 4 }
    ]
  };

  const inventoryData = {
    paperStock: [
      { type: 'A4 White', quantity: 2500, lastRestock: '2024-01-10', amountSpent: 125.00 },
      { type: 'A3 White', quantity: 1200, lastRestock: '2024-01-08', amountSpent: 89.50 },
      { type: 'Letter Size', quantity: 800, lastRestock: '2024-01-05', amountSpent: 45.30 }
    ],
    inkStock: [
      { colors: ['Black'], quantity: 15, lastRestock: '2024-01-12', amountSpent: 180.00 },
      { colors: ['Cyan', 'Magenta', 'Yellow'], quantity: 8, lastRestock: '2024-01-12', amountSpent: 240.00 },
      { colors: ['Black', 'Color'], quantity: 12, lastRestock: '2024-01-10', amountSpent: 320.00 }
    ]
  };

  const servicingData = [
    {
      id: 1,
      lastServiceDate: '2024-01-01',
      servicePersonName: 'Mike Johnson',
      amountPaid: 150.00,
      contact: '+1 (555) 123-4567',
      printer: 'Canon Color Printer #1'
    },
    {
      id: 2,
      lastServiceDate: '2023-12-15',
      servicePersonName: 'Sarah Wilson',
      amountPaid: 120.00,
      contact: '+1 (555) 987-6543',
      printer: 'HP LaserJet #2'
    }
  ];

  const recentHistory = [
    { id: 'H001', customer: 'John Doe', amount: 45.50, type: 'Color', date: '2024-01-15' },
    { id: 'H002', customer: 'Jane Smith', amount: 12.00, type: 'B/W', date: '2024-01-15' },
    { id: 'H003', customer: 'Bob Johnson', amount: 89.25, type: 'Color', date: '2024-01-14' },
    { id: 'H004', customer: 'Alice Brown', amount: 25.75, type: 'B/W', date: '2024-01-14' },
    { id: 'H005', customer: 'Carol Davis', amount: 156.80, type: 'Color', date: '2024-01-13' }
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Earning & Stock Management</h1>
        <p className="text-gray-600">Monitor revenue and manage inventory</p>
      </div>

      {/* Earnings Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Earnings Overview</h2>
        
        {/* Revenue Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-900">
                  ${earningsData.totalRevenue.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Monthly Growth</p>
                <p className="text-3xl font-bold text-green-600">
                  +{earningsData.monthlyGrowth}%
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Calendar className="w-8 h-8 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-3xl font-bold text-gray-900">
                  ${(earningsData.totalRevenue * 0.3).toFixed(0)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Top Services */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Services & Revenue Breakdown</h3>
          <div className="space-y-4">
            {earningsData.topServices.map((service, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center flex-1">
                  <div className="w-4 h-4 bg-blue-600 rounded mr-4" style={{
                    backgroundColor: `hsl(${200 + index * 40}, 70%, 50%)`
                  }}></div>
                  <span className="font-medium text-gray-800">{service.name}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full" 
                      style={{
                        width: `${service.percentage}%`,
                        backgroundColor: `hsl(${200 + index * 40}, 70%, 50%)`
                      }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-12">{service.percentage}%</span>
                  <span className="font-semibold text-gray-900 w-24 text-right">
                    ${service.revenue.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Inventory Management Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Inventory Management</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Paper Stock */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-blue-600" />
                Paper Stock
              </h3>
              <button 
                onClick={() => {
                  setRestockType('paper');
                  setShowRestockModal(true);
                }}
                className="flex items-center px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4 mr-1" />
                Restock
              </button>
            </div>
            <div className="space-y-3">
              {inventoryData.paperStock.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">{item.type}</p>
                    <p className="text-sm text-gray-600">Last restock: {item.lastRestock}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{item.quantity} sheets</p>
                    <p className="text-sm text-gray-600">${item.amountSpent.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ink Stock */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <Droplets className="w-5 h-5 mr-2 text-purple-600" />
                Ink Stock
              </h3>
              <button 
                onClick={() => {
                  setRestockType('ink');
                  setShowRestockModal(true);
                }}
                className="flex items-center px-3 py-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4 mr-1" />
                Restock
              </button>
            </div>
            <div className="space-y-3">
              {inventoryData.inkStock.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      {item.colors.map((color, colorIndex) => (
                        <div 
                          key={colorIndex}
                          className={`w-3 h-3 rounded-full ${
                            color === 'Black' ? 'bg-gray-800' :
                            color === 'Cyan' ? 'bg-cyan-500' :
                            color === 'Magenta' ? 'bg-pink-500' :
                            color === 'Yellow' ? 'bg-yellow-500' :
                            'bg-gradient-to-r from-cyan-500 to-pink-500'
                          }`}
                        />
                      ))}
                      <span className="font-medium text-gray-800">{item.colors.join(', ')}</span>
                    </div>
                    <p className="text-sm text-gray-600">Last restock: {item.lastRestock}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{item.quantity} cartridges</p>
                    <p className="text-sm text-gray-600">${item.amountSpent.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Printer Servicing Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Printer Servicing</h2>
          <div className="flex space-x-3">
            <button 
              onClick={() => setShowServicingModal(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Schedule New Servicing
            </button>
            <button className="flex items-center px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
              <Edit className="w-4 h-4 mr-2" />
              Update Servicing Data
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Printer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Service Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service Person
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount Paid
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {servicingData.map((service) => (
                <tr key={service.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Printer className="w-5 h-5 text-gray-400 mr-2" />
                      <span className="text-sm font-medium text-gray-900">{service.printer}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {service.lastServiceDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {service.servicePersonName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${service.amountPaid.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {service.contact}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent History Section */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <History className="w-5 h-5 mr-2 text-green-600" />
          Recent Print History (Last 5)
        </h2>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Job ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentHistory.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.type === 'Color' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {item.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${item.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ServicingModal 
        isOpen={showServicingModal}
        onClose={() => setShowServicingModal(false)}
      />
      <RestockModal 
        isOpen={showRestockModal}
        onClose={() => setShowRestockModal(false)}
        type={restockType}
      />
    </div>
  );
};

export default EarningInventory;