import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';

const SearchFilter = ({ onFilter }) => {
  const [keyword, setKeyword] = useState('');
  const [status, setStatus] = useState('all');

  const handleSearch = () => {
    onFilter({ keyword, status });
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-6">
      <div className="flex items-center space-x-2 w-full md:w-1/2">
        <Search className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name or file name"
          className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>
      <div className="flex items-center space-x-3">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
        >
          <option value="all">All Status</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          <Filter className="w-4 h-4 inline mr-1" />
          Filter
        </button>
      </div>
    </div>
  );
};

export default SearchFilter;
