import React, { useState } from 'react';

const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {
  if (!todo) return null;

  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.text || '');

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date';
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${Math.floor(diffInHours)} hours ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString();
  };

  const handleEdit = () => setIsEditing(true);
  const handleSaveEdit = () => {
    const trimmed = editValue.trim();
    if (trimmed) onEdit(todo.id, trimmed);
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSaveEdit();
    if (e.key === 'Escape') {
      setEditValue(todo.text || '');
      setIsEditing(false);
    }
  };

  return (
    <li className="p-4 rounded-xl bg-white dark:bg-zinc-800 shadow-sm hover:shadow-md transition-all duration-300 group">
      <div className="flex items-start sm:items-center gap-4">
        {/* Checkmark */}
        <button
          className={`w-6 h-6 shrink-0 rounded-full border-2 flex items-center justify-center transition-all duration-300 mt-1 sm:mt-0
            ${todo.completed ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 dark:border-zinc-500 hover:border-green-400'}
          `}
          onClick={() => onToggle(todo.id)}
          aria-label="Toggle complete"
        >
          {todo.completed ? '✓' : ''}
        </button>

        {/* Text or Edit Field */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-zinc-600 focus:ring-2 focus:ring-blue-500 outline-none dark:bg-zinc-700 dark:text-white transition-all"
              onBlur={handleSaveEdit}
              onKeyDown={handleKeyPress}
              autoFocus
            />
          ) : (
            <span
              onDoubleClick={handleEdit}
              className={`block text-sm sm:text-base text-gray-800 dark:text-gray-200 cursor-pointer transition-colors duration-200 ${
                todo.completed ? 'line-through text-gray-400 dark:text-zinc-500' : ''
              }`}
              title="Double-click to edit"
            >
              {todo.text || 'No task text'}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 items-center">
          <button
            onClick={handleEdit}
            className="text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            title="Edit task"
          >
            ✏️
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
            title="Delete task"
          >
            🗑️
          </button>
        </div>
      </div>

      {/* Metadata */}
      <div className="ml-10 text-xs text-gray-400 dark:text-zinc-500 mt-1">
        Created {formatDate(todo.createdAt)}
      </div>
    </li>
  );
};

export default TodoItem;
