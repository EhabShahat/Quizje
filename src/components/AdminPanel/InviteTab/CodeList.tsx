import React from 'react';
import { Copy, Check, Trash2 } from 'lucide-react';
import { InviteCode } from '../../../types';
import CodeListItem from './CodeListItem';

interface CodeListProps {
  codes: InviteCode[];
  onDelete: (id: string) => void;
  copied: string | null;
  onCopy: (code: string, id: string) => void;
}

const CodeList: React.FC<CodeListProps> = ({
  codes,
  onDelete,
  copied,
  onCopy,
}) => {
  if (codes.length === 0) {
    return (
      <div className="bg-white rounded-xl p-8 text-center shadow-sm">
        <p className="text-gray-500">No invite codes generated yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Generated Codes</h3>
      <div className="space-y-3">
        {codes.map((code) => (
          <CodeListItem
            key={code.id}
            code={code}
            onDelete={onDelete}
            copied={copied}
            onCopy={onCopy}
          />
        ))}
      </div>
    </div>
  );
};

export default CodeList;