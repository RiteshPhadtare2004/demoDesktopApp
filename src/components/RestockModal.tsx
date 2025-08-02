import React, { useState } from 'react';
import { X, Package, Calendar, DollarSign, FileText, Droplets } from 'lucide-react';
import { addToast } from './Toaster';

interface RestockModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'paper' | 'ink';
}

const RestockModal: React.FC<RestockModalProps> = ({ isOpen, onClose, type }) => {
  const [formData, setFormData] = useState({
    itemType: '',
    quantity: '',
    restockDate: '',
    amountSpent: '',
    supplier: '',
    notes: '',
    // Ink specific
    colors: [] as string[]
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addToast({
      type: 'success',
      title: 'Restock Added',
      message: `${type === 'paper' ? 'Paper' : 'Ink'} restock has been successfully recorded.`
    });
    
    // Reset form
    setFormData({
      itemType: '',
      quantity: '',
      restockDate: '',
      amountSpent: '',
      supplier: '',
      notes: '',
      colors: []
    });
    
    onClose();
  };

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleColorChange = (color: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        colors: [...prev.colors, color]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        colors: prev.colors.filter(c => c !== color)
      }));
    }
  };

  const paperTypes = [
    'A4 White', 'A3 White', 'Letter Size', 'Legal Size', 
    'A4 Color', 'A3 Color', 'Photo Paper', 'Cardstock'
  ];

  const inkTypes = [
    'Black Cartridge', 'Color Cartridge Set', 'Individual Color', 
    'High Yield Black', 'High Yield Color', 'Refill Kit'
  ];

  const colorOptions = ['Black', 'Cyan', 'Magenta', 'Yellow', 'Light Cyan', 'Light Magenta'];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center">
            {type === 'paper' ? (
              <FileText className="w-5 h-5 mr-2 text-blue-600" />
            ) : (
              <Droplets className="w-5 h-5 mr-2 text-purple-600" />
            )}
            Add {type === 'paper' ? 'Paper' : 'Ink'} Restock
          </h2>
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
                <Package className="w-4 h-4 inline mr-1" />
                {type === 'paper' ? 'Paper Type' : 'Ink Type'}
              </label>
              <select
                value={formData.itemType}
                onChange={(e) => handleInputChange('itemType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select {type === 'paper' ? 'Paper' : 'Ink'} Type</option>
                {(type === 'paper' ? paperTypes : inkTypes).map(item => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity ({type === 'paper' ? 'sheets' : 'cartridges'})
              </label>
              <input
                type="number"
                value={formData.quantity}
                onChange={(e) => handleInputChange('quantity', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0"
                min="1"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                Restock Date
              </label>
              <input
                type="date"
                value={formData.restockDate}
                onChange={(e) => handleInputChange('restockDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <DollarSign className="w-4 h-4 inline mr-1" />
                Amount Spent ($)
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.amountSpent}
                onChange={(e) => handleInputChange('amountSpent', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.00"
                min="0"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Supplier
              </label>
              <input
                type="text"
                value={formData.supplier}
                onChange={(e) => handleInputChange('supplier', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter supplier name"
              />
            </div>

            {type === 'ink' && (
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Colors (select all that apply)
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {colorOptions.map(color => (
                    <div key={color} className="flex items-center">
                      <input
                        type="checkbox"
                        id={color}
                        checked={formData.colors.includes(color)}
                        onChange={(e) => handleColorChange(color, e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor={color} className="ml-2 text-sm text-gray-700 flex items-center">
                        <div 
                          className={`w-3 h-3 rounded-full mr-2 ${
                            color === 'Black' ? 'bg-gray-800' :
                            color === 'Cyan' ? 'bg-cyan-500' :
                            color === 'Magenta' ? 'bg-pink-500' :
                            color === 'Yellow' ? 'bg-yellow-500' :
                            color === 'Light Cyan' ? 'bg-cyan-300' :
                            'bg-pink-300'
                          }`}
                        />
                        {color}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Additional notes about the restock..."
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
              Add Restock
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RestockModal;