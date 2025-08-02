import React, { useState } from 'react';
import { Search, Filter, Printer, Clock, CheckCircle, Package } from 'lucide-react';

interface PrintJob {
  id: string;
  customerName: string;
  fileName: string;
  pages: number;
  copies: number;
  colorType: 'Color' | 'B/W';
  targetPrinter: string;
  eta: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Queued' | 'Printing' | 'Complete';
  startedAt?: string;
  estimatedCost: number;
}

const PrintQueue: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const printJobs: PrintJob[] = [
    {
      id: 'PQ001',
      customerName: 'Alice Johnson',
      fileName: 'Project_Proposal.pdf',
      pages: 15,
      copies: 2,
      colorType: 'Color',
      targetPrinter: 'Canon Color Printer #1',
      eta: '2:30 PM',
      priority: 'High',
      status: 'Printing',
      startedAt: '2:15 PM',
      estimatedCost: 18.75
    },
    {
      id: 'PQ002',
      customerName: 'Bob Wilson',
      fileName: 'Contract_Draft.docx',
      pages: 8,
      copies: 1,
      colorType: 'B/W',
      targetPrinter: 'HP LaserJet #2',
      eta: '2:45 PM',
      priority: 'Medium',
      status: 'Queued',
      estimatedCost: 4.00
    },
    {
      id: 'PQ003',
      customerName: 'Carol Davis',
      fileName: 'Marketing_Materials.pdf',
      pages: 12,
      copies: 50,
      colorType: 'Color',
      targetPrinter: 'Canon Color Printer #1',
      eta: '4:15 PM',
      priority: 'High',
      status: 'Queued',
      estimatedCost: 150.00
    },
    {
      id: 'PQ004',
      customerName: 'David Brown',
      fileName: 'Invoice_Template.pdf',
      pages: 1,
      copies: 10,
      colorType: 'B/W',
      targetPrinter: 'HP LaserJet #2',
      eta: '2:20 PM',
      priority: 'Low',
      status: 'Complete',
      estimatedCost: 2.50
    }
  ];

  const filteredJobs = printJobs.filter(job =>
    job.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.targetPrinter.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Queued':
        return 'bg-yellow-100 text-yellow-800';
      case 'Printing':
        return 'bg-blue-100 text-blue-800';
      case 'Complete':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Queued':
        return <Clock className="w-4 h-4" />;
      case 'Printing':
        return <Printer className="w-4 h-4" />;
      case 'Complete':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getPrinterIcon = (printerName: string) => {
    if (printerName.includes('Color')) {
      return <div className="w-3 h-3 bg-gradient-to-r from-red-400 to-blue-400 rounded-full"></div>;
    }
    return <div className="w-3 h-3 bg-gray-400 rounded-full"></div>;
  };

  const handleAction = (jobId: string, action: string) => {
    console.log(`${action} action for job ${jobId}`);
    // Here you would implement the actual action logic
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Print Queue</h1>
        <p className="text-gray-600">Monitor and manage active print jobs</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Queued</p>
              <p className="text-2xl font-bold text-gray-900">
                {printJobs.filter(job => job.status === 'Queued').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Printer className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Printing</p>
              <p className="text-2xl font-bold text-gray-900">
                {printJobs.filter(job => job.status === 'Printing').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Complete</p>
              <p className="text-2xl font-bold text-gray-900">
                {printJobs.filter(job => job.status === 'Complete').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Package className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Jobs</p>
              <p className="text-2xl font-bold text-gray-900">{printJobs.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by customer, file name, job ID, or printer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <button className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </button>
        </div>
      </div>

      {/* Print Queue Table */}
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
                  Target Printer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Specifications
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ETA
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cost
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredJobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{job.id}</div>
                      <div className="text-sm text-gray-500">{job.fileName}</div>
                      {job.startedAt && (
                        <div className="text-xs text-gray-400">Started: {job.startedAt}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{job.customerName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getPrinterIcon(job.targetPrinter)}
                      <span className="ml-2 text-sm text-gray-900">{job.targetPrinter}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {job.pages} pages × {job.copies} copies
                    </div>
                    <div className="text-sm text-gray-500">{job.colorType}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-900">{job.eta}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                      <span className="mr-1">{getStatusIcon(job.status)}</span>
                      {job.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${job.estimatedCost.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      {job.status === 'Complete' ? (
                        <button 
                          onClick={() => handleAction(job.id, 'picked')}
                          className="text-green-600 hover:text-green-900 px-3 py-1 rounded-lg border border-green-200 hover:bg-green-50 transition-colors"
                        >
                          Picked
                        </button>
                      ) : job.status === 'Queued' ? (
                        <button 
                          onClick={() => handleAction(job.id, 'start')}
                          className="text-blue-600 hover:text-blue-900 px-3 py-1 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors"
                        >
                          Start
                        </button>
                      ) : (
                        <button 
                          onClick={() => handleAction(job.id, 'pause')}
                          className="text-orange-600 hover:text-orange-900 px-3 py-1 rounded-lg border border-orange-200 hover:bg-orange-50 transition-colors"
                        >
                          Pause
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PrintQueue;