import React from 'react';
import EmptyState from './EmptyState.jsx';
import TodoItem from './TodoItem.jsx';

const TodoList = ({ todos = [], onToggle, onDelete, onEdit }) => {
  if (!Array.isArray(todos)) {
    return (
      <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-lg p-6">
        <p className="text-gray-500 dark:text-gray-400 text-center">Loading todos...</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-xl overflow-hidden">
      <div className="p-6 border-b border-gray-100 dark:border-zinc-700">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Your Tasks</h2>
      </div>

      <div className="max-h-[28rem] overflow-y-auto custom-scrollbar transition-all">
        {todos.length === 0 ? (
          <EmptyState />
        ) : (
          <ul className="divide-y divide-gray-100 dark:divide-zinc-700">
            {todos.map((todo) => (
              <li key={todo.id} className="animate-fade-in">
                <TodoItem
                  todo={todo}
                  onToggle={onToggle}
                  onDelete={onDelete}
                  onEdit={onEdit}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TodoList;
