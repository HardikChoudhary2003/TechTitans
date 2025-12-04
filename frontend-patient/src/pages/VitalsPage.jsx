import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

const VitalsPage = () => {
    const [vitals, setVitals] = useState([]);
    const [formData, setFormData] = useState({
        type: 'heart_rate',
        value: '',
        unit: 'bpm',
        date: new Date().toISOString().split('T')[0],
    });
    const [selectedType, setSelectedType] = useState('heart_rate');

    const { type, value, unit, date } = formData;

    useEffect(() => {
        fetchVitals();
    }, []);

    const fetchVitals = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/patient/vitals/history`,
                config
            );
            setVitals(response.data);
        } catch (error) {
            toast.error('Failed to fetch vitals');
        }
    };

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!value || !unit) {
            toast.error('Please add value and unit');
            return;
        }

        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            await axios.post(
                `${import.meta.env.VITE_API_URL}/patient/vitals`,
                formData,
                config
            );

            toast.success('Vital added');
            fetchVitals();
            setFormData({
                type: 'heart_rate',
                value: '',
                unit: 'bpm',
                date: new Date().toISOString().split('T')[0],
            });
        } catch (error) {
            toast.error('Failed to add vital');
        }
    };

    // Filter data for graph based on selected type
    const graphData = vitals
        .filter((v) => v.type === selectedType)
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .map((v) => ({
            date: new Date(v.date).toLocaleDateString(),
            value: parseFloat(v.value),
        }));

    return (
        <div className="vitals-container">
            <header className="vitals-header">
                <h1>My Vitals</h1>
            </header>

            <div className="vitals-content">
                <section className="vitals-form-section">
                    <h3>Add New Vital</h3>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label>Type</label>
                            <select
                                name="type"
                                value={type}
                                onChange={onChange}
                                className="form-control"
                            >
                                <option value="heart_rate">Heart Rate</option>
                                <option value="blood_pressure">Blood Pressure</option>
                                <option value="weight">Weight</option>
                                <option value="blood_sugar">Blood Sugar</option>
                                <option value="temperature">Temperature</option>
                                <option value="respiratory_rate">Respiratory Rate</option>
                                <option value="oxygen_saturation">Oxygen Saturation</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Value</label>
                            <input
                                type="text"
                                name="value"
                                value={value}
                                onChange={onChange}
                                className="form-control"
                                placeholder="e.g., 72"
                            />
                        </div>
                        <div className="form-group">
                            <label>Unit</label>
                            <input
                                type="text"
                                name="unit"
                                value={unit}
                                onChange={onChange}
                                className="form-control"
                                placeholder="e.g., bpm"
                            />
                        </div>
                        <div className="form-group">
                            <label>Date</label>
                            <input
                                type="date"
                                name="date"
                                value={date}
                                onChange={onChange}
                                className="form-control"
                            />
                        </div>
                        <button type="submit" className="btn btn-block">
                            Add Vital
                        </button>
                    </form>
                </section>

                <section className="vitals-graph-section">
                    <div className="graph-header">
                        <h3>Trends</h3>
                        <select
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                            className="form-control"
                            style={{ width: 'auto' }}
                        >
                            <option value="heart_rate">Heart Rate</option>
                            <option value="blood_pressure">Blood Pressure</option>
                            <option value="weight">Weight</option>
                            <option value="blood_sugar">Blood Sugar</option>
                            <option value="temperature">Temperature</option>
                            <option value="respiratory_rate">Respiratory Rate</option>
                            <option value="oxygen_saturation">Oxygen Saturation</option>
                        </select>
                    </div>
                    <div style={{ height: '300px', width: '100%' }}>
                        <ResponsiveContainer>
                            <LineChart data={graphData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#8884d8"
                                    activeDot={{ r: 8 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </section>
            </div>

            <section className="vitals-history-section">
                <h3>History</h3>
                <table className="vitals-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Type</th>
                            <th>Value</th>
                            <th>Unit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vitals.map((vital) => (
                            <tr key={vital._id}>
                                <td>{new Date(vital.date).toLocaleDateString()}</td>
                                <td>{vital.type.replace('_', ' ')}</td>
                                <td>{vital.value}</td>
                                <td>{vital.unit}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default VitalsPage;
