import React, { useState, useEffect } from 'react';
import { fetchTasks, createTask, updateTask, deleteTask, fetchUserProfile } from '../../services/api'; 
import { useNavigate } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    title: '',
    description: '',
    due_date: '',
    assigned_user: '',
    is_completed: false,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');
  const [user, setUser] = useState(null); 

  const navigate = useNavigate();
  const pageSize = 10;

  const fetchAllTasks = async (page = 1) => {
    try {
      const response = await fetchTasks(page, pageSize);
      const { results, total_pages } = response.data.data;

      setTasks(results);
      setCurrentPage(page);
      setTotalPages(total_pages);
    } catch (error) {
      console.error('Failed to fetch tasks', error);
    }
  };

  const fetchUserDetails = async () => {
    try {
      const response = await fetchUserProfile(); 
      setUser(response.data);
    } catch (error) {
      console.error('Failed to fetch user details', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    navigate('/login'); 
  };

  useEffect(() => {
    fetchAllTasks();
    fetchUserDetails();
  }, []);

  const handleSubmit = async () => {
    try {
      const finalData = {
        ...formData,
        assigned_user: parseInt(formData.assigned_user, 10) || null,
      };

      if (isEditing) {
        const updatedTask = await updateTask(finalData);
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === updatedTask.data.id ? updatedTask.data : task
          )
        );
        setIsEditing(false);
      } else {
        const newTask = await createTask(finalData);
        setTasks((prevTasks) => [newTask.data, ...prevTasks]);
      }

      setFormData({ id: null, title: '', description: '', due_date: '', assigned_user: '', is_completed: false });
      setShowForm(false);
    } catch (error) {
      console.error(isEditing ? 'Failed to update task' : 'Failed to create task', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Failed to delete task', error.response?.data || error);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      fetchAllTasks(newPage);
    }
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedTasks = filteredTasks.sort((a, b) => {
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);

    return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
  });

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Dashboard</h1>
        <div>
          {user && (
            <span className="me-3">
              {user.first_name} {user.last_name}
            </span>
          )}
          <button className="btn btn-primary" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search tasks by title or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="mt-2">
          <button className="btn btn-primary me-2" onClick={() => setShowForm(!showForm)}>
            {showForm ? '-' : '+'} Add Task
          </button>
          <button className="btn btn-secondary" onClick={() => setSortOrder((prev) => (prev === 'desc' ? 'asc' : 'desc'))}>
            Sort by Date: {sortOrder === 'desc' ? 'Newest First' : 'Oldest First'}
          </button>
        </div>
      </div>

      {showForm && (
        <div className="card p-3 mb-4">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Task Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              className="form-control"
              id="description"
              rows="3"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="due_date" className="form-label">Due Date</label>
            <input
              type="date"
              className="form-control"
              id="due_date"
              value={formData.due_date}
              onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="assigned_user" className="form-label">Assigned User</label>
            <input
              type="text"
              className="form-control"
              id="assigned_user"
              value={formData.assigned_user}
              onChange={(e) => setFormData({ ...formData, assigned_user: e.target.value })}
              required
            />
          </div>
          {isEditing && (
            <div className="mb-3">
              <label htmlFor="is_completed" className="form-label">Is Completed</label>
              <select
                id="is_completed"
                className="form-control"
                value={formData.is_completed}
                onChange={(e) => setFormData({ ...formData, is_completed: e.target.value === 'true' })}
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
          )}
          <button className="btn btn-primary" onClick={handleSubmit}>
            {isEditing ? 'Update Task' : 'Create Task'}
          </button>
        </div>
      )}

      <ul className="list-group">
        {sortedTasks.map((task) => (
          <li className="list-group-item d-flex justify-content-between align-items-center" key={task.id}>
            <div>
              <h5>{task.title}</h5>
              <p>{task.description}</p>
              <small>Due Date: {new Date(task.due_date).toLocaleDateString()}</small>
            </div>
            <div>
              <button className="btn btn-warning me-2" onClick={() => { setIsEditing(true); setFormData(task); setShowForm(true); }}>
                Edit
              </button>
              <button className="btn btn-danger" onClick={() => handleDelete(task.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="d-flex justify-content-between align-items-center mt-4">
        <button className="btn btn-outline-primary" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button className="btn btn-outline-primary" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default TaskList;
