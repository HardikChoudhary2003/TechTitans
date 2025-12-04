import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import ProviderSidebar from '../components/ProviderSidebar';

const PatientsPage = () => {
    const [patients, setPatients] = useState([]);
    const [filteredPatients, setFilteredPatients] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [riskFilter, setRiskFilter] = useState('All');

    useEffect(() => {
        fetchPatients();
    }, []);

    useEffect(() => {
        filterPatients();
    }, [searchTerm, riskFilter, patients]);

    const fetchPatients = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const response = await axios.get(
                'http://localhost:5002/provider/patients',
                config
            );

            // Enhance with mock data for now (will be replaced by real data soon)
            const enhancedPatients = response.data.map((patient) => ({
                ...patient,
                age: patient.age || Math.floor(Math.random() * (80 - 20) + 20),
                risk: patient.risk || ['Low', 'Moderate', 'High'][Math.floor(Math.random() * 3)],
                lastVisit: new Date().toLocaleDateString(),
            }));

            setPatients(enhancedPatients);
            setFilteredPatients(enhancedPatients);
        } catch (error) {
            toast.error('Failed to fetch patients');
        }
    };

    const filterPatients = () => {
        let tempPatients = [...patients];

        if (searchTerm) {
            tempPatients = tempPatients.filter((patient) =>
                patient.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (riskFilter !== 'All') {
            tempPatients = tempPatients.filter((patient) => patient.risk === riskFilter);
        }

        setFilteredPatients(tempPatients);
    };

    return (
        <div className="app-container">
            <ProviderSidebar />
            <div className="main-content">
                <header className="patients-header">
                    <h1>My Patients</h1>
                </header>

                <div className="filters-section">
                    <div className="search-box">
                        <input
                            type="text"
                            placeholder="Search by name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="form-control"
                        />
                    </div>
                    <div className="filter-box">
                        <select
                            value={riskFilter}
                            onChange={(e) => setRiskFilter(e.target.value)}
                            className="form-control"
                        >
                            <option value="All">All Risks</option>
                            <option value="High">High Risk</option>
                            <option value="Moderate">Moderate Risk</option>
                            <option value="Low">Low Risk</option>
                        </select>
                    </div>
                </div>

                <div className="patients-table-container">
                    <table className="patients-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Age</th>
                                <th>Risk Level</th>
                                <th>Last Visit</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPatients.length > 0 ? (
                                filteredPatients.map((patient) => (
                                    <tr key={patient._id}>
                                        <td>{patient.name}</td>
                                        <td>{patient.age}</td>
                                        <td>
                                            <span className={`risk-badge risk-${patient.risk.toLowerCase()}`}>
                                                {patient.risk}
                                            </span>
                                        </td>
                                        <td>{patient.lastVisit}</td>
                                        <td>
                                            <button className="btn btn-sm">View Details</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: 'center' }}>
                                        No patients found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PatientsPage;
