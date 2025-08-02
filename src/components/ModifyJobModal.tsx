import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import { addToast } from './Toaster';

interface Job {
  id: string;
  customerName: string;
  fileName: string;
  fileType: string;
  pages: number;
  copies: number;
  colorType: 'Color' | 'B/W';
  paperSize: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Pending' | 'Processing' | 'Ready';
  submittedAt: string;
  estimatedCost: number;
}

interface ModifyJobModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
}

const ModifyJobModal: React.FC<ModifyJobModalProps> = ({ job, isOpen, onClose }) => {
  const [formData, setFormData] = useState<Partial<Job>>({});

  useEffect(() => {
    if (job) {
      setFormData(job);
    }
  }, [job]);

  if (!isOpen || !job) return null;

  const handleSave = () => {
    // Here you would typically save to backend
    addToast({
      type: 'success',
      title: 'Job Updated',
      message: `Job ${job.id} has been successfully updated.`
    });
    onClose();
  };

  const handleInputChange = (field: keyof Job, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">
            Modify Job Configuration - {job.id}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Customer Information */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Customer Name
              </label>
              <input
                type="text"
                value={formData.customerName || ''}
                onChange={(e) => handleInputChange('customerName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                File Name
              </label>
              <input
                type="text"
                value={formData.fileName || ''}
                onChange={(e) => handleInputChange('fileName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Print Specifications */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Pages
              </label>
              <input
                type="number"
                value={formData.pages || 0}
                onChange={(e) => handleInputChange('pages', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Copies
              </label>
              <input
                type="number"
                value={formData.copies || 0}
                onChange={(e) => handleInputChange('copies', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Color Type
              </label>
              <select
                value={formData.colorType || 'B/W'}
                onChange={(e) => handleInputChange('colorType', e.target.value as 'Color' | 'B/W')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="B/W">Black & White</option>
                <option value="Color">Color</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Paper Size
              </label>
              <select
                value={formData.paperSize || 'A4'}
                onChange={(e) => handleInputChange('paperSize', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="A4">A4</option>
                <option value="A3">A3</option>
                <option value="Letter">Letter</option>
                <option value="Legal">Legal</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority
              </label>
              <select
                value={formData.priority || 'Medium'}
                onChange={(e) => handleInputChange('priority', e.target.value as 'High' | 'Medium' | 'Low')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={formData.status || 'Pending'}
                onChange={(e) => handleInputChange('status', e.target.value as 'Pending' | 'Processing' | 'Ready')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Ready">Ready</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estimated Cost ($)
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.estimatedCost || 0}
                onChange={(e) => handleInputChange('estimatedCost', parseFloat(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="0"
              />
            </div>

            {/* Additional Configuration Options */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Instructions
              </label>
              <textarea
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Any special instructions for this print job..."
              />
            </div>
          </div>

          {/* Print Settings */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 mb-4">Advanced Print Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="doubleSided"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="doubleSided" className="ml-2 text-sm text-gray-700">
                  Double-sided printing
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="stapling"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="stapling" className="ml-2 text-sm text-gray-700">
                  Stapling required
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="binding"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="binding" className="ml-2 text-sm text-gray-700">
                  Binding required
                </label>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-3 px-6 py-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModifyJobModal;