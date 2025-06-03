import React, { useState } from 'react';

const Stats = ({ totalTasks, completedTasks, pendingTasks }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <div className="text-2xl font-bold text-blue-600">{totalTasks}</div>
      <div className="text-sm text-gray-600">Total Tasks</div>
    </div>
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <div className="text-2xl font-bold text-green-600">{completedTasks}</div>
      <div className="text-sm text-gray-600">Completed</div>
    </div>
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <div className="text-2xl font-bold text-orange-600">{pendingTasks}</div>
      <div className="text-sm text-gray-600">Pending</div>
    </div>
  </div>
);

export default Stats;