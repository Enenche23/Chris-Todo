import React, { useState } from 'react';

const AddTodoForm = ({ onAddTodo }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = () => {
    const text = inputValue.trim();
    if (!text) return;
    onAddTodo(text);
    setInputValue('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-lg p-6 mb-8 transition-colors duration-300">
      <div className="flex flex-col sm:flex-row gap-4">
        <input 
          type="text" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="What needs to be done?" 
          className="flex-1 px-4 py-3 text-gray-800 dark:text-white bg-gray-50 dark:bg-zinc-700 border border-gray-200 dark:border-zinc-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
          onKeyDown={handleKeyPress}
        />
        <button 
          onClick={handleSubmit}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium shadow-md"
        >
          Add Task
        </button>
      </div>
    </div>
  );
};

export default AddTodoForm;
