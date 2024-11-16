import React from 'react';
import { InviteCode } from '../../../types';

interface StatisticsProps {
  codes: InviteCode[];
}

const Statistics: React.FC<StatisticsProps> = ({ codes }) => {
  const usedCodes = codes.filter(code => code.used).length;
  const availableCodes = codes.length - usedCodes;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Usage Statistics</h3>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-purple-50 p-4 rounded-lg">
          <p className="text-sm text-purple-600 font-medium">Total Codes</p>
          <p className="text-2xl font-bold text-purple-700">{codes.length}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-green-600 font-medium">Available</p>
          <p className="text-2xl font-bold text-green-700">{availableCodes}</p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <p className="text-sm text-red-600 font-medium">Used</p>
          <p className="text-2xl font-bold text-red-700">{usedCodes}</p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;