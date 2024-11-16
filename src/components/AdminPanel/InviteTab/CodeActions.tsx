import React from 'react';
import { Copy, Table, Download } from 'lucide-react';

interface CodeActionsProps {
  onCopyAll: () => void;
  onExport: () => void;
  copied: string | null;
}

const CodeActions: React.FC<CodeActionsProps> = ({
  onCopyAll,
  onExport,
  copied,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <button
        onClick={onCopyAll}
        className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg
          flex items-center justify-center gap-2 transition-all hover:scale-105"
      >
        <Copy className="w-5 h-5" />
        {copied === 'all' ? 'Copied!' : 'Copy All Codes'}
      </button>
      <button
        onClick={onExport}
        className="flex-1 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg
          flex items-center justify-center gap-2 transition-all hover:scale-105"
      >
        <Table className="w-5 h-5" />
        Export to Excel
      </button>
    </div>
  );
};

export default CodeActions;