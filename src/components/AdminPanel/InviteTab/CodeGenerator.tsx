import React from 'react';
import { Plus } from 'lucide-react';

interface CodeGeneratorProps {
  bulkAmount: number;
  setBulkAmount: (amount: number) => void;
  prefix: string;
  setPrefix: (prefix: string) => void;
  onGenerateSingle: () => void;
  onGenerateBulk: () => void;
}

const CodeGenerator: React.FC<CodeGeneratorProps> = ({
  bulkAmount,
  setBulkAmount,
  prefix,
  setPrefix,
  onGenerateSingle,
  onGenerateBulk,
}) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Generate Codes</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bulk Generation Amount (1-100)
          </label>
          <input
            type="number"
            min="1"
            max="100"
            value={bulkAmount}
            onChange={(e) => setBulkAmount(Math.min(Math.max(1, parseInt(e.target.value) || 1), 100))}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Code Prefix (Optional)
          </label>
          <input
            type="text"
            value={prefix}
            onChange={(e) => setPrefix(e.target.value.toUpperCase())}
            placeholder="e.g., QUIZ2024"
            maxLength={10}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onGenerateSingle}
          className="flex-1 bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg
            flex items-center justify-center gap-2 transition-all hover:scale-105"
        >
          <Plus className="w-5 h-5" />
          Generate Single Code
        </button>
        <button
          onClick={onGenerateBulk}
          className="flex-1 bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg
            flex items-center justify-center gap-2 transition-all hover:scale-105"
        >
          <Plus className="w-5 h-5" />
          Generate {bulkAmount} Codes
        </button>
      </div>
    </div>
  );
};

export default CodeGenerator;