import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginPage from './pages/LoginPage';

import Dashboard from './pages/Dashboard';

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Routes>
            <Route path="/patient/login" element={<LoginPage />} />
            <Route path="/patient/dashboard" element={<Dashboard />} />
            <Route path="*" element={<Navigate to="/patient/login" replace />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
