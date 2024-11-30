import React, { useEffect, useState } from 'react';
import { fetchUserProfile } from '../../services/api';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './UserProfile.css'; 

const UserProfile = () => {
  const [profiles, setProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false); 
  const [searchTerm, setSearchTerm] = useState(''); 

  const pageSize = 10; 

  useEffect(() => {
    const loadProfiles = async () => {
      setLoading(true);
      try {
        const response = await fetchUserProfile(currentPage, pageSize);
        const { results, total_pages } = response.data.data;
        setProfiles(results); 
        setFilteredProfiles(results); 
        setTotalPages(total_pages); 
      } catch (error) {
        console.error('Failed to fetch profiles', error);
      } finally {
        setLoading(false);
      }
    };

    loadProfiles();
  }, [currentPage]);


  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    
    const filtered = profiles.filter(
      (profile) =>
        profile.first_name.toLowerCase().includes(term) ||
        profile.last_name.toLowerCase().includes(term) ||
        profile.email.toLowerCase().includes(term)
    );
    setFilteredProfiles(filtered);
  };

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">User Profiles</h1>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <ul className="list-group mb-4">
            {filteredProfiles.map((profile, index) => (
              <li key={index} className="list-group-item">
                <p>
                  <strong>Name:</strong> {profile.first_name} {profile.last_name}
                </p>
                <p>
                  <strong>Email:</strong> {profile.email}
                </p>
                <p>
                  <strong>Mobile:</strong> {profile.mobile_number || 'N/A'}
                </p>
              </li>
            ))}
          </ul>
          <div className="d-flex justify-content-between">
            <button
              className="btn btn-secondary"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Previous
            </button>
            <button
              className="btn btn-primary"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default UserProfile;
