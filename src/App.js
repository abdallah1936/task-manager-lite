import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import ArchivedTaskList from './ArchivedTaskList';
import './App.css';

const App = () => {
  // State for active tasks
  const [tasks, setTasks] = useState([]);
  // State for archived (deleted) tasks
  const [archivedTasks, setArchivedTasks] = useState([]);
  // Boolean toggle to switch between active and archived views
  const [viewArchived, setViewArchived] = useState(false);

  // Load tasks and archived tasks from localStorage on mount
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    const storedArchivedTasks = JSON.parse(localStorage.getItem('archivedTasks'));
    if (storedTasks) setTasks(storedTasks);
    if (storedArchivedTasks) setArchivedTasks(storedArchivedTasks);
  }, []);

  // Save tasks and archived tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('archivedTasks', JSON.stringify(archivedTasks));
  }, [tasks, archivedTasks]);

  // Function to add a new task
  const addTask = (task) => {
    setTasks(prevTasks => {
      const newTasks = [...prevTasks, task];
      return sortTasks(newTasks);
    });
  };

  // Archive (soft-delete) a task: remove it from active tasks and add it to archived tasks (if not already added)
  const archiveTask = (id) => {
    setTasks(prevTasks => {
      // Find the task to archive based on its id
      const taskToArchive = prevTasks.find(task => task.id === id);
      if (taskToArchive) {
        // Update the archived tasks only if the task is not already archived
        setArchivedTasks(prevArchived => {
          if (!prevArchived.some(task => task.id === id)) {
            return [...prevArchived, taskToArchive];
          }
          return prevArchived;
        });
      }
      // Remove the task from the active tasks list
      return prevTasks.filter(task => task.id !== id);
    });
  };

  // Restore a task from archive back to active tasks
  const restoreTask = (id) => {
    setArchivedTasks(prevArchived => {
      const taskToRestore = prevArchived.find(task => task.id === id);
      if (taskToRestore) {
        setTasks(prevTasks => sortTasks([...prevTasks, taskToRestore]));
      }
      return prevArchived.filter(task => task.id !== id);
    });
  };

  // Permanently delete a task from the archive
  const permanentlyDeleteTask = (id) => {
    setArchivedTasks(prevArchived => prevArchived.filter(task => task.id !== id));
  };

  // Toggle the completed status of a task in active tasks
  const toggleComplete = (id) => {
    setTasks(prevTasks => {
      const newTasks = prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      return sortTasks(newTasks);
    });
  };

  // Automated sorting: incomplete tasks first, then by priority and due date
  const sortTasks = (tasks) => {
    return tasks.sort((a, b) => {
      // Sort incomplete tasks before completed ones
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }
      // Then sort by priority (lower numbers have higher priority)
      if (a.priority !== b.priority) {
        return a.priority - b.priority;
      }
      // Finally, if both tasks have a due date, sort by due date
      if (a.dueDate && b.dueDate) {
        return new Date(a.dueDate) - new Date(b.dueDate);
      }
      return 0;
    });
  };

  return (
    <div className="App">
      <h1>Task Manager Lite</h1>
      <TaskForm addTask={addTask} />
      {/* Toggle button to switch between viewing active and archived tasks */}
      <button
        className="toggle-view-button"
        onClick={() => setViewArchived(!viewArchived)}
      >
        {viewArchived ? 'View Active Tasks' : 'View Archived Tasks'}
      </button>
      {viewArchived ? (
        <ArchivedTaskList
          archivedTasks={archivedTasks}
          restoreTask={restoreTask}
          permanentlyDeleteTask={permanentlyDeleteTask}
        />
      ) : (
        <TaskList
          tasks={tasks}
          archiveTask={archiveTask}
          toggleComplete={toggleComplete}
        />
      )}
    </div>
  );
};

export default App;
