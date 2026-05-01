import React, { useState } from 'react';
import { taskAPI } from '../api';
import './TaskItem.css';

const TaskItem = ({ task, onTaskDeleted, onTaskUpdated }) => {
  const [editing, setEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description || '');
  const [editedStatus, setEditedStatus] = useState(task.status);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async () => {
    if (!editedTitle.trim()) {
      setError('Title is required');
      return;
    }

    try {
      setLoading(true);
      await taskAPI.updateTask(task.id, {
        title: editedTitle,
        description: editedDescription,
        status: editedStatus
      });
      setEditing(false);
      setError('');
      onTaskUpdated();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update task');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        setLoading(true);
        await taskAPI.deleteTask(task.id);
        onTaskDeleted();
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete task');
      } finally {
        setLoading(false);
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return '#ffc107';
      case 'in_progress':
        return '#17a2b8';
      case 'completed':
        return '#28a745';
      default:
        return '#6c757d';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (editing) {
    return (
      <div className="task-item editing">
        {error && <div className="task-error">{error}</div>}
        <div className="edit-form">
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              disabled={loading}
              rows="3"
            />
          </div>
          <div className="form-group">
            <label>Status</label>
            <select
              value={editedStatus}
              onChange={(e) => setEditedStatus(e.target.value)}
              disabled={loading}
            >
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className="edit-actions">
            <button
              className="save-btn"
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
            <button
              className="cancel-btn"
              onClick={() => {
                setEditing(false);
                setEditedTitle(task.title);
                setEditedDescription(task.description || '');
                setEditedStatus(task.status);
                setError('');
              }}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="task-item">
      <div className="task-header">
        <h4 className="task-title">{task.title}</h4>
        <span
          className="task-status"
          style={{ backgroundColor: getStatusColor(task.status) }}
        >
          {task.status.replace('_', ' ')}
        </span>
      </div>
      {task.description && (
        <p className="task-description">{task.description}</p>
      )}
      <div className="task-footer">
        <span className="task-date">{formatDate(task.created_at)}</span>
        <div className="task-actions">
          <button
            className="edit-btn"
            onClick={() => setEditing(true)}
            disabled={loading}
          >
            Edit
          </button>
          <button
            className="delete-btn"
            onClick={handleDelete}
            disabled={loading}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
