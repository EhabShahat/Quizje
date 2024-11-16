import React from 'react';
import { Copy, Check, Trash2 } from 'lucide-react';
import { InviteCode } from '../../../types';

interface CodeListItemProps {
  code: InviteCode;
  onDelete: (id: string) => void;
  copied: string | null;
  onCopy: (code: string, id: string) => void;
}

const CodeListItem: React.FC<CodeListItemProps> = ({
  code,
  onDelete,
  copied,
  onCopy,
}) => {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="font-mono text-lg font-medium text-gray-800">
            {code.code}
          </span>
          <button
            onClick={() => onCopy(code.code, code.id)}
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
        onClick={() => onDelete(code.id)}
        className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-white"
        title="Delete code"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
};

export default CodeListItem;