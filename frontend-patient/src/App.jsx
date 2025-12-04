import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

import Dashboard from './pages/Dashboard';
import VitalsPage from './pages/VitalsPage';
import GoalsPage from './pages/GoalsPage';
import RemindersPage from './pages/RemindersPage';
import ProfilePage from './pages/ProfilePage';
import EmergencyContactPage from './pages/EmergencyContactPage';
import MessagesPage from './pages/MessagesPage';

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Routes>
            <Route path="/patient/login" element={<LoginPage />} />
            <Route path="/patient/register" element={<RegisterPage />} />
            <Route path="/patient/dashboard" element={<Dashboard />} />
            <Route path="/patient/vitals" element={<VitalsPage />} />
            <Route path="/patient/goals" element={<GoalsPage />} />
            <Route path="/patient/reminders" element={<RemindersPage />} />
            <Route path="/patient/profile" element={<ProfilePage />} />
            <Route path="/patient/emergency-contact" element={<EmergencyContactPage />} />
            <Route path="/patient/emergency-contact" element={<EmergencyContactPage />} />
            <Route path="/patient/messages" element={<MessagesPage />} />
            <Route path="/" element={<Navigate to="/patient/login" replace />} />
            <Route path="*" element={<Navigate to="/patient/login" replace />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
