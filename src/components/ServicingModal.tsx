import React, { useState } from 'react';
import { X, Calendar, User, Phone, DollarSign, Printer } from 'lucide-react';
import { addToast } from './Toaster';

interface ServicingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ServicingModal: React.FC<ServicingModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    printer: '',
    serviceDate: '',
    servicePersonName: '',
    contact: '',
    amountPaid: '',
    serviceType: '',
    notes: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically save to backend
    addToast({
      type: 'success',
      title: 'Service Scheduled',
      message: 'Printer servicing has been successfully scheduled.'
    });
    
    // Reset form
    setFormData({
      printer: '',
      serviceDate: '',
      servicePersonName: '',
      contact: '',
      amountPaid: '',
      serviceType: '',
      notes: ''
    });
    
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Schedule New Servicing</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Printer className="w-4 h-4 inline mr-1" />
                Printer
              </label>
              <select
                value={formData.printer}
                onChange={(e) => handleInputChange('printer', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select Printer</option>
                <option value="Canon Color Printer #1">Canon Color Printer #1</option>
                <option value="HP LaserJet #2">HP LaserJet #2</option>
                <option value="Epson WorkForce #3">Epson WorkForce #3</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                Service Date
              </label>
              <input
                type="date"
                value={formData.serviceDate}
                onChange={(e) => handleInputChange('serviceDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-1" />
                Service Person Name
              </label>
              <input
                type="text"
                value={formData.servicePersonName}
                onChange={(e) => handleInputChange('servicePersonName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter service person name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Phone className="w-4 h-4 inline mr-1" />
                Contact Number
              </label>
              <input
                type="tel"
                value={formData.contact}
                onChange={(e) => handleInputChange('contact', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="+1 (555) 123-4567"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <DollarSign className="w-4 h-4 inline mr-1" />
                Amount Paid ($)
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.amountPaid}
                onChange={(e) => handleInputChange('amountPaid', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.00"
                min="0"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Service Type
              </label>
              <select
                value={formData.serviceType}
                onChange={(e) => handleInputChange('serviceType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select Service Type</option>
                <option value="Routine Maintenance">Routine Maintenance</option>
                <option value="Repair">Repair</option>
                <option value="Cleaning">Cleaning</option>
                <option value="Parts Replacement">Parts Replacement</option>
                <option value="Calibration">Calibration</option>
              </select>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Service Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Additional notes about the service..."
            />
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Schedule Service
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServicingModal;