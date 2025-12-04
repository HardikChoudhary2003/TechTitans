import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [stats, setStats] = useState({
        totalPatients: 0,
        highRisk: 0,
        consultations: 0,
    });
    const [consultations, setConsultations] = useState([]);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            navigate('/provider/login');
        } else {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            fetchDashboardData(parsedUser);
        }
    }, [navigate]);

    const fetchDashboardData = async (currentUser) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${currentUser.token}`,
                },
            };

            // Fetch patients count
            const response = await axios.get(
                'http://localhost:5002/provider/patients',
                config
            );

            const patientsCount = response.data.length;

            // Mock High Risk and Consultations for now
            const highRiskCount = Math.floor(Math.random() * 5); // Mock
            const consultationsCount = 3; // Mock

            setStats({
                totalPatients: patientsCount,
                highRisk: highRiskCount,
                consultations: consultationsCount,
            });

            setConsultations([
                { id: 1, patient: 'John Doe', time: '10:00 AM', type: 'Follow-up' },
                { id: 2, patient: 'Jane Smith', time: '11:30 AM', type: 'Initial Consultation' },
                { id: 3, patient: 'Bob Johnson', time: '02:00 PM', type: 'Emergency' },
            ]);

        } catch (error) {
            toast.error('Failed to fetch dashboard data');
        }
    };

    const onLogout = () => {
        localStorage.removeItem('user');
        navigate('/provider/login');
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Provider Dashboard</h1>
                <div className="user-info">
                    <span>Welcome, Dr. {user.name}</span>
                    <button className="btn btn-logout" onClick={onLogout}>
                        Logout
                    </button>
                </div>
            </header>

            <div className="stats-grid">
                <div className="stat-card">
                    <h3>Total Patients</h3>
                    <p className="stat-value">{stats.totalPatients}</p>
                </div>
                <div className="stat-card high-risk">
                    <h3>High Risk Patients</h3>
                    <p className="stat-value">{stats.highRisk}</p>
                </div>
                <div className="stat-card">
                    <h3>Today's Consultations</h3>
                    <p className="stat-value">{stats.consultations}</p>
                </div>
            </div>

            <div className="dashboard-content">
                <section className="consultations-section">
                    <h2>Upcoming Consultations</h2>
                    <div className="consultations-list">
                        {consultations.map((consultation) => (
                            <div key={consultation.id} className="consultation-card">
                                <div className="consultation-time">{consultation.time}</div>
                                <div className="consultation-details">
                                    <h4>{consultation.patient}</h4>
                                    <p>{consultation.type}</p>
                                </div>
                                <button className="btn btn-sm">View</button>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Dashboard;
