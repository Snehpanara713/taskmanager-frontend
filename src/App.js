import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import TaskList from './components/Dashboard/TaskList';
// import TaskForm from './components/Task/TaskForm';
import UserProfile from './components/Dashboard/UserProfile';

const App = () => (
    <Router>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/tasks" element={<TaskList/>} />
            <Route path="/user_profiles" element={<UserProfile />} />
            {/* <Route path="/tasks/new" element={<TaskForm />} /> */}
        </Routes>
    </Router>
);

export default App;
