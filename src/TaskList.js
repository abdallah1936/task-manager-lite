import React from 'react';
import TaskItem from './TaskItem';
import './TaskList.css';

const TaskList = ({ tasks, archiveTask, toggleComplete }) => {
  return (
    <ul className="task-list">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          archiveTask={archiveTask}
          toggleComplete={toggleComplete}
        />
      ))}
    </ul>
  );
};

export default TaskList;
