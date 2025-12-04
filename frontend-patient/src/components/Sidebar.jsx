import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { label: 'Dashboard', path: '/patient/dashboard', icon: '📊' },
        { label: 'My Profile', path: '/patient/profile', icon: '👤' },
        { label: 'Wellness Goals', path: '/patient/goals', icon: '🎯' },
        { label: 'Messages', path: '/patient/messages', icon: '💬' },
    ];

    const onLogout = () => {
        localStorage.removeItem('user');
        navigate('/patient/login');
    };

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <h2>Health Portal</h2>
            </div>
            <nav className="sidebar-nav">
                {menuItems.map((item) => (
                    <div
                        key={item.path}
                        className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
                        onClick={() => navigate(item.path)}
                    >
                        <span className="nav-icon">{item.icon}</span>
                        <span className="nav-label">{item.label}</span>
                    </div>
                ))}
            </nav>
            <div className="sidebar-footer">
                <button className="btn-logout-sidebar" onClick={onLogout}>
                    <span>🚪</span> Logout
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
