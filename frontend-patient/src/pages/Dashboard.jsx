import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
            setUser(JSON.parse(storedUser));

            // Mock API call
            // In a real app, this would be an axios.get('/patient/dashboard')
            setHealthData({
                steps: 8432,
                sleep: 7.5,
                heartRate: 72,
                water: 1.8,
            });
        }
    }, [navigate]);

    const onLogout = () => {
        localStorage.removeItem('user');
        navigate('/patient/login');
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Welcome, {user.name}</h1>
                <button className="btn btn-logout" onClick={onLogout}>
                    Logout
                </button>
            </header>

            <div className="kpi-grid">
                <div className="kpi-card">
                    <h3>Steps Today</h3>
                    <p className="kpi-value">{healthData.steps}</p>
                    <span className="kpi-unit">steps</span>
                </div>
                <div className="kpi-card">
                    <h3>Sleep</h3>
                    <p className="kpi-value">{healthData.sleep}</p>
                    <span className="kpi-unit">hours</span>
                </div>
                <div className="kpi-card">
                    <h3>Heart Rate</h3>
                    <p className="kpi-value">{healthData.heartRate}</p>
                    <span className="kpi-unit">bpm</span>
                </div>
                <div className="kpi-card">
                    <h3>Water Intake</h3>
                    <p className="kpi-value">{healthData.water}</p>
                    <span className="kpi-unit">liters</span>
                </div>
            </div>

            <div className="chart-container">
                <h2>Progress Overview</h2>
                <div className="chart-placeholder">
                    <p>Graph Placeholder (e.g., Weekly Activity)</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
