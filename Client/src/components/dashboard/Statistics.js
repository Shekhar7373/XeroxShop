import React from 'react';
import { CheckCircle, Clock } from 'lucide-react';

const Statistics = ({ stats }) => {
  if (!stats) {
    return (
      <div className="flex items-center justify-center py-6 text-gray-500 dark:text-gray-300">
        Loading statistics...
      </div>
    );
  }

  const statItems = [
    { label: 'Total Documents', value: stats.totalDocuments, color: 'blue' },
    { label: 'Completed', value: stats.completedDocuments, icon: CheckCircle, color: 'green' },
    { label: 'Pending', value: stats.pendingDocuments, icon: Clock, color: 'yellow' }
  ];

  const colorMap = {
    blue: 'text-blue-600 dark:text-blue-400',
    green: 'text-green-600 dark:text-green-400',
    yellow: 'text-yellow-600 dark:text-yellow-400'
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {statItems.map(({ label, value, icon: Icon, color }) => (
        <div
          key={label}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center"
        >
          {Icon && <Icon className={`w-8 h-8 mx-auto mb-2 ${colorMap[color]}`} />}
          <div className="text-xl font-semibold text-gray-900 dark:text-white">{value}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">{label}</div>
        </div>
      ))}
    </div>
  );
};

export default Statistics;
