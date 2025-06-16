import React, { useState, useEffect } from 'react';
import Header from './Header.jsx';
import CustomStyles from './CustomStyles.jsx';
import AddTodoForm from './AddTodoForm.jsx';
import Stats from './Stats.jsx';
import FilterButtons from './FilterButtons.jsx';
import TodoList from './TodoListContainer.jsx';
import ClearAllButton from './ClearAllButton.jsx';
import EmptyState from './EmptyState.jsx';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [currentFilter, setCurrentFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('todos') || '[]');
      setTodos(Array.isArray(stored) ? stored : []);
    } catch (error) {
      console.error('Error loading todos from localStorage:', error);
    } finally {
      // Add a small delay to show loading state
      setTimeout(() => setIsLoading(false), 300);
    }
  }, []);

  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem('todos', JSON.stringify(todos));
      } catch (error) {
        console.error('Error saving todos to localStorage:', error);
      }
    }
  }, [todos, isLoading]);

  const addTodo = (text) => {
    const todo = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTodos(prev => [todo, ...prev]);
  };

  const toggleTodo = (id) => {
    setTodos(prev => 
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const editTodo = (id, newText) => {
    const trimmedText = newText.trim();
    if (trimmedText) {
      setTodos(prev => 
        prev.map(todo => 
          todo.id === id ? { ...todo, text: trimmedText } : todo
        )
      );
    }
  };

  const clearAllTodos = () => {
    if (todos.length === 0) return;
    if (window.confirm('Are you sure you want to delete all tasks? This action cannot be undone.')) {
      setTodos([]);
    }
  };

  const getFilteredTodos = () => {
    switch (currentFilter) {
      case 'completed': return todos.filter(todo => todo.completed);
      case 'pending': return todos.filter(todo => !todo.completed);
      default: return todos;
    }
  };

  const filteredTodos = getFilteredTodos();
  const totalTasks = todos.length;
  const completedTasks = todos.filter(todo => todo.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 dark:from-slate-900 dark:via-purple-900 dark:to-indigo-900 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400"></div>
          <p className="text-gray-600 dark:text-gray-300 font-medium">Loading your tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 dark:from-slate-900 dark:via-purple-900 dark:to-indigo-900 transition-all duration-500">
      <CustomStyles />
      
      {/* Main Container */}
      <div className="container mx-auto px-4 py-6 sm:py-8 lg:py-12">
        <div className="max-w-4xl mx-auto">
          
          {/* Main Card */}
          <div className="bg-white/80 dark:bg-slate-800/90 backdrop-blur-lg shadow-2xl rounded-2xl sm:rounded-3xl border border-white/20 dark:border-slate-700/50 overflow-hidden transition-all duration-500 hover:shadow-3xl">
            
            {/* Header Section */}
            <div className="px-6 sm:px-8 pt-8 pb-6 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-indigo-600/10 dark:from-blue-500/20 dark:via-purple-500/20 dark:to-indigo-500/20">
              <Header />
            </div>

            {/* Content Section */}
            <div className="px-6 sm:px-8 pb-8 space-y-6 sm:space-y-8">
              
              {/* Add Todo Form */}
              <div className="relative">
                <AddTodoForm onAddTodo={addTodo} />
              </div>

              {/* Stats and Filters Section */}
              {totalTasks > 0 && (
                <div className="space-y-4 sm:space-y-6">
                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Stats 
                      totalTasks={totalTasks}
                      completedTasks={completedTasks}
                      pendingTasks={pendingTasks}
                    />
                  </div>

                  {/* Filter Buttons */}
                  <div className="flex justify-center">
                    <FilterButtons 
                      currentFilter={currentFilter}
                      onFilterChange={setCurrentFilter}
                    />
                  </div>
                </div>
              )}

              {/* Todo List or Empty State */}
              <div className="relative min-h-[200px]">
                {filteredTodos.length > 0 ? (
                  <div className="space-y-3 sm:space-y-4">
                    <TodoList 
                      todos={filteredTodos}
                      onToggle={toggleTodo}
                      onDelete={deleteTodo}
                      onEdit={editTodo}
                    />
                  </div>
                ) : (
                  <EmptyState currentFilter={currentFilter} totalTasks={totalTasks} />
                )}
              </div>

              {/* Clear All Button */}
              {totalTasks > 0 && (
                <div className="flex justify-center pt-4 border-t border-gray-200 dark:border-slate-700">
                  <ClearAllButton 
                    onClearAll={clearAllTodos}
                    disabled={todos.length === 0}
                    totalTasks={totalTasks}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Quick Stats Footer */}
          {totalTasks > 0 && (
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {completedTasks > 0 && (
                  <span>
                    🎉 You've completed {completedTasks} of {totalTasks} task{totalTasks !== 1 ? 's' : ''}
                    {completedTasks === totalTasks && ' - Great job!'}
                  </span>
                )}
                {completedTasks === 0 && totalTasks > 0 && (
                  <span>💪 Let's get started on your {totalTasks} task{totalTasks !== 1 ? 's' : ''}!</span>
                )}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoApp;