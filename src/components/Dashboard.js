// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import TaskList from './Task/TaskList';

// const Dashboard = () => {
//   const [tasks, setTasks] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const response = await api.get('/tasks/');
//         setTasks(response.data);
//       } catch (error) {
//         console.error('Failed to fetch tasks:', error);
//         if (error.response?.status === 401) navigate('/login');
//       }
//     };
//     fetchTasks();
//   }, [navigate]);

//   return (
//     <div>
//       <h2>Task Dashboard</h2>
//       <TaskList tasks={tasks} />
//     </div>
//   );
// };




import React from "react";
import TaskList from "./Task/TaskList";

const Dashboard = ({ authToken }) => {
  return (
    <div>
      <h1>Dashboard</h1>
      <TaskList authToken={authToken} />
    </div>
  );
};

export default Dashboard;





