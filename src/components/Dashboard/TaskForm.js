// import React, { useState } from 'react';
// import { createTask } from '../../services/api';

// const TaskForm = () => {
//     const [title, setTitle] = useState('');
//     const [description, setDescription] = useState('');
//     const [due_date, setDueDate] = useState('');
//     const [assigned_user, setAssignedUser] = useState('2'); // Default user ID
//     const [error, setError] = useState(null);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const token = localStorage.getItem('token');
//             if (!token) throw new Error('Authorization token not found!');

//             const taskData = { title, description, due_date, assigned_user };
//             console.log('Submitting Task:', taskData); // Debugging
//             const response = await createTask(taskData, token);

//             alert('Task created successfully!');
//             console.log('API Response:', response.data); // Debugging
//             setError(null); // Clear any previous errors
//         } catch (err) {
//             console.error('Error creating task:', err.response?.data || err.message);
//             const errorData = err.response?.data || { message: err.message };
//             setError(errorData); // Store error data for rendering
//         }
//     };

//     const renderError = () => {
//         if (!error) return null;

//         // If error is an object, display its details
//         if (typeof error === 'object' && error !== null) {
//             return (
//                 <ul style={{ color: 'red' }}>
//                     {Object.entries(error).map(([key, value]) => (
//                         <li key={key}>
//                             {key}: {Array.isArray(value) ? value.join(', ') : value.toString()}
//                         </li>
//                     ))}
//                 </ul>
//             );
//         }

//         // If error is a string, display it directly
//         return <p style={{ color: 'red' }}>{error}</p>;
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <input
//                 type="text"
//                 placeholder="Title"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 required
//             />
//             <textarea
//                 placeholder="Description"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//             />
//             <input
//                 type="date"
//                 value={due_date}
//                 onChange={(e) => setDueDate(e.target.value)}
//                 required
//             />
//             <select
//                 value={assigned_user}
//                 onChange={(e) => setAssignedUser(e.target.value)}
//                 required
//             >
//                 <option value="2">User ID 2</option>
//                 <option value="3">User ID 3</option>
//                 {/* Dynamically add more users */}
//             </select>
//             <button type="submit">Save Task</button>
//             {renderError()} {/* Display error messages */}
//         </form>
//     );
// };

// export default TaskForm;
