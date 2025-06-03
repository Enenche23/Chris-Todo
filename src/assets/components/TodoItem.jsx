import React, { useState } from 'react';

const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {
  // Add safety check at the beginning
  if (!todo) {
    return null; // Don't render anything if todo is undefined
  }

  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.text || ''); // Add fallback

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date'; // Add safety check
    
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return 'just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hours ago`;
    } else if (diffInHours < 48) {
      return 'yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    if (editValue.trim()) {
      onEdit(todo.id, editValue.trim());
    }
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSaveEdit();
    }
    if (e.key === 'Escape') {
      setEditValue(todo.text || ''); // Add fallback
      setIsEditing(false);
    }
  };

  return (
    <li className="p-4 hover:bg-gray-50 transition-colors duration-200 slide-in">
      <div className="flex items-center gap-3">
        <button 
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
            todo.completed 
              ? 'bg-green-500 border-green-500 text-white' 
              : 'border-gray-300 hover:border-green-400'
          }`}
          onClick={() => onToggle(todo.id)}
        >
          {todo.completed ? '✓' : ''}
        </button>
        
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <input 
              type="text" 
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
              autoFocus
              onBlur={handleSaveEdit}
              onKeyPress={handleKeyPress}
            />
          ) : (
            <span 
              className={`block text-gray-800 cursor-pointer ${
                todo.completed ? 'line-through text-gray-500' : ''
              }`}
              onDoubleClick={handleEdit}
              title="Double-click to edit"
            >
              {todo.text || 'No text'} {/* Add fallback */}
            </span>
          )}
        </div>
        
        <div className="flex gap-2">
          <button 
            className="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200"
            onClick={handleEdit}
            title="Edit task"
          >
            ✏️
          </button>
          <button 
            className="p-2 text-gray-400 hover:text-red-600 transition-colors duration-200"
            onClick={() => onDelete(todo.id)}
            title="Delete task"
          >
            🗑️
          </button>
        </div>
      </div>
      <div className="text-xs text-gray-400 mt-2 ml-8">
        Created {formatDate(todo.createdAt)}
      </div>
    </li>
  );
};

export default TodoItem;