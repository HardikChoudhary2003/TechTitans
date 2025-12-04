import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const RemindersPage = () => {
    const [reminders, setReminders] = useState([]);
    const [title, setTitle] = useState('');
    const [datetime, setDatetime] = useState('');

    useEffect(() => {
        fetchReminders();
    }, []);

    const fetchReminders = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const response = await axios.get(
                'http://localhost:5000/patient/reminders',
                config
            );
            setReminders(response.data);
        } catch (error) {
            toast.error('Failed to fetch reminders');
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!title || !datetime) {
            toast.error('Please add title and date/time');
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
                'http://localhost:5000/patient/reminders',
                { title, datetime },
                config
            );

            toast.success('Reminder added');
            setTitle('');
            setDatetime('');
            fetchReminders();
        } catch (error) {
            toast.error('Failed to add reminder');
        }
    };

    return (
        <div className="reminders-container">
            <header className="reminders-header">
                <h1>My Reminders</h1>
            </header>

            <div className="reminders-content">
                <section className="reminders-form-section">
                    <h3>Set New Reminder</h3>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label>Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="form-control"
                                placeholder="e.g., Take medication"
                            />
                        </div>
                        <div className="form-group">
                            <label>Date & Time</label>
                            <input
                                type="datetime-local"
                                value={datetime}
                                onChange={(e) => setDatetime(e.target.value)}
                                className="form-control"
                            />
                        </div>
                        <button type="submit" className="btn btn-block">
                            Add Reminder
                        </button>
                    </form>
                </section>

                <section className="reminders-list-section">
                    <h3>Upcoming Reminders</h3>
                    {reminders.length > 0 ? (
                        <div className="reminders-list">
                            {reminders.map((reminder) => (
                                <div key={reminder._id} className="reminder-card">
                                    <h4>{reminder.title}</h4>
                                    <p>{new Date(reminder.datetime).toLocaleString()}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No reminders set.</p>
                    )}
                </section>
            </div>
        </div>
    );
};

export default RemindersPage;
