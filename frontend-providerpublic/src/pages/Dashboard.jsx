import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import ProviderSidebar from '../components/ProviderSidebar';

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [stats, setStats] = useState({
        totalPatients: 0,
        highRiskPatients: 0,
        consultationsToday: 0,
    });

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            navigate('/provider/login');
        } else {
            const parsedUser = JSON.parse(storedUser);
            if (parsedUser.role !== 'provider') {
                toast.error('Access denied. Providers only.');
                navigate('/patient/login');
                return;
            }
            setUser(parsedUser);
            fetchStats(parsedUser.token);
        }
    }, [navigate]);

    const fetchStats = async (token) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token} `,
                },
            };
            // In a real app, these would be separate API calls or a single stats endpoint
            const patientsRes = await axios.get(`${import.meta.env.VITE_API_URL}/provider/patients`, config);

            setStats({
                totalPatients: patientsRes.data.length,
                highRiskPatients: 5, // Mock for now until backend update
                consultationsToday: 3, // Mock
            });
        } catch (error) {
            console.error(error);
        }
    };

    if (!user) return <div>Loading...</div>;

    return (
        <div className="app-container">
            <ProviderSidebar />
            <div className="main-content">
                <header className="dashboard-header">
                    <h1>Welcome, Dr. {user.name}</h1>
                </header>

                <div className="dashboard-content">
                    <div className="kpi-grid">
                        <div className="kpi-card">
                            <h3>Total Patients</h3>
                            <p className="kpi-value">{stats.totalPatients}</p>
                            <span className="kpi-unit">active</span>
                        </div>
                        <div className="kpi-card" style={{ borderLeft: '5px solid #dc3545' }}>
                            <h3>High Risk</h3>
                            <p className="kpi-value" style={{ color: '#dc3545' }}>{stats.highRiskPatients}</p>
                            <span className="kpi-unit">patients</span>
                        </div>
                        <div className="kpi-card">
                            <h3>Consultations</h3>
                            <p className="kpi-value">{stats.consultationsToday}</p>
                            <span className="kpi-unit">today</span>
                        </div>
                    </div>

                    <div className="chart-container">
                        <h2>Patient Analytics</h2>
                        <div style={{ height: '300px', width: '100%' }}>
                            <ResponsiveContainer>
                                <BarChart
                                    data={[
                                        { name: 'Jan', patients: 65 },
                                        { name: 'Feb', patients: 59 },
                                        { name: 'Mar', patients: 80 },
                                        { name: 'Apr', patients: 81 },
                                        { name: 'May', patients: 56 },
                                        { name: 'Jun', patients: 55 },
                                        { name: 'Jul', patients: 40 },
                                    ]}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="patients" fill="#007bff" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
