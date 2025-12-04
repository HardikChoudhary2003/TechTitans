import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const FacilitiesPage = () => {
    const [facilities, setFacilities] = useState([]);

    useEffect(() => {
        fetchFacilities();
    }, []);

    const fetchFacilities = async () => {
        try {
            const response = await axios.get('http://localhost:5002/public/facilities');
            setFacilities(response.data);
        } catch (error) {
            toast.error('Failed to fetch facilities');
        }
    };

    return (
        <div className="public-container">
            <header className="public-header">
                <h1>Healthcare Facilities</h1>
                <p>Find a center near you.</p>
            </header>

            <div className="facilities-grid">
                {facilities.length > 0 ? (
                    facilities.map((facility) => (
                        <div key={facility.id} className="facility-card">
                            <h3>{facility.name}</h3>
                            <span className="facility-type">{facility.type}</span>
                            <p className="facility-address">{facility.address}</p>
                            <p className="facility-phone">📞 {facility.phone}</p>
                            <button className="btn btn-sm">View Map</button>
                        </div>
                    ))
                ) : (
                    <p>No facilities found.</p>
                )}
            </div>
        </div>
    );
};

export default FacilitiesPage;
