import React from 'react';
import './TaskItem.css';

const TaskItem = ({ task, archiveTask, toggleComplete }) => {
  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-details">
        <h3>{task.title}</h3>
        {task.description && <p>{task.description}</p>}
        <div className="task-meta">
          <span>Priority: {task.priority}</span>
          <span>Duration: {task.duration} min</span>
          {task.dueDate && <span>Due: {task.dueDate}</span>}
        </div>
      </div>
      <div className="task-actions">
        <button onClick={() => toggleComplete(task.id)}>
          {task.completed ? 'Undo' : 'Complete'}
        </button>
        <button onClick={() => archiveTask(task.id)}>
          Archive
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
