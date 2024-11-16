import React, { useState } from 'react';
import { Key, Plus, Copy, Check, Trash2, Table } from 'lucide-react';
import { utils, writeFile } from 'xlsx';
import { InviteCode } from '../../types';

interface InviteTabProps {
  inviteCodes: InviteCode[];
  onCreateCode: (code: InviteCode) => void;
  onDeleteCode: (id: string) => void;
}

const InviteTab: React.FC<InviteTabProps> = ({
  inviteCodes,
  onCreateCode,
  onDeleteCode,
}) => {
  const [copied, setCopied] = useState<string | null>(null);
  const [bulkAmount, setBulkAmount] = useState<number>(10);
  const [prefix, setPrefix] = useState<string>('');

  const generateCode = (index?: number): InviteCode => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    const uniqueId = `${timestamp}-${random}${index ? `-${index}` : ''}`;
    const randomCode = Math.random().toString(36).substring(2, 10).toUpperCase();
    const code = prefix ? `${prefix}-${randomCode}` : randomCode;
    
    return {
      id: uniqueId,
      code,
      used: false,
      createdAt: new Date().toISOString(),
    };
  };

  const handleGenerateSingle = () => {
    onCreateCode(generateCode());
  };

  const handleGenerateBulk = () => {
    const amount = Math.min(Math.max(1, bulkAmount), 100);
    Array.from({ length: amount }).forEach((_, index) => {
      onCreateCode(generateCode(index));
    });
  };

  const handleCopyToClipboard = async (code: string, id: string) => {
    await navigator.clipboard.writeText(code);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleCopyAll = async () => {
    const codes = inviteCodes.map(invite => invite.code).join('\n');
    await navigator.clipboard.writeText(codes);
    setCopied('all');
    setTimeout(() => setCopied(null), 2000);
  };

  const handleExport = () => {
    const data = inviteCodes.map(invite => ({
      'Invite Code': invite.code,
      'Created Date': new Date(invite.createdAt).toLocaleDateString(),
      'Status': invite.used ? 'Used' : 'Available'
    }));

    const ws = utils.json_to_sheet(data);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Invite Codes');
    writeFile(wb, 'invite-codes.xlsx');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Key className="w-8 h-8 text-purple-500" />
        <h2 className="text-2xl font-semibold text-gray-800">Invite Codes</h2>
      </div>

      {/* Code Generator */}
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
            onClick={handleGenerateSingle}
            className="flex-1 bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg
              flex items-center justify-center gap-2 transition-all hover:scale-105"
          >
            <Plus className="w-5 h-5" />
            Generate Single Code
          </button>
          <button
            onClick={handleGenerateBulk}
            className="flex-1 bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg
              flex items-center justify-center gap-2 transition-all hover:scale-105"
          >
            <Plus className="w-5 h-5" />
            Generate {bulkAmount} Codes
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleCopyAll}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg
            flex items-center justify-center gap-2 transition-all hover:scale-105"
        >
          <Copy className="w-5 h-5" />
          {copied === 'all' ? 'Copied!' : 'Copy All Codes'}
        </button>
        <button
          onClick={handleExport}
          className="flex-1 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg
            flex items-center justify-center gap-2 transition-all hover:scale-105"
        >
          <Table className="w-5 h-5" />
          Export to Excel
        </button>
      </div>

      {/* Code List */}
      {inviteCodes.length === 0 ? (
        <div className="bg-white rounded-xl p-8 text-center shadow-sm">
          <p className="text-gray-500">No invite codes generated yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Generated Codes</h3>
          <div className="space-y-3">
            {inviteCodes.map((code) => (
              <div key={code.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-lg font-medium text-gray-800">
                      {code.code}
                    </span>
                    <button
                      onClick={() => handleCopyToClipboard(code.code, code.id)}
                      className="text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-white"
                      title="Copy code"
                    >
                      {copied === code.id ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>Created: {new Date(code.createdAt).toLocaleDateString()}</span>
                    <span className={`font-medium ${code.used ? 'text-red-500' : 'text-green-500'}`}>
                      {code.used ? 'Used' : 'Available'}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => onDeleteCode(code.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-white"
                  title="Delete code"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Statistics */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Usage Statistics</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-purple-600 font-medium">Total Codes</p>
            <p className="text-2xl font-bold text-purple-700">{inviteCodes.length}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-green-600 font-medium">Available</p>
            <p className="text-2xl font-bold text-green-700">
              {inviteCodes.filter(code => !code.used).length}
            </p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <p className="text-sm text-red-600 font-medium">Used</p>
            <p className="text-2xl font-bold text-red-700">
              {inviteCodes.filter(code => code.used).length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InviteTab;