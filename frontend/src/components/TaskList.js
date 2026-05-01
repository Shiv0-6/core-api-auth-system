import React, { useState } from 'react';
import TaskItem from './TaskItem';
import './TaskList.css';

const TaskList = ({ tasks, onTaskDeleted, onTaskUpdated }) => {
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredTasks = filterStatus === 'all'
    ? tasks
    : tasks.filter(task => task.status === filterStatus);

  const statuses = [
    { value: 'all', label: 'All Tasks' },
    { value: 'pending', label: 'Pending' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' }
  ];

  return (
    <div className="task-list">
      <div className="filter-section">
        {statuses.map(status => (
          <button
            key={status.value}
            className={`filter-btn ${filterStatus === status.value ? 'active' : ''}`}
            onClick={() => setFilterStatus(status.value)}
          >
            {status.label}
          </button>
        ))}
      </div>

      {filteredTasks.length === 0 ? (
        <p className="no-tasks-message">No tasks found</p>
      ) : (
        <div className="tasks-grid">
          {filteredTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onTaskDeleted={onTaskDeleted}
              onTaskUpdated={onTaskUpdated}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
