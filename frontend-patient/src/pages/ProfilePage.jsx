import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const storedUser = JSON.parse(localStorage.getItem('user'));
            const config = {
                headers: {
                    Authorization: `Bearer ${storedUser.token}`,
                },
            };
            const response = await axios.get(
                'http://localhost:5000/patient/profile',
                config
            );
            setUser(response.data);
            setName(response.data.name);
            setEmail(response.data.email);
        } catch (error) {
            toast.error('Failed to fetch profile');
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const storedUser = JSON.parse(localStorage.getItem('user'));
            const config = {
                headers: {
                    Authorization: `Bearer ${storedUser.token}`,
                },
            };

            const response = await axios.put(
                'http://localhost:5000/patient/profile',
                { name },
                config
            );

            toast.success('Profile updated');
            setUser(response.data);

            // Update local storage user name if needed, but token remains same
            const updatedUser = { ...storedUser, name: response.data.name };
            localStorage.setItem('user', JSON.stringify(updatedUser));
        } catch (error) {
            toast.error('Failed to update profile');
        }
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="profile-container">
            <header className="profile-header">
                <h1>My Profile</h1>
            </header>

            <div className="profile-content">
                <section className="profile-form-section">
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                value={email}
                                className="form-control"
                                disabled
                            />
                            <small>Email cannot be changed</small>
                        </div>
                        <button type="submit" className="btn btn-block">
                            Update Profile
                        </button>
                    </form>
                </section>
            </div>
        </div>
    );
};

export default ProfilePage;
