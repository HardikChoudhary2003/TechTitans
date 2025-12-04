import React from 'react';
import Sidebar from '../components/Sidebar';

const MessagesPage = () => {
    return (
        <div className="app-container">
            <Sidebar />
            <div className="main-content">
                <header className="dashboard-header">
                    <h1>Messages</h1>
                </header>
                <div className="dashboard-content">
                    <div style={{
                        background: 'white',
                        padding: '40px',
                        borderRadius: '15px',
                        textAlign: 'center',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                    }}>
                        <div style={{ fontSize: '3rem', marginBottom: '20px' }}>💬</div>
                        <h2>Messages Coming Soon</h2>
                        <p style={{ color: '#666' }}>
                            We are working hard to bring you secure messaging with your healthcare provider.
                            Stay tuned!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MessagesPage;
