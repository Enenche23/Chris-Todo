import React, { useState } from 'react';
import EmptyState from './EmptyState.jsx';
import TodoItem from './TodoItem.jsx';

const TodoList = ({ todos = [], onToggle, onDelete, onEdit }) => {
  // Add safety check
  if (!todos || !Array.isArray(todos)) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <p className="text-gray-500 text-center">Loading todos...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800">Your Tasks</h2>
      </div>
      <div className="max-h-96 overflow-y-auto custom-scrollbar">
        {todos.length === 0 ? (
          <EmptyState />
        ) : (
          <ul className="divide-y divide-gray-100">
            {todos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={onToggle}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TodoList;