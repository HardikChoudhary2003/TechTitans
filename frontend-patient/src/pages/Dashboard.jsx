import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [healthData, setHealthData] = useState({
        steps: 0,
        sleep: 0,
        heartRate: 0,
        water: 0,
    });

    useEffect(() => {
        // Check for user
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            navigate('/patient/login');
        } else {
            const user = JSON.parse(storedUser);
            setUser(user);
            fetchDashboardData(user.token);
        }
    }, [navigate]);

    const fetchDashboardData = async (token) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios.get('http://localhost:5000/patient/dashboard-stats', config);
            setHealthData(response.data);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            // Fallback to 0s if fetch fails, handled by initial state
        }
    };

    const onLogout = () => {
        localStorage.removeItem('user');
        navigate('/patient/login');
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="app-container">
            <Sidebar onLogout={onLogout} />
            <div className="main-content">
                <header className="dashboard-header">
                    <h1>Welcome, {user.name}</h1>
                    {/* Logout button moved to sidebar */}
                </header>

                <div className="dashboard-content">
                    <section className="wellness-goals">
                        <h2 className="section-title">Wellness Goals</h2>

                        {/* Steps Goal */}
                        <div className="goal-card-detailed">
                            <div className="goal-header">
                                <div className="goal-icon steps-icon">👣</div>
                                <div className="goal-info">
                                    <h3>Steps</h3>
                                    <div className="goal-stats">
                                        <span className="current">{healthData.steps}</span>
                                        <span className="target">/ 10000 steps</span>
                                    </div>
                                </div>
                                <div className="goal-meta">
                                    <span>Now</span>
                                </div>
                            </div>
                            <div className="progress-bar-container">
                                <div
                                    className="progress-bar-fill"
                                    style={{ width: `${(healthData.steps / 10000) * 100}%` }}
                                ></div>
                                <span className="progress-text">{Math.round((healthData.steps / 10000) * 100)}%</span>
                            </div>
                        </div>

                        {/* Active Time Goal */}
                        <div className="goal-card-detailed">
                            <div className="goal-header">
                                <div className="goal-icon time-icon">🕒</div>
                                <div className="goal-info">
                                    <h3>Active Time</h3>
                                    <div className="goal-stats">
                                        <span className="current">56</span>
                                        <span className="target">/ 60 mins</span>
                                    </div>
                                </div>
                                <div className="goal-meta">
                                    <span>1712 Kcal | 1.23km</span>
                                </div>
                            </div>
                        </div>

                        {/* Sleep Goal */}
                        <div className="goal-card-detailed">
                            <div className="goal-header">
                                <div className="goal-icon sleep-icon">🌙</div>
                                <div className="goal-info">
                                    <h3>Sleep</h3>
                                    <div className="goal-stats">
                                        <span className="current">{healthData.sleep}</span>
                                        <span className="target">hrs</span>
                                    </div>
                                </div>
                                <div className="goal-meta">
                                    <span>11:30 pm - 06:00 am</span>
                                </div>
                            </div>
                            <div className="sleep-visual">
                                {/* Placeholder for sleep visual if needed, or just text */}
                            </div>
                        </div>
                    </section>

                    <section className="preventive-care">
                        <h2 className="section-title">Preventive Care Reminders</h2>
                        <div className="reminders-list-simple">
                            <div className="reminder-item">
                                <span className="reminder-bullet">•</span>
                                <span className="reminder-text">Upcoming: Annual blood test on 23rd Jan 2025</span>
                            </div>
                            <div className="reminder-item">
                                <span className="reminder-bullet">•</span>
                                <span className="reminder-text">Flu Shot Vaccination due next month</span>
                            </div>
                        </div>
                    </section>

                    <div className="health-tip-container" style={{ marginTop: '30px', background: '#e8f5e9', padding: '20px', borderRadius: '10px', borderLeft: '5px solid #28a745' }}>
                        <h3 style={{ color: '#28a745', marginBottom: '10px' }}>Health Tip of the Day</h3>
                        <p style={{ color: '#333', fontStyle: 'italic' }}>
                            Stay hydrated! Aim to drink at least 8 glasses of water per day.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
