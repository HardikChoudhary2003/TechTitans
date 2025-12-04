import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const { email, password } = formData;

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error('Please fill in all fields');
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.post('http://localhost:5000/auth/login', {
                email,
                password,
            });

            if (response.data) {
                localStorage.setItem('user', JSON.stringify(response.data));
                toast.success('Login successful!');
                navigate('/patient/dashboard');
            }
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            <section className="heading">
                <h1>Patient Login</h1>
                <p>Access your wellness portal</p>
            </section>

            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={email}
                            placeholder="Enter your email"
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={password}
                            placeholder="Enter password"
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-block" disabled={isLoading}>
                            {isLoading ? 'Loading...' : 'Login'}
                        </button>
                    </div>
                </form>
                <p style={{ textAlign: 'center', marginTop: '10px' }}>
                    Don't have an account? <Link to="/patient/register">Register</Link>
                </p>
            </section>
        </div>
    );
};

export default LoginPage;
