import React, { useState } from "react";

const searchTodo = () => {
  const [tasks, setTasks] = useState([
    { id: 1, description: 'Task 1', category: 'Work', priority: 'High', completed: false },
    { id: 2, description: 'Task 2', category: 'Personal', priority: 'Low', completed: false },
    { id: 3, description: 'Task 3', category: 'Errands', priority: 'Medium', completed: true },
    // Add more tasks as needed
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPriority, setSelectedPriority] = useState('');
  const [showCompleted, setShowCompleted] = useState(false);

  // Function to filter tasks based on search term, categories, priority, and completion status
  const filteredTasks = tasks.filter(task => {
    const matchesSearchTerm = task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(task.category);
    const matchesPriority = selectedPriority === '' || task.priority === selectedPriority;
    const matchesCompletionStatus = showCompleted ? true : !task.completed;
    return matchesSearchTerm && matchesCategory && matchesPriority && matchesCompletionStatus;
  });

  return (
    <div>
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Category Filters */}
      <select
        multiple
        value={selectedCategories}
        onChange={(e) => setSelectedCategories(Array.from(e.target.selectedOptions, option => option.value))}
      >
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Errands">Errands</option>
        {/* Add more categories as needed */}
      </select>

      {/* Priority Filter */}
      <select
        value={selectedPriority}
        onChange={(e) => setSelectedPriority(e.target.value)}
      >
        <option value="">All Priorities</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      {/* Filter by Completion Status */}
      <label>
        <input
          type="checkbox"
          checked={showCompleted}
          onChange={(e) => setShowCompleted(e.target.checked)}
        />
        Show Completed Tasks
      </label>

      {/* ToDo List */}
      <ul>
        {filteredTasks.map(task => (
          <li key={task.id}>
            {task.description} - {task.category} - {task.priority} - {task.completed ? 'Completed' : 'Pending'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default searchTodo;
