const pool = require('../config/db');

// Create Task
exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.user.id;

    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const connection = await pool.getConnection();
    await connection.execute('INSERT INTO tasks (user_id, title, description, status) VALUES (?, ?, ?, ?)', [
      userId,
      title,
      description || null,
      'pending'
    ]);
    connection.release();

    res.status(201).json({ message: 'Task created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all tasks (for admin) or user's tasks
exports.getTasks = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    let query, params;

    if (req.user.role === 'admin') {
      query = 'SELECT * FROM tasks ORDER BY created_at DESC';
      params = [];
    } else {
      query = 'SELECT * FROM tasks WHERE user_id = ? ORDER BY created_at DESC';
      params = [req.user.id];
    }

    const [tasks] = await connection.execute(query, params);
    connection.release();

    res.json({ tasks });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get single task
exports.getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    const [tasks] = await connection.execute('SELECT * FROM tasks WHERE id = ?', [id]);

    if (tasks.length === 0) {
      connection.release();
      return res.status(404).json({ message: 'Task not found' });
    }

    const task = tasks[0];

    // Check ownership
    if (task.user_id !== req.user.id && req.user.role !== 'admin') {
      connection.release();
      return res.status(403).json({ message: 'Not authorized' });
    }

    connection.release();
    res.json({ task });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update Task
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;
    const connection = await pool.getConnection();

    // Check if task exists
    const [tasks] = await connection.execute('SELECT * FROM tasks WHERE id = ?', [id]);
    if (tasks.length === 0) {
      connection.release();
      return res.status(404).json({ message: 'Task not found' });
    }

    const task = tasks[0];

    // Check ownership
    if (task.user_id !== req.user.id && req.user.role !== 'admin') {
      connection.release();
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Update task
    await connection.execute(
      'UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?',
      [title || task.title, description || task.description, status || task.status, id]
    );

    connection.release();
    res.json({ message: 'Task updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete Task
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();

    // Check if task exists
    const [tasks] = await connection.execute('SELECT * FROM tasks WHERE id = ?', [id]);
    if (tasks.length === 0) {
      connection.release();
      return res.status(404).json({ message: 'Task not found' });
    }

    const task = tasks[0];

    // Check ownership
    if (task.user_id !== req.user.id && req.user.role !== 'admin') {
      connection.release();
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Delete task
    await connection.execute('DELETE FROM tasks WHERE id = ?', [id]);
    connection.release();

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
