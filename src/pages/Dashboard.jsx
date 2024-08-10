import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AddPost from '../components/AddPost';
import Base from '../components/Base';
import UserPosts from '../components/UserPosts';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('userPosts');

  const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.state?.message) {
            const { message, type } = location.state;

            // Display the toast message
            if (type === 'success') {
                toast.success(message);
            } else if (type === 'error') {
                toast.error(message);
            }

            // Clear the state to prevent the toast from showing again on reload
            navigate(location.pathname, { replace: true });
        }
    }, [location.state, navigate, location.pathname]);


  return (
    <Base>
      <header className="masthead" style={{backgroundImage:"url('../assets/img/dashboard.jpg')"}}>
        <div className="overlay"></div>
        <div className="container">
          <div className="row">
            <div className="col-md-10 col-lg-8 mx-auto position-relative">
              <div className="site-heading">
                <h1>Dashboard</h1>
                <span className="subheading">Manage, Create, and Connect</span>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-10 col-lg-8 mx-auto">
            {/* Tabs */}
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === 'addPost' ? 'active' : ''}`}
                  onClick={() => setActiveTab('addPost')}
                >
                  Add Post
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === 'userPosts' ? 'active' : ''}`}
                  onClick={() => setActiveTab('userPosts')}
                >
                  Your Posts
                </button>
              </li>
            </ul>

            {/* Content based on selected tab */}
            <div className="tab-content mt-3">
              {activeTab === 'addPost' && <AddPost />}
              {activeTab === 'userPosts' && <UserPosts />}
            </div>
          </div>
        </div>
      </div>
    </Base>
  );
};

export default Dashboard;
