import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const GoalsPage = () => {
    const [goals, setGoals] = useState([]);
    const [description, setDescription] = useState('');
    const [targetDate, setTargetDate] = useState('');

    useEffect(() => {
        fetchGoals();
    }, []);

    const fetchGoals = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/patient/goals`,
                config
            );
            setGoals(response.data);
        } catch (error) {
            toast.error('Failed to fetch goals');
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!description) {
            toast.error('Please add a description');
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
                `${import.meta.env.VITE_API_URL}/patient/goals`,
                { description, targetDate },
                config
            );

            toast.success('Goal added');
            setDescription('');
            setTargetDate('');
            fetchGoals();
        } catch (error) {
            toast.error('Failed to add goal');
        }
    };

    return (
        <div className="goals-container">
            <header className="goals-header">
                <h1>My Goals</h1>
            </header>

            <div className="goals-content">
                <section className="goals-form-section">
                    <h3>Set New Goal</h3>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label>Description</label>
                            <input
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="form-control"
                                placeholder="e.g., Walk 10k steps daily"
                            />
                        </div>
                        <div className="form-group">
                            <label>Target Date (Optional)</label>
                            <input
                                type="date"
                                value={targetDate}
                                onChange={(e) => setTargetDate(e.target.value)}
                                className="form-control"
                            />
                        </div>
                        <button type="submit" className="btn btn-block">
                            Add Goal
                        </button>
                    </form>
                </section>

                <section className="goals-list-section">
                    <h3>Active Goals</h3>
                    {goals.length > 0 ? (
                        <div className="goals-grid">
                            {goals.map((goal) => (
                                <div key={goal._id} className="goal-card">
                                    <h4>{goal.description}</h4>
                                    {goal.targetDate && (
                                        <p>Target: {new Date(goal.targetDate).toLocaleDateString()}</p>
                                    )}
                                    <span className={`status status-${goal.status}`}>
                                        {goal.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No goals set yet.</p>
                    )}
                </section>
            </div>
        </div>
    );
};

export default GoalsPage;
