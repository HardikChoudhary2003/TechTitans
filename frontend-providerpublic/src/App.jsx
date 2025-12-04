import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginPage from './pages/LoginPage';

import Dashboard from './pages/Dashboard';
import PatientsPage from './pages/PatientsPage';
import PatientDetailsPage from './pages/PatientDetailsPage';
import HealthInfoPage from './pages/HealthInfoPage';
import FacilitiesPage from './pages/FacilitiesPage';

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Routes>
            <Route path="/provider/login" element={<LoginPage />} />
            <Route path="/provider/dashboard" element={<Dashboard />} />
            <Route path="/provider/patients" element={<PatientsPage />} />
            <Route path="/provider/patients/:id" element={<PatientDetailsPage />} />
            <Route path="/info/health" element={<HealthInfoPage />} />
            <Route path="/info/facilities" element={<FacilitiesPage />} />
            <Route path="*" element={<Navigate to="/provider/login" replace />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
