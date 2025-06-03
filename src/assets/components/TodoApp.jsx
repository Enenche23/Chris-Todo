import React, { useState, useEffect } from 'react';
import Header from './Header.jsx';
import CustomStyles from './CustomStyles.jsx';
import AddTodoForm from './AddTodoForm.jsx';
import Stats from './Stats.jsx';
import FilterButtons from './FilterButtons.jsx';
import TodoList from './TodoListContainer.jsx';
import ClearAllButton from './ClearAllButton.jsx';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [currentFilter, setCurrentFilter] = useState('all');

  // Load todos from localStorage on component mount
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('todos') || '[]');
      setTodos(Array.isArray(stored) ? stored : []);
    } catch (error) {
      console.error('Error loading todos from localStorage:', error);
    }
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    try {
      localStorage.setItem('todos', JSON.stringify(todos));
    } catch (error) {
      console.error('Error saving todos to localStorage:', error);
    }
  }, [todos]);

  const addTodo = (text) => {
    const todo = {
      id: Date.now(),
      text: text,
      completed: false,
      createdAt: new Date().toISOString()
    };

    setTodos(prevTodos => [todo, ...prevTodos]);
  };

  const toggleTodo = (id) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  const editTodo = (id, newText) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  const clearAllTodos = () => {
    if (todos.length === 0) return;
    
    if (window.confirm('Are you sure you want to delete all tasks? This action cannot be undone.')) {
      setTodos([]);
    }
  };

  const getFilteredTodos = () => {
    switch (currentFilter) {
      case 'completed':
        return todos.filter(todo => todo.completed);
      case 'pending':
        return todos.filter(todo => !todo.completed);
      default:
        return todos;
    }
  };

  const filteredTodos = getFilteredTodos();
  const totalTasks = todos.length;
  const completedTasks = todos.filter(todo => todo.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen py-8 px-4">
      <CustomStyles />
      
      <div className="max-w-2xl mx-auto">
        <Header />
        
        <AddTodoForm onAddTodo={addTodo} />
        
        <Stats 
          totalTasks={totalTasks}
          completedTasks={completedTasks}
          pendingTasks={pendingTasks}
        />
        
        <FilterButtons 
          currentFilter={currentFilter}
          onFilterChange={setCurrentFilter}
        />
        
        <TodoList 
          todos={filteredTodos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
        />
        
        <ClearAllButton 
          onClearAll={clearAllTodos}
          disabled={todos.length === 0}
        />
      </div>
    </div>
  );
};

export default TodoApp;