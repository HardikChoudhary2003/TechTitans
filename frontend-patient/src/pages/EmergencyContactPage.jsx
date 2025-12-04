import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const EmergencyContactPage = () => {
    const [contacts, setContacts] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        relationship: '',
        phone: '',
    });

    const { name, relationship, phone } = formData;

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/patient/emergency-contact`,
                config
            );
            setContacts(response.data);
        } catch (error) {
            toast.error('Failed to fetch contacts');
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

        if (!name || !relationship || !phone) {
            toast.error('Please fill in all fields');
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
                `${import.meta.env.VITE_API_URL}/patient/emergency-contact`,
                formData,
                config
            );

            toast.success('Contact added');
            setFormData({
                name: '',
                relationship: '',
                phone: '',
            });
            fetchContacts();
        } catch (error) {
            toast.error('Failed to add contact');
        }
    };

    return (
        <div className="emergency-container">
            <header className="emergency-header">
                <h1>Emergency Contacts</h1>
            </header>

            <div className="emergency-content">
                <section className="emergency-form-section">
                    <h3>Add New Contact</h3>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                type="text"
                                name="name"
                                value={name}
                                onChange={onChange}
                                className="form-control"
                                placeholder="e.g., Jane Doe"
                            />
                        </div>
                        <div className="form-group">
                            <label>Relationship</label>
                            <input
                                type="text"
                                name="relationship"
                                value={relationship}
                                onChange={onChange}
                                className="form-control"
                                placeholder="e.g., Spouse"
                            />
                        </div>
                        <div className="form-group">
                            <label>Phone</label>
                            <input
                                type="text"
                                name="phone"
                                value={phone}
                                onChange={onChange}
                                className="form-control"
                                placeholder="e.g., +1234567890"
                            />
                        </div>
                        <button type="submit" className="btn btn-block">
                            Add Contact
                        </button>
                    </form>
                </section>

                <section className="emergency-list-section">
                    <h3>My Contacts</h3>
                    {contacts.length > 0 ? (
                        <div className="contacts-list">
                            {contacts.map((contact) => (
                                <div key={contact._id} className="contact-card">
                                    <h4>{contact.name}</h4>
                                    <p><strong>Relationship:</strong> {contact.relationship}</p>
                                    <p><strong>Phone:</strong> {contact.phone}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No emergency contacts added.</p>
                    )}
                </section>
            </div>
        </div>
    );
};

export default EmergencyContactPage;
