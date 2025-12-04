import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ProviderSidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { label: 'Dashboard', path: '/provider/dashboard', icon: '📊' },
        { label: 'My Patients', path: '/provider/patients', icon: '👥' },
        { label: 'Public Info', path: '/info/health', icon: 'ℹ️' },
        { label: 'Facilities', path: '/info/facilities', icon: '🏥' },
    ];

    const onLogout = () => {
        localStorage.removeItem('user');
        navigate('/provider/login');
    };

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <h2>Provider Portal</h2>
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

export default ProviderSidebar;
