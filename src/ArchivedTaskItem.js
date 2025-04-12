import React from 'react';
import './ArchivedTaskItem.css';

const ArchivedTaskItem = ({ task, restoreTask, permanentlyDeleteTask }) => {
  return (
    <li className="archived-task-item">
      <div className="archived-task-details">
        <h3>{task.title}</h3>
        {task.description && <p>{task.description}</p>}
        <div className="task-meta">
          <span>Priority: {task.priority}</span>
          <span>Duration: {task.duration} min</span>
          {task.dueDate && <span>Due: {task.dueDate}</span>}
        </div>
      </div>
      <div className="archived-task-actions">
        <button onClick={() => restoreTask(task.id)}>Restore</button>
        <button onClick={() => permanentlyDeleteTask(task.id)}>Delete Permanently</button>
      </div>
    </li>
  );
};

export default ArchivedTaskItem;
