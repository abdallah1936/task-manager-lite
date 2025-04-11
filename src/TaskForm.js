import React, { useState } from 'react';
import './TaskForm.css';

const TaskForm = ({ addTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState(1);
  const [duration, setDuration] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return; // Title is required

    const newTask = {
      id: Date.now(), // Unique id based on timestamp
      title: title.trim(),
      description: description.trim(),
      priority: Number(priority),
      duration: Number(duration),
      dueDate,
      completed: false
    };

    addTask(newTask);
    // Reset form fields
    setTitle('');
    setDescription('');
    setPriority(1);
    setDuration('');
    setDueDate('');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Task Title (required)" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        required 
      />
      <textarea 
        placeholder="Description (optional)" 
        value={description} 
        onChange={(e) => setDescription(e.target.value)}
      />
      <input 
        type="number" 
        placeholder="Priority (e.g., 1)" 
        value={priority} 
        onChange={(e) => setPriority(e.target.value)} 
        min="1"
      />
      <input 
        type="number" 
        placeholder="Estimated Duration (min)" 
        value={duration} 
        onChange={(e) => setDuration(e.target.value)} 
        min="0"
      />
      <input 
        type="date" 
        value={dueDate} 
        onChange={(e) => setDueDate(e.target.value)} 
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
