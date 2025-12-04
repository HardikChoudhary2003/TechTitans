import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Routes>
            <Route path="/provider/login" element={<LoginPage />} />
            <Route path="/provider/dashboard" element={<h1>Provider Dashboard Placeholder</h1>} />
            <Route path="*" element={<Navigate to="/provider/login" replace />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
