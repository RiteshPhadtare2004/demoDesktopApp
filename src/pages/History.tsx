import React, { useState } from 'react';
import { Search, Filter, Calendar, TrendingUp, TrendingDown, Palette, FileText, AlertCircle, CheckCircle } from 'lucide-react';

interface HistoryItem {
  id: string;
  customerName: string;
  fileName: string;
  pages: number;
  copies: number;
  colorType: 'Color' | 'B/W';
  status: 'Completed' | 'Failed';
  amount: number;
  date: string;
  time: string;
  printer: string;
}

const History: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc');
  const [statusFilter, setStatusFilter] = useState('all');
  const [colorFilter, setColorFilter] = useState('all');

  // Sample data
  const historyData: HistoryItem[] = [
    {
      id: 'H001',
      customerName: 'John Smith',
      fileName: 'Business_Report.pdf',
      pages: 25,
      copies: 3,
      colorType: 'Color',
      status: 'Completed',
      amount: 45.50,
      date: '2024-01-15',
      time: '10:30 AM',
      printer: 'Canon Color Printer #1'
    },
    {
      id: 'H002',
      customerName: 'Sarah Johnson',
      fileName: 'Marketing_Flyer.docx',
      pages: 2,
      copies: 100,
      colorType: 'Color',
      status: 'Completed',
      amount: 120.00,
      date: '2024-01-15',
      time: '09:45 AM',
      printer: 'Canon Color Printer #1'
    },
    {
      id: 'H003',
      customerName: 'Mike Davis',
      fileName: 'Resume.pdf',
      pages: 2,
      copies: 5,
      colorType: 'B/W',
      status: 'Failed',
      amount: 0.00,
      date: '2024-01-14',
      time: '08:15 AM',
      printer: 'HP LaserJet #2'
    },
    {
      id: 'H004',
      customerName: 'Emily Brown',
      fileName: 'Presentation.pptx',
      pages: 20,
      copies: 1,
      colorType: 'Color',
      status: 'Completed',
      amount: 35.00,
      date: '2024-01-14',
      time: '02:20 PM',
      printer: 'Canon Color Printer #1'
    },
    {
      id: 'H005',
      customerName: 'David Wilson',
      fileName: 'Contract.pdf',
      pages: 15,
      copies: 2,
      colorType: 'B/W',
      status: 'Completed',
      amount: 15.00,
      date: '2024-01-13',
      time: '11:45 AM',
      printer: 'HP LaserJet #2'
    },
    {
      id: 'H006',
      customerName: 'Lisa Anderson',
      fileName: 'Photo_Album.pdf',
      pages: 50,
      copies: 1,
      colorType: 'Color',
      status: 'Failed',
      amount: 0.00,
      date: '2024-01-13',
      time: '03:30 PM',
      printer: 'Canon Color Printer #1'
    }
  ];

  // Filter and sort logic
  const filteredAndSortedData = historyData
    .filter(item => {
      // Search filter
      const matchesSearch = item.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.id.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Status filter
      const matchesStatus = statusFilter === 'all' || item.status.toLowerCase() === statusFilter;
      
      // Color filter
      const matchesColor = colorFilter === 'all' || 
                          (colorFilter === 'color' && item.colorType === 'Color') ||
                          (colorFilter === 'bw' && item.colorType === 'B/W');
      
      return matchesSearch && matchesStatus && matchesColor;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'earning-high':
          return b.amount - a.amount;
        case 'earning-low':
          return a.amount - b.amount;
        case 'date-desc':
          return new Date(b.date + ' ' + b.time).getTime() - new Date(a.date + ' ' + a.time).getTime();
        case 'date-asc':
          return new Date(a.date + ' ' + a.time).getTime() - new Date(b.date + ' ' + b.time).getTime();
        default:
          return 0;
      }
    });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'Failed':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <CheckCircle className="w-4 h-4" />;
    }
  };

  // Calculate stats
  const totalEarnings = filteredAndSortedData.reduce((sum, item) => sum + item.amount, 0);
  const completedJobs = filteredAndSortedData.filter(item => item.status === 'Completed').length;
  const failedJobs = filteredAndSortedData.filter(item => item.status === 'Failed').length;
  const colorJobs = filteredAndSortedData.filter(item => item.colorType === 'Color').length;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">History</h1>
        <p className="text-gray-600">Complete history of all print jobs with advanced filtering</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Earnings</p>
              <p className="text-2xl font-bold text-gray-900">
                ${totalEarnings.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">{completedJobs}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Failed</p>
              <p className="text-2xl font-bold text-gray-900">{failedJobs}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Palette className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Color Jobs</p>
              <p className="text-2xl font-bold text-gray-900">{colorJobs}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
          {/* Search */}
          <div className="lg:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by customer name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Date Filter */}
          <div>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Dates</option>
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>

          {/* Sort By */}
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="date-desc">Latest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="earning-high">Earning: High to Low</option>
              <option value="earning-low">Earning: Low to High</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="failed">Failed</option>
            </select>
          </div>

          {/* Color Filter */}
          <div>
            <select
              value={colorFilter}
              onChange={(e) => setColorFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="color">Color Only</option>
              <option value="bw">B/W Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* History Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Job Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Specifications
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Printer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAndSortedData.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center">
                    <div className="flex flex-col items-center">
                      <FileText className="w-12 h-12 text-gray-400 mb-4" />
                      <p className="text-gray-500 text-lg">No history found</p>
                      <p className="text-gray-400 text-sm">Try adjusting your filters</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredAndSortedData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{item.id}</div>
                        <div className="text-sm text-gray-500">{item.fileName}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.customerName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {item.pages} pages × {item.copies} copies
                      </div>
                      <div className={`text-sm ${item.colorType === 'Color' ? 'text-purple-600' : 'text-gray-600'}`}>
                        {item.colorType}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.printer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                        <span className="mr-1">{getStatusIcon(item.status)}</span>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <span className={item.amount > 0 ? 'text-green-600' : 'text-gray-400'}>
                        ${item.amount.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.date}</div>
                      <div className="text-sm text-gray-500">{item.time}</div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination could be added here */}
        <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">{filteredAndSortedData.length}</span> results
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;