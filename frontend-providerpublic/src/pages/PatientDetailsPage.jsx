import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const PatientDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [patient, setPatient] = useState(null);
    const [vitals, setVitals] = useState([]);
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('');

    useEffect(() => {
        fetchData();
    }, [id]);

    const fetchData = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            // Fetch patient details (simulated by finding in list for now, or fetch specific if endpoint existed)
            // Since we don't have GET /users/:id, we'll fetch all and find.
            // Optimization: Add GET /users/:id later.
            const patientsRes = await axios.get('http://localhost:5002/provider/patients', config);
            const foundPatient = patientsRes.data.find(p => p._id === id);
            setPatient(foundPatient);

            // Fetch Vitals
            const vitalsRes = await axios.get(
                `http://localhost:5002/provider/patients/${id}/vitals`,
                config
            );
            setVitals(vitalsRes.data);

            // Fetch Notes
            const notesRes = await axios.get(
                `http://localhost:5002/provider/patients/${id}/notes`,
                config
            );
            setNotes(notesRes.data);

        } catch (error) {
            toast.error('Failed to fetch patient data');
        }
    };

    const onAddNote = async (e) => {
        e.preventDefault();
        if (!newNote) return;

        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            await axios.post(
                `http://localhost:5002/provider/patients/${id}/notes`,
                { note: newNote },
                config
            );

            toast.success('Note added');
            setNewNote('');
            // Refresh notes
            const notesRes = await axios.get(
                `http://localhost:5002/provider/patients/${id}/notes`,
                config
            );
            setNotes(notesRes.data);
        } catch (error) {
            toast.error('Failed to add note');
        }
    };

    if (!patient) {
        return <div>Loading...</div>;
    }

    return (
        <div className="details-container">
            <header className="details-header">
                <button className="btn btn-back" onClick={() => navigate('/provider/patients')}>
                    &larr; Back to Patients
                </button>
                <h1>{patient.name}</h1>
                <p>{patient.email}</p>
            </header>

            <div className="details-grid">
                <section className="vitals-section">
                    <h3>Recent Vitals</h3>
                    {vitals.length > 0 ? (
                        <div className="vitals-list-mini">
                            {vitals.map((vital) => (
                                <div key={vital._id} className="vital-card-mini">
                                    <span className="vital-type">{vital.type}</span>
                                    <span className="vital-value">
                                        {vital.value} {vital.unit}
                                    </span>
                                    <span className="vital-date">
                                        {new Date(vital.date).toLocaleDateString()}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No vitals recorded.</p>
                    )}
                </section>

                <section className="notes-section">
                    <h3>Provider Notes</h3>
                    <div className="add-note-form">
                        <form onSubmit={onAddNote}>
                            <textarea
                                value={newNote}
                                onChange={(e) => setNewNote(e.target.value)}
                                placeholder="Add a clinical note..."
                                className="form-control"
                                rows="3"
                            ></textarea>
                            <button type="submit" className="btn btn-sm" style={{ marginTop: '10px' }}>
                                Add Note
                            </button>
                        </form>
                    </div>
                    <div className="notes-list">
                        {notes.length > 0 ? (
                            notes.map((note) => (
                                <div key={note._id} className="note-card">
                                    <p className="note-text">{note.note}</p>
                                    <div className="note-meta">
                                        <span className="note-author">Dr. {note.provider.name}</span>
                                        <span className="note-date">
                                            {new Date(note.date).toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No notes yet.</p>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default PatientDetailsPage;
