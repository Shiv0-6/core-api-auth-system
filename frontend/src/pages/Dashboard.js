import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { taskAPI } from '../api';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await taskAPI.getAllTasks();
      setTasks(response.data.tasks);
      setError('');
    } catch (err) {
      setError('Failed to load tasks');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleTaskCreated = async () => {
    setSuccessMessage('Task created successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
    await fetchTasks();
  };

  const handleTaskDeleted = async () => {
    setSuccessMessage('Task deleted successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
    await fetchTasks();
  };

  const handleTaskUpdated = async () => {
    setSuccessMessage('Task updated successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
    await fetchTasks();
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return <div className="dashboard-loading">Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Task Manager</h1>
          <div className="user-info">
            <span className="user-name">{user?.name}</span>
            <span className="user-role">({user?.role})</span>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="dashboard-content">
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
        {error && <div className="error-message">{error}</div>}

        <div className="dashboard-grid">
          <div className="form-section">
            <TaskForm onTaskCreated={handleTaskCreated} />
          </div>

          <div className="tasks-section">
            <h2>Your Tasks</h2>
            {tasks.length === 0 ? (
              <p className="no-tasks">No tasks yet. Create one to get started!</p>
            ) : (
              <TaskList
                tasks={tasks}
                onTaskDeleted={handleTaskDeleted}
                onTaskUpdated={handleTaskUpdated}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
