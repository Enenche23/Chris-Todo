import React, { useState } from 'react';

const ClearAllButton = ({ onClearAll, disabled }) => (
  <div className="text-center mt-8">
    <button 
      onClick={onClearAll}
      disabled={disabled}
      className={`px-6 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 font-medium ${
        disabled 
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
          : 'bg-red-600 text-white hover:bg-red-700'
      }`}
    >
      Clear All Tasks
    </button>
  </div>
);

export default ClearAllButton;