import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const HealthInfoPage = () => {
    const [advisories, setAdvisories] = useState([]);

    useEffect(() => {
        fetchAdvisories();
    }, []);

    const fetchAdvisories = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/public/info`);
            setAdvisories(response.data);
        } catch (error) {
            toast.error('Failed to fetch health info');
        }
    };

    return (
        <div className="public-container">
            <header className="public-header">
                <h1>Health Advisories</h1>
                <p>Stay informed with the latest health updates.</p>
            </header>

            <div className="advisories-list">
                {advisories.length > 0 ? (
                    advisories.map((advisory) => (
                        <div key={advisory.id} className={`advisory-card priority-${advisory.priority.toLowerCase()}`}>
                            <div className="advisory-header">
                                <h3>{advisory.title}</h3>
                                <span className="priority-badge">{advisory.priority} Priority</span>
                            </div>
                            <p className="advisory-content">{advisory.content}</p>
                            <span className="advisory-date">
                                Posted: {new Date(advisory.date).toLocaleDateString()}
                            </span>
                        </div>
                    ))
                ) : (
                    <p>No active advisories.</p>
                )}
            </div>
        </div>
    );
};

export default HealthInfoPage;
