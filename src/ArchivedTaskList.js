import React from 'react';
import ArchivedTaskItem from './ArchivedTaskItem';
import './ArchivedTaskList.css';

const ArchivedTaskList = ({ archivedTasks, restoreTask, permanentlyDeleteTask }) => {
  if (archivedTasks.length === 0) {
    return <p>No archived tasks.</p>;
  }
  return (
    <ul className="archived-task-list">
      {archivedTasks.map(task => (
        <ArchivedTaskItem
          key={task.id}
          task={task}
          restoreTask={restoreTask}
          permanentlyDeleteTask={permanentlyDeleteTask}
        />
      ))}
    </ul>
  );
};

export default ArchivedTaskList;
