import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { register } from '../../services/api';
import './Register.css'; // Include your custom styles

const Register = () => {
  const navigate = useNavigate(); // Initialize the navigate function
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    address: '',
    mobile_number: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      const response = await register(formDataToSend);
      console.log('Success:', response.data);
      setMessage(response.data.message || 'Registration successful');

      // Redirect to the login page after successful registration
      setTimeout(() => {
        navigate('/login'); // Change '/login' to the path of your login page
      }, 2000); // Optional: delay redirection for 2 seconds to show success message
    } catch (error) {
      console.error('Error Response:', error.response?.data || error.message);
      setMessage(error.response?.data?.message || 'Error: Unable to register');
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login'); // Redirect to the login page
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-header text-center bg-primary text-white">
              <h3>Registration</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {/* Form fields */}
                <div className="mb-3">
                  <label htmlFor="first_name" className="form-label">First Name</label>
                  <input
                    name="first_name"
                    className="form-control"
                    placeholder="Enter your first name"
                    value={formData.first_name}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="last_name" className="form-label">Last Name</label>
                  <input
                    name="last_name"
                    className="form-control"
                    placeholder="Enter your last name"
                    value={formData.last_name}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    name="email"
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    name="password"
                    type="password"
                    className="form-control"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">Address</label>
                  <textarea
                    name="address"
                    className="form-control"
                    placeholder="Enter your address"
                    rows="3"
                    value={formData.address}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="mobile_number" className="form-label">Mobile Number</label>
                  <input
                    name="mobile_number"
                    type="tel"
                    className="form-control"
                    placeholder="Enter your mobile number"
                    value={formData.mobile_number}
                    onChange={handleChange}
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Register
                </button>
              </form>
              {message && <div className="alert alert-info mt-3">{message}</div>}
            </div>
            <div className="card-footer text-center">
              <p>Already have an account?</p>
              <button
                className="btn btn-secondary w-100"
                onClick={handleLoginRedirect}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
