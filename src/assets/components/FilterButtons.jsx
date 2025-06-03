import React, { useState } from 'react';

const FilterButtons = ({ currentFilter, onFilterChange }) => {
  const filters = [
    { key: 'all', label: 'All Tasks' },
    { key: 'pending', label: 'Pending' },
    { key: 'completed', label: 'Completed' }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
      <div className="flex flex-wrap gap-2 justify-center">
        {filters.map(filter => (
          <button 
            key={filter.key}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              currentFilter === filter.key 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            onClick={() => onFilterChange(filter.key)}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterButtons;