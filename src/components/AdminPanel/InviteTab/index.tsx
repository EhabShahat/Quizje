import React, { useState } from 'react';
import { Key } from 'lucide-react';
import { utils, writeFile } from 'xlsx';
import { InviteCode } from '../../../types';
import CodeGenerator from './CodeGenerator';
import CodeList from './CodeList';
import CodeActions from './CodeActions';
import Statistics from './Statistics';

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
    // Create an array of the specified length and generate codes
    Array.from({ length: amount }, (_, index) => {
      const newCode = generateCode(index);
      onCreateCode(newCode);
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

      <CodeGenerator
        bulkAmount={bulkAmount}
        setBulkAmount={setBulkAmount}
        prefix={prefix}
        setPrefix={setPrefix}
        onGenerateSingle={handleGenerateSingle}
        onGenerateBulk={handleGenerateBulk}
      />

      <CodeActions
        onCopyAll={handleCopyAll}
        onExport={handleExport}
        copied={copied}
      />

      <CodeList
        codes={inviteCodes}
        onDelete={onDeleteCode}
        copied={copied}
        onCopy={handleCopyToClipboard}
      />

      <Statistics codes={inviteCodes} />
    </div>
  );
};

export default InviteTab;