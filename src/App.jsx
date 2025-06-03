import { useState } from 'react'
import ErrorBoundary from './assets/components/ErrorBoundary.jsx';
import Header from './assets/components/Header.jsx'; 
import CustomStyles from './assets/components/CustomStyles.jsx';
import TodoApp from './assets/components/TodoApp.jsx';
// Importing components for the Todo application
import TodoItem from './assets/components/TodoItem.jsx';
import FilterButtons from './assets/components/FilterButtons.jsx';
import AddTodoForm from './assets/components/AddTodoForm.jsx';
import Stats from './assets/components/Stats.jsx';
// Importing the TodoList component
import TodoList from './assets/components/TodoListContainer.jsx';
import ClearAllButton from './assets/components/ClearAllButton.jsx';
// Importing additional components
import EmptyState from './assets/components/EmptyState.jsx';
import './App.css';



function App() {
  const [darkMode, setDarkMode] = useState(false);
  
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (    
<div className={`App ${darkMode ? 'dark' : ''}`}>
    <ErrorBoundary>
      <CustomStyles />
      <Header />
      <button onClick={toggleDarkMode}>
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
        <TodoApp />
        <FilterButtons />
        <EmptyState />
        <TodoItem />
        <AddTodoForm />
        <Stats />
        <TodoList />
        <ClearAllButton />
        </ErrorBoundary>
    </div>    
  )
}

export default App
