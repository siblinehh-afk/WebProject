import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/admin/Dashboard';
import AdminTables from './pages/admin/Tables';
import AdminReservations from './pages/admin/Reservations';
import AdminMenuItems from './pages/admin/MenuItems';
import CustomerDashboard from './pages/customer/Dashboard';
import BrowseTables from './pages/customer/Tables';
import ReserveTable from './pages/customer/ReserveTable';
import MyReservations from './pages/customer/MyReservations';
import Menu from './pages/customer/Menu';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route path="/admin/dashboard" element={<ProtectedRoute role="Admin"><AdminDashboard /></ProtectedRoute>} />
                <Route path="/admin/tables" element={<ProtectedRoute role="Admin"><AdminTables /></ProtectedRoute>} />
                <Route path="/admin/reservations" element={<ProtectedRoute role="Admin"><AdminReservations /></ProtectedRoute>} />
                <Route path="/admin/menu" element={<ProtectedRoute role="Admin"><AdminMenuItems /></ProtectedRoute>} />

                <Route path="/customer/dashboard" element={<ProtectedRoute role="Customer"><CustomerDashboard /></ProtectedRoute>} />
                <Route path="/customer/tables" element={<ProtectedRoute role="Customer"><BrowseTables /></ProtectedRoute>} />
                <Route path="/customer/reserve/:id" element={<ProtectedRoute role="Customer"><ReserveTable /></ProtectedRoute>} />
                <Route path="/customer/my-reservations" element={<ProtectedRoute role="Customer"><MyReservations /></ProtectedRoute>} />
                <Route path="/customer/menu" element={<ProtectedRoute role="Customer"><Menu /></ProtectedRoute>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;