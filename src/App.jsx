"use client"

import { useState, useEffect } from "react"

export default function App() {
  const [todos, setTodos] = useState([])
  const [filter, setFilter] = useState("all")
  const [darkMode, setDarkMode] = useState(false)
  const [inputValue, setInputValue] = useState("")

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode")
    const savedTodos = localStorage.getItem("todos")

    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode))
    }

    if (savedTodos) {
      try {
        const parsed = JSON.parse(savedTodos)
        setTodos(Array.isArray(parsed) ? parsed : [])
      } catch (error) {
        console.error("Error loading todos:", error)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode))
  }, [darkMode])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  const addTodo = () => {
    const text = inputValue.trim()
    if (!text) return

    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
    }

    setTodos([...todos, newTodo])
    setInputValue("")
  }

  const toggleTodo = (id) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed))
  }

  const getFilteredTodos = () => {
    switch (filter) {
      case "completed":
        return todos.filter((todo) => todo.completed)
      case "pending":
        return todos.filter((todo) => !todo.completed)
      default:
        return todos
    }
  }

  const filteredTodos = getFilteredTodos()
  const totalTasks = todos.length
  const completedTasks = todos.filter((todo) => todo.completed).length
  const pendingTasks = totalTasks - completedTasks

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className={`text-4xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>Todo App</h1>
            <p className={`mt-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Stay organized and productive</p>
          </div>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-3 rounded-full border-2 transition-all duration-200 ${
              darkMode ? "border-gray-600 bg-gray-800 text-white" : "border-gray-300 bg-white text-gray-900"
            }`}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>

        {/* Main Card */}
        <div className={`rounded-3xl shadow-xl ${darkMode ? "bg-gray-800" : "bg-white"}`}>
          <div className="p-8">
            {/* Add Todo Form */}
            <div className="mb-8">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="What needs to be done today?"
                  className={`flex-1 px-4 py-3 text-lg border-2 rounded-xl focus:outline-none ${
                    darkMode
                      ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400"
                      : "border-gray-300 bg-white text-gray-900 placeholder-gray-500"
                  }`}
                  onKeyDown={(e) => e.key === "Enter" && addTodo()}
                />
                <button
                  onClick={addTodo}
                  disabled={!inputValue.trim()}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add Task
                </button>
              </div>
            </div>

            {/* Stats */}
            {totalTasks > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className={`p-4 rounded-xl ${darkMode ? "bg-blue-900/30" : "bg-blue-50"}`}>
                  <div className={`text-2xl font-bold ${darkMode ? "text-blue-400" : "text-blue-600"}`}>
                    {totalTasks}
                  </div>
                  <div className={`font-medium ${darkMode ? "text-blue-400" : "text-blue-600"}`}>Total Tasks</div>
                </div>
                <div className={`p-4 rounded-xl ${darkMode ? "bg-green-900/30" : "bg-green-50"}`}>
                  <div className={`text-2xl font-bold ${darkMode ? "text-green-400" : "text-green-600"}`}>
                    {completedTasks}
                  </div>
                  <div className={`font-medium ${darkMode ? "text-green-400" : "text-green-600"}`}>Completed</div>
                </div>
                <div className={`p-4 rounded-xl ${darkMode ? "bg-orange-900/30" : "bg-orange-50"}`}>
                  <div className={`text-2xl font-bold ${darkMode ? "text-orange-400" : "text-orange-600"}`}>
                    {pendingTasks}
                  </div>
                  <div className={`font-medium ${darkMode ? "text-orange-400" : "text-orange-600"}`}>Pending</div>
                </div>
              </div>
            )}

            {/* Filter Buttons */}
            {totalTasks > 0 && (
              <div className="flex justify-center mb-8">
                <div className={`flex p-1 rounded-xl ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
                  <button
                    onClick={() => setFilter("all")}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      filter === "all"
                        ? darkMode
                          ? "bg-gray-600 text-blue-400"
                          : "bg-white text-blue-600 shadow"
                        : darkMode
                          ? "text-gray-400"
                          : "text-gray-600"
                    }`}
                  >
                    All ({totalTasks})
                  </button>
                  <button
                    onClick={() => setFilter("pending")}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      filter === "pending"
                        ? darkMode
                          ? "bg-gray-600 text-blue-400"
                          : "bg-white text-blue-600 shadow"
                        : darkMode
                          ? "text-gray-400"
                          : "text-gray-600"
                    }`}
                  >
                    Pending ({pendingTasks})
                  </button>
                  <button
                    onClick={() => setFilter("completed")}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      filter === "completed"
                        ? darkMode
                          ? "bg-gray-600 text-blue-400"
                          : "bg-white text-blue-600 shadow"
                        : darkMode
                          ? "text-gray-400"
                          : "text-gray-600"
                    }`}
                  >
                    Completed ({completedTasks})
                  </button>
                </div>
              </div>
            )}

            {/* Todo List */}
            <div className="space-y-3">
              {filteredTodos.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">
                    {filter === "completed" ? "🎉" : filter === "pending" ? "📝" : "✨"}
                  </div>
                  <h3 className={`text-xl font-semibold mb-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    {filter === "completed" && totalTasks > 0
                      ? "No completed tasks yet"
                      : filter === "pending" && totalTasks > 0
                        ? "No pending tasks"
                        : totalTasks === 0
                          ? "No tasks yet"
                          : "No tasks found"}
                  </h3>
                  <p className={darkMode ? "text-gray-500" : "text-gray-500"}>
                    {totalTasks === 0
                      ? "Add your first task to get started!"
                      : filter === "completed"
                        ? "Complete some tasks to see them here"
                        : filter === "pending"
                          ? "All your tasks are completed! 🎉"
                          : "No tasks match the current filter"}
                  </p>
                </div>
              ) : (
                filteredTodos.map((todo) => (
                  <div
                    key={todo.id}
                    className={`group border rounded-xl p-4 transition-all duration-200 ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 hover:bg-gray-650"
                        : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Checkbox */}
                      <button
                        onClick={() => toggleTodo(todo.id)}
                        className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                          todo.completed
                            ? "bg-green-500 border-green-500 text-white"
                            : darkMode
                              ? "border-gray-400 hover:border-green-400"
                              : "border-gray-400 hover:border-green-400"
                        }`}
                      >
                        {todo.completed && <span className="text-sm font-bold">✓</span>}
                      </button>

                      {/* Content */}
                      <div className="flex-1">
                        <p
                          className={`text-lg font-medium ${
                            todo.completed
                              ? darkMode
                                ? "line-through text-gray-400"
                                : "line-through text-gray-500"
                              : darkMode
                                ? "text-white"
                                : "text-gray-900"
                          }`}
                        >
                          {todo.text}
                        </p>
                      </div>

                      {/* Delete Button */}
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className={`p-2 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100 ${
                          darkMode ? "text-gray-400 hover:text-red-400" : "text-gray-400 hover:text-red-500"
                        }`}
                        title="Delete task"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Clear Completed Button */}
            {completedTasks > 0 && (
              <div className="flex justify-center mt-8 pt-6 border-t border-gray-300 dark:border-gray-600">
                <button
                  onClick={clearCompleted}
                  className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-all duration-200"
                >
                  Clear Completed ({completedTasks})
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
